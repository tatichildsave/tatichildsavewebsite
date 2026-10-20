import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  updateActiveForm,
  resetActiveForm,
  setSubmitting,
  setSubmitError,
  addRegistrationSuccess,
  setSpreadsheetInfo,
  addOutboxRecord,
} from '../../store/registrationSlice';
import { setActiveLearnerChild } from '../../store/learnerSlice';
import {
  openConfirmationModal,
  closeConfirmationModal,
  addToast,
  setActiveTab,
} from '../../store/uiSlice';
import { getAccessToken, googleSignIn } from '../../services/workspaceAuth';
import { setUser } from '../../store/authSlice';
import {
  getOrCreateRegistrationSpreadsheet,
  appendRegistrationToSheet,
} from '../../services/sheetsService';
import { sendWelcomeEmail, buildWelcomeEmailHtml } from '../../services/gmailService';
import { ChildRegistration } from '../../types';
import { GoogleSignInButton } from '../common/GoogleSignInButton';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const RegistrationWizard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeForm, isSubmitting, submitError, lastRegisteredChild, spreadsheetInfo } =
    useAppSelector((state) => state.registration);
  const { user, isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);
  const [isProcessingSync, setIsProcessingSync] = useState(false);


  // Form fields with defaults
  const childName = activeForm.childName || '';
  const childAge = activeForm.childAge || 10;
  const childGender = activeForm.childGender || 'girl';
  const city = activeForm.city || 'Accra';
  const country = activeForm.country || 'Ghana';
  const parentName = activeForm.parentName || (user?.displayName || '');
  const parentEmail = activeForm.parentEmail || (user?.email || '');
  const parentPhone = activeForm.parentPhone || '+233 ';
  const pathway = activeForm.pathway || 'flex';
  const kitDeliveryAddress = activeForm.kitDeliveryAddress || '';
  const savingsGoal = activeForm.savingsGoal || 'Solar Science Experiment Kit';
  const initialSavingsCedis = activeForm.initialSavingsCedis || 50;

  const currentRegistrationDraft: ChildRegistration = {
    id: `reg-${Date.now()}`,
    childName,
    childAge,
    childGender,
    city,
    country,
    avatarSeed: childName.toLowerCase().replace(/\s+/g, '-'),
    parentName,
    parentEmail,
    parentPhone,
    pathway,
    kitDeliveryAddress,
    savingsGoal,
    initialSavingsCedis,
    registeredAt: new Date().toISOString(),
    sheetSynced: false,
    welcomeEmailSent: false,
  };

  const handleInputChange = (field: keyof ChildRegistration, value: any) => {
    dispatch(updateActiveForm({ [field]: value }));
  };

  const handleGoogleConnect = async () => {
    try {
      const res = await googleSignIn();
      if (res?.user) {
        dispatch(
          setUser({
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
          })
        );
        if (!parentEmail && res.user.email) {
          handleInputChange('parentEmail', res.user.email);
        }
        if (!parentName && res.user.displayName) {
          handleInputChange('parentName', res.user.displayName);
        }
        dispatch(
          addToast({
            title: 'Google Account Connected',
            message: 'Ready to sync registrations to Google Sheets and send Gmail welcomes.',
            type: 'success',
          })
        );
      }
    } catch (err: any) {
      dispatch(
        addToast({
          title: 'Google Sign In Error',
          message: err.message || 'Could not complete Google sign-in',
          type: 'error',
        })
      );
    }
  };

  const handleInitiateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!childName.trim()) {
      dispatch(addToast({ title: 'Missing Info', message: 'Please enter child full name', type: 'warning' }));
      setActiveStep(1);
      return;
    }
    if (!parentEmail.trim() || !parentEmail.includes('@')) {
      dispatch(addToast({ title: 'Missing Info', message: 'Please provide a valid parent email address', type: 'warning' }));
      setActiveStep(2);
      return;
    }
    if (!kitDeliveryAddress.trim()) {
      dispatch(addToast({ title: 'Missing Info', message: 'Please provide a kit delivery address', type: 'warning' }));
      setActiveStep(3);
      return;
    }

    // User Confirmation Dialog
    dispatch(
      openConfirmationModal({
        title: 'Confirm Child Enrollment',
        description: `Please review your enrollment summary for ${childName}:`,
        affectedItems: [
          `Enroll ${childName} (Age ${childAge}) in ${pathway.toUpperCase()} pathway`,
          `Send official welcome packet and conversation guides to ${parentEmail}`,
          `Queue physical TATI Junior Kit for delivery to ${kitDeliveryAddress}`,
          `Initialize ${childName}'s digital Money Passport and Goal Tracker`,
        ],
        confirmLabel: 'Confirm & Enroll Child',
        cancelLabel: 'Review Details',
      })
    );
  };


  const handleExecuteConfirmedRegistration = async () => {
    dispatch(closeConfirmationModal());
    dispatch(setSubmitting(true));
    setIsProcessingSync(true);

    let sheetSuccess = false;
    let emailSuccess = false;
    let generatedSheetUrl = spreadsheetInfo.url || '';
    let generatedSheetId = spreadsheetInfo.id || '';

    try {
      const accessToken = await getAccessToken();

      // If token is available, execute real Google Sheets & Gmail API calls
      if (accessToken) {
        // 1. Google Sheets sync
        try {
          const sheetInfo = await getOrCreateRegistrationSpreadsheet(accessToken);
          generatedSheetId = sheetInfo.id;
          generatedSheetUrl = sheetInfo.url;
          dispatch(setSpreadsheetInfo(sheetInfo));

          await appendRegistrationToSheet(accessToken, sheetInfo.id, currentRegistrationDraft);
          sheetSuccess = true;
        } catch (sheetErr: any) {
          console.error('Sheets error:', sheetErr);
          dispatch(
            addToast({
              title: 'Google Sheets Notice',
              message: `Could not write to Google Sheets: ${sheetErr.message}`,
              type: 'warning',
            })
          );
        }

        // 2. Gmail welcome email
        try {
          await sendWelcomeEmail(accessToken, currentRegistrationDraft);
          emailSuccess = true;

          dispatch(
            addOutboxRecord({
              id: `outbox-${Date.now()}`,
              recipientEmail: parentEmail,
              recipientName: parentName,
              childName: childName,
              sentAt: new Date().toISOString(),
              subject: `Welcome to TATI ChildSave! 🌟 Excited to have ${childName} join our community`,
              status: 'sent',
            })
          );
        } catch (emailErr: any) {
          console.error('Gmail error:', emailErr);
          dispatch(
            addToast({
              title: 'Gmail Notice',
              message: `Could not send welcome email via Gmail: ${emailErr.message}`,
              type: 'warning',
            })
          );
        }
      } else {
        // No Google token yet - fallback simulation
        dispatch(
          addToast({
            title: 'Saved in Local Community Registry',
            message: 'Signed up! Connect your Google Account anytime to mirror records directly to Google Sheets and Gmail.',
            type: 'info',
          })
        );
      }

      const completedReg: ChildRegistration = {
        ...currentRegistrationDraft,
        sheetSynced: sheetSuccess,
        welcomeEmailSent: emailSuccess,
        spreadsheetId: generatedSheetId,
        spreadsheetUrl: generatedSheetUrl,
      };

      // Update Redux state
      dispatch(addRegistrationSuccess(completedReg));
      dispatch(
        setActiveLearnerChild({
          name: childName,
          age: childAge,
          city: city,
          pathway: pathway,
        })
      );

      dispatch(
        addToast({
          title: '🎉 Welcome to TATI ChildSave!',
          message: `${childName} is now registered! ${
            sheetSuccess ? 'Sheet updated! ' : ''
          }${emailSuccess ? 'Welcome email sent! ' : ''}`,
          type: 'success',
        })
      );
    } catch (err: any) {
      console.error('Registration error:', err);
      dispatch(setSubmitError(err.message || 'Registration failed'));
      dispatch(
        addToast({
          title: 'Registration Alert',
          message: err.message || 'An error occurred during submission',
          type: 'error',
        })
      );
    } finally {
      dispatch(setSubmitting(false));
      setIsProcessingSync(false);
    }
  };

  return (
    <div className="py-12 bg-surface min-h-[calc(100vh-80px)] transition-colors">
      <ConfirmationModal onConfirm={handleExecuteConfirmedRegistration} isLoading={isProcessingSync} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-container flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Official Child Registration</span>
            </div>
            <h1 className="font-headline-lg text-primary tracking-tight">
              Start Your Child's Journey
            </h1>
          </div>

          {/* Top Status Pill */}
          {isAdmin ? (
            <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-400/40 text-xs text-amber-800 dark:text-amber-300">
              <span className="material-symbols-outlined text-[20px] text-amber-600 dark:text-amber-400">
                admin_panel_settings
              </span>
              <div className="text-xs">
                <span className="font-bold block">Administrator Mode Active</span>
                <span className="text-[11px] opacity-80">Auto-sync to Google Sheets & Gmail enabled</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 bg-surface-container-low px-4 py-2 rounded-2xl border border-surface-container text-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <div>
                <span className="font-bold text-on-surface block">Founding Family Enrolment</span>
                <span className="text-on-surface-variant text-[11px]">Physical TATI Kit Included • Learn Anywhere</span>
              </div>
            </div>
          )}
        </div>

        {/* Success Screen after registration */}
        {lastRegisteredChild && (
          <div className="mb-10 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-xl animate-scaleUp">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[32px]">celebration</span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-label-caps text-xs uppercase font-extrabold mb-1">
                    Enrolled & Active
                  </div>
                  <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                    {lastRegisteredChild.childName} is registered in TATI ChildSave!
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                    Pathway: <strong className="text-primary uppercase">{lastRegisteredChild.pathway}</strong> • Physical Kit queued for dispatch to {lastRegisteredChild.kitDeliveryAddress}.
                  </p>
                  
                  {/* Status Chips */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-zinc-900 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Enrolment Confirmed
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-zinc-900 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      Welcome Email Dispatched
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-zinc-900 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
                      <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                      Kit Queued for Packaging
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                {isAdmin && lastRegisteredChild.spreadsheetUrl && (
                  <a
                    href={lastRegisteredChild.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 text-on-surface font-title-md text-xs font-bold border border-surface-container shadow-sm hover:border-primary transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">open_in_new</span>
                    <span>Admin: View Sheet</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(setActiveTab('parent-dashboard'))}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 text-on-surface font-title-md text-xs font-bold border border-surface-container shadow-sm hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">family_restroom</span>
                  <span>Parent Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(setActiveTab('learner'))}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-title-md text-xs font-bold shadow-md hover:bg-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                  <span>Launch Child Quest</span>
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Wizard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Form Card */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container">
            {/* Step Tabs */}
            <div className="flex items-center justify-between border-b border-surface-container pb-6 mb-8">
              {[
                { step: 1, label: '1. Child Info', icon: 'face' },
                { step: 2, label: '2. Parent & Contact', icon: 'badge' },
                { step: 3, label: '3. Pathway & Kit', icon: 'local_shipping' },
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(s.step as any)}
                  className={`flex items-center gap-2 pb-2 text-xs sm:text-sm font-bold transition-all border-b-2 -mb-[26px] ${
                    activeStep === s.step
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleInitiateSubmit} className="space-y-6">
              {/* STEP 1: Child Details */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-primary-fixed/20 p-4 rounded-2xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">school</span>
                    <p className="font-body-sm text-xs text-on-surface">
                      TATI ChildSave is tailored for children aged <strong>8 to 12</strong> across Africa and the global diaspora.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        Child Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={childName}
                        onChange={(e) => handleInputChange('childName', e.target.value)}
                        placeholder="e.g. Kwabena Asante"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        Child Age (8–12) *
                      </label>
                      <select
                        value={childAge}
                        onChange={(e) => handleInputChange('childAge', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {[8, 9, 10, 11, 12].map((a) => (
                          <option key={a} value={a}>
                            {a} Years Old
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        Gender
                      </label>
                      <select
                        value={childGender}
                        onChange={(e) => handleInputChange('childGender', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="girl">Girl</option>
                        <option value="boy">Boy</option>
                        <option value="other">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="e.g. Accra"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="e.g. Ghana"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                      First Target Savings Goal
                    </label>
                    <input
                      type="text"
                      value={savingsGoal}
                      onChange={(e) => handleInputChange('savingsGoal', e.target.value)}
                      placeholder="e.g. Solar Science Kit, Storybook Series, Bicycle"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-[11px] text-on-surface-variant mt-1 block">
                      This will be pre-loaded into the child's interactive goal tracker.
                    </span>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-bold text-sm hover:bg-primary transition-all flex items-center gap-2"
                    >
                      <span>Continue to Parent Info</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Parent Information */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-secondary-fixed/20 p-4 rounded-2xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                    <p className="font-body-sm text-xs text-on-surface">
                      The welcome email and weekly 5-minute TATI Talk prompts will be sent to the email address entered here.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                      Parent / Guardian Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      placeholder="e.g. Dr. Kwame Mensah"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        Parent Email Address (Will receive Gmail welcome) *
                      </label>
                      <input
                        type="email"
                        required
                        value={parentEmail}
                        onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={parentPhone}
                        onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        placeholder="+233 24 000 0000"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-bold text-sm hover:bg-primary transition-all flex items-center gap-2"
                    >
                      <span>Continue to Pathway & Delivery</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Pathway & Delivery Address */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                      Choose Learning Pathway *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'flex',
                          title: 'TATI Junior Flex',
                          badge: 'Self-Paced',
                          desc: 'Full digital journey + Physical kit + monthly virtual room.',
                        },
                        {
                          id: 'virtual',
                          title: 'Academy Virtual',
                          badge: 'Live Online Cohort',
                          desc: '12 weekly live sessions with expert facilitator.',
                        },
                        {
                          id: 'in-person',
                          title: 'Academy In-Person',
                          badge: 'Saturday Workshops',
                          desc: 'In-person market simulations & family graduation in Accra.',
                        },
                      ].map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleInputChange('pathway', p.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            pathway === p.id
                              ? 'border-primary bg-primary-fixed/20 shadow-md ring-2 ring-primary/20'
                              : 'border-surface-container bg-surface-container-low hover:border-outline'
                          }`}
                        >
                          <span className="font-label-caps text-[10px] uppercase font-bold text-primary block mb-1">
                            {p.badge}
                          </span>
                          <h4 className="font-title-md text-sm font-bold text-on-surface mb-1">
                            {p.title}
                          </h4>
                          <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                      Physical TATI Junior Kit Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={kitDeliveryAddress}
                      onChange={(e) => handleInputChange('kitDeliveryAddress', e.target.value)}
                      placeholder="e.g. House No. 24, Kofi Annan Street, East Legon, Accra (Nearby landmark: Shell Filling Station)"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-[11px] text-on-surface-variant mt-1 block">
                      The physical TATI Junior Kit (Workbook, Money Passport, Wallet & Mission Cards) will be packaged for this location.
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs border border-red-300">
                      {submitError}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-primary-container text-on-primary font-bold text-sm shadow-xl hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                      )}
                      <span>Complete Registration & Sync</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Enrollment Highlights Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* What Your Child Receives Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-md border border-surface-container space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[24px]">card_membership</span>
                <h3 className="font-title-md text-base text-on-surface font-extrabold">
                  What Your Child Receives
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Everything required for a rich, independent financial journey:
              </p>

              <ul className="space-y-3 text-xs text-on-surface">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Physical TATI Junior Kit:</strong> Delivered to your doorstep with workbook, passport, play money, and mission cards.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>12-Module Progressive Journey:</strong> Practical life skills from earning and saving to fraud protection.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Weekly 5-Minute TATI Talks:</strong> Ready-made conversation starters sent directly to your email.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Lifetime Community Membership:</strong> TATI Club events, trading simulations, and graduation certificate.
                  </span>
                </li>
              </ul>
            </div>

            {/* Parent Reassurance Card */}
            <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container space-y-3">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[20px]">shield</span>
                <span>Our Parent Promise</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No high-stakes pressure, no complex formulas, and zero commercial credit card or loan marketing. Just clean, foundational stewardship children remember for life.
              </p>
            </div>

            {/* Admin Diagnostic Card (Visible ONLY to Admin) */}
            {isAdmin && (
              <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-400/40 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold">
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  <span>Administrator Auto-Sync</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  Registrations automatically populate Google Sheets and dispatch welcome emails via Gmail.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowEmailPreviewModal(true)}
                    className="text-[11px] text-primary font-bold hover:underline"
                  >
                    Preview Template
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(setActiveTab('workspace'))}
                    className="text-[11px] text-amber-700 dark:text-amber-300 font-bold underline"
                  >
                    Admin Console →
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Full Email Preview Modal */}
      {showEmailPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp">
            <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
              <span className="font-title-md text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Gmail Welcome Message Preview</span>
              </span>
              <button
                type="button"
                onClick={() => setShowEmailPreviewModal(false)}
                className="text-white/80 hover:text-white"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto bg-neutral-100 dark:bg-neutral-900">
              <div
                dangerouslySetInnerHTML={{
                  __html: buildWelcomeEmailHtml(currentRegistrationDraft),
                }}
              />
            </div>
            <div className="p-4 bg-surface-container-low border-t border-surface-container flex justify-end">
              <button
                type="button"
                onClick={() => setShowEmailPreviewModal(false)}
                className="px-5 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
