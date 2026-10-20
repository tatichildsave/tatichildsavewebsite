import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { GoogleSignInButton } from '../common/GoogleSignInButton';
import { googleSignIn, logout, getAccessToken } from '../../services/workspaceAuth';
import { setUser, setLoggingIn, signOutUser, setAdminUnlocked, ADMIN_EMAIL } from '../../store/authSlice';
import { addToast, openConfirmationModal, closeConfirmationModal, setActiveTab } from '../../store/uiSlice';
import {
  getOrCreateRegistrationSpreadsheet,
  fetchRegistrationsFromSheet,
} from '../../services/sheetsService';
import { sendWelcomeEmail, buildWelcomeEmailHtml } from '../../services/gmailService';
import { setSpreadsheetInfo, addOutboxRecord } from '../../store/registrationSlice';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const WorkspaceSyncModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isAdmin, isLoggingIn } = useAppSelector((state) => state.auth);
  const { registrations, spreadsheetInfo, emailOutbox } = useAppSelector(
    (state) => state.registration
  );

  const [isLoadingSheetRows, setIsLoadingSheetRows] = useState(false);
  const [liveSheetRows, setLiveSheetRows] = useState<string[][]>([]);
  const [testEmailRecipient, setTestEmailRecipient] = useState('');
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === 'tati2026' || passcodeInput === 'admin') {
      dispatch(setAdminUnlocked(true));
      setPasscodeInput('');
      setPasscodeError(false);
      dispatch(
        addToast({
          title: 'Admin Access Granted',
          message: 'Welcome to the Administrator Google Sheets & Gmail Hub.',
          type: 'success',
        })
      );
    } else {
      setPasscodeError(true);
    }
  };


  const handleSignIn = async () => {
    dispatch(setLoggingIn(true));
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
        dispatch(
          addToast({
            title: 'Google Workspace Active',
            message: 'Signed in! Google Sheets & Gmail are fully authorized.',
            type: 'success',
          })
        );
      }
    } catch (err: any) {
      dispatch(
        addToast({
          title: 'Google Sign In Error',
          message: err.message || 'Authentication failed',
          type: 'error',
        })
      );
    } finally {
      dispatch(setLoggingIn(false));
    }
  };

  const handleSignOut = async () => {
    await logout();
    dispatch(signOutUser());
    dispatch(addToast({ title: 'Signed Out', message: 'Google account disconnected', type: 'info' }));
  };

  const handleFetchSheetData = async () => {
    setIsLoadingSheetRows(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        dispatch(
          addToast({
            title: 'Authentication Required',
            message: 'Please sign in with Google to read from Google Sheets.',
            type: 'warning',
          })
        );
        return;
      }

      const sheet = await getOrCreateRegistrationSpreadsheet(token);
      dispatch(setSpreadsheetInfo(sheet));

      const rows = await fetchRegistrationsFromSheet(token, sheet.id);
      setLiveSheetRows(rows);
      dispatch(
        addToast({
          title: 'Google Sheets Refreshed',
          message: `Retrieved ${rows.length} rows from "${sheet.title}".`,
          type: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        addToast({
          title: 'Sheets Fetch Error',
          message: err.message || 'Could not fetch spreadsheet data',
          type: 'error',
        })
      );
    } finally {
      setIsLoadingSheetRows(false);
    }
  };

  const handleInitiateTestEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmailRecipient || !testEmailRecipient.includes('@')) {
      dispatch(addToast({ title: 'Invalid Email', message: 'Please provide a valid recipient email', type: 'warning' }));
      return;
    }

    // Workspace Integration Rule: Must trigger user confirmation before sending email
    dispatch(
      openConfirmationModal({
        title: 'Confirm Sending Welcome Email',
        description: `Are you sure you want to dispatch a test welcome email to "${testEmailRecipient}" via Gmail?`,
        affectedItems: [
          `Send RFC 2822 formatted TATI welcome email to ${testEmailRecipient}`,
          `Log message record in community email outbox`,
        ],
        confirmLabel: 'Confirm & Send Email',
        cancelLabel: 'Cancel',
      })
    );
  };

  const handleExecuteSendTestEmail = async () => {
    dispatch(closeConfirmationModal());
    setIsSendingTestEmail(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        dispatch(
          addToast({
            title: 'Authentication Required',
            message: 'Please sign in with Google to send emails via Gmail.',
            type: 'warning',
          })
        );
        return;
      }

      const sampleReg = registrations[0] || {
        id: 'test-reg',
        childName: 'Ama Mensah',
        childAge: 10,
        childGender: 'girl',
        city: 'Accra',
        country: 'Ghana',
        avatarSeed: 'ama',
        parentName: user?.displayName || 'Community Parent',
        parentEmail: testEmailRecipient,
        parentPhone: '+233 24 000 0000',
        pathway: 'flex',
        kitDeliveryAddress: '14 Independence Avenue, Accra',
        savingsGoal: 'Solar Science Kit',
        initialSavingsCedis: 75,
        registeredAt: new Date().toISOString(),
        sheetSynced: true,
        welcomeEmailSent: true,
      };

      await sendWelcomeEmail(token, {
        ...sampleReg,
        parentEmail: testEmailRecipient,
      });

      dispatch(
        addOutboxRecord({
          id: `outbox-${Date.now()}`,
          recipientEmail: testEmailRecipient,
          recipientName: sampleReg.parentName,
          childName: sampleReg.childName,
          sentAt: new Date().toISOString(),
          subject: `Welcome to TATI ChildSave! 🌟 Excited to have ${sampleReg.childName} join our community`,
          status: 'sent',
        })
      );

      dispatch(
        addToast({
          title: 'Email Sent via Gmail! 🚀',
          message: `Personalized welcome email was delivered to ${testEmailRecipient}.`,
          type: 'success',
        })
      );
      setTestEmailRecipient('');
    } catch (err: any) {
      dispatch(
        addToast({
          title: 'Gmail Send Failed',
          message: err.message || 'Could not send email via Gmail API',
          type: 'error',
        })
      );
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-20 bg-surface min-h-[calc(100vh-80px)] flex items-center justify-center px-4 transition-colors">
        <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl shadow-2xl border border-surface-container text-center space-y-6 animate-scaleUp">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">lock</span>
          </div>

          <div>
            <span className="font-label-caps text-xs uppercase text-amber-700 dark:text-amber-400 font-extrabold tracking-wider block mb-1">
              Restricted Area
            </span>
            <h2 className="font-headline-sm text-xl font-extrabold text-on-surface">
              Administrator Access Required
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
              The Google Sheets registration spreadsheet and Gmail welcome logs are restricted to platform administrators ({ADMIN_EMAIL}). Visitors and parents do not have access.
            </p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="space-y-3 text-left">
            <div>
              <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {passcodeError && (
                <p className="text-[11px] text-red-500 mt-1 font-semibold">
                  Incorrect passcode. (Use admin credentials or sign in with {ADMIN_EMAIL})
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-bold shadow-md hover:bg-primary transition-all"
            >
              Unlock Administrator Portal
            </button>
          </form>

          <div className="pt-2 border-t border-surface-container flex flex-col gap-3">
            <GoogleSignInButton
              onClick={handleSignIn}
              isLoading={isLoggingIn}
              label={`Sign in as ${ADMIN_EMAIL.split('@')[0]}`}
              className="w-full !justify-center"
            />
            <button
              type="button"
              onClick={() => dispatch(setActiveTab('home'))}
              className="text-xs text-on-surface-variant hover:text-on-surface font-semibold"
            >
              ← Return to Public Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-surface min-h-[calc(100vh-80px)] transition-colors">
      <ConfirmationModal onConfirm={handleExecuteSendTestEmail} isLoading={isSendingTestEmail} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-surface-container pb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              <span>Platform Administrator Portal</span>
            </div>
            <h1 className="font-headline-lg text-primary tracking-tight">
              Google Sheets & Gmail Console
            </h1>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Restricted to {ADMIN_EMAIL} for managing live spreadsheet data and welcome messages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                dispatch(setAdminUnlocked(false));
                dispatch(setActiveTab('home'));
              }}
              className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Exit Admin Mode</span>
            </button>
          </div>
        </div>


        {/* Auth Status Banner */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-2xl flex-shrink-0">
              {isAuthenticated ? (
                <span className="material-symbols-outlined text-[32px] text-tertiary">check_circle</span>
              ) : (
                <span className="material-symbols-outlined text-[32px]">sync</span>
              )}
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                {isAuthenticated ? 'Google Workspace Connected' : 'Connect Your Google Account'}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                {isAuthenticated
                  ? `Signed in as ${user?.displayName || user?.email}. Google Sheets and Gmail permissions active.`
                  : 'Sign in to allow TATI ChildSave to record registrations to Google Sheets and dispatch welcome emails.'}
              </p>
            </div>
          </div>

          <div>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest transition-colors"
              >
                Disconnect Account
              </button>
            ) : (
              <GoogleSignInButton
                onClick={handleSignIn}
                isLoading={isLoggingIn}
                label="Sign in with Google"
              />
            )}
          </div>
        </div>

        {/* 2-Column Grid: Sheets & Mail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Google Sheets Viewer */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-surface-container space-y-5">
            <div className="flex items-center justify-between border-b border-surface-container pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[24px]">table_chart</span>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Community Google Sheet
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {spreadsheetInfo.title || 'TATI ChildSave Community Registrations'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {spreadsheetInfo.url && (
                  <a
                    href={spreadsheetInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary flex items-center gap-1 hover:bg-surface-container-highest"
                  >
                    <span>Open Sheet</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleFetchSheetData}
                  disabled={isLoadingSheetRows}
                  className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-primary transition-all disabled:opacity-50"
                >
                  {isLoadingSheetRows ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined text-[15px]">refresh</span>
                  )}
                  <span>Refresh Rows</span>
                </button>
              </div>
            </div>

            {/* Table Display */}
            <div className="overflow-x-auto rounded-xl border border-surface-container max-h-[420px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider sticky top-0 font-bold">
                  <tr>
                    <th className="p-3">Time</th>
                    <th className="p-3">Child</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Parent</th>
                    <th className="p-3">Pathway</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {liveSheetRows.length > 1 ? (
                    liveSheetRows.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-surface-container/50">
                        <td className="p-3 text-on-surface-variant whitespace-nowrap">{row[0]}</td>
                        <td className="p-3 font-bold text-on-surface">{row[1]}</td>
                        <td className="p-3">{row[2]}</td>
                        <td className="p-3">{row[4]}</td>
                        <td className="p-3 text-on-surface-variant">{row[6]}</td>
                        <td className="p-3 font-semibold text-primary">{row[9]}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {row[12] || 'Enrolled'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-surface-container/50">
                        <td className="p-3 text-on-surface-variant whitespace-nowrap">
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 font-bold text-on-surface">{reg.childName}</td>
                        <td className="p-3">{reg.childAge}</td>
                        <td className="p-3">{reg.city}</td>
                        <td className="p-3 text-on-surface-variant">{reg.parentName}</td>
                        <td className="p-3 font-semibold text-primary uppercase">{reg.pathway}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Gmail Welcome Outbox & Tester */}
          <div className="lg:col-span-5 space-y-6">
            {/* Outbox Log */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-surface-container space-y-4">
              <div className="flex items-center justify-between border-b border-surface-container pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">mail</span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Gmail Sent Outbox
                  </h3>
                </div>
                <span className="text-xs text-on-surface-variant">
                  {emailOutbox.length} dispatched
                </span>
              </div>

              <div className="space-y-3 max-h-[280px] overflow-y-auto">
                {emailOutbox.map((mail) => (
                  <div
                    key={mail.id}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">{mail.recipientName}</span>
                      <span className="text-[10px] text-on-surface-variant">
                        {new Date(mail.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate">To: {mail.recipientEmail}</p>
                    <p className="font-medium text-primary text-[11px] truncate">{mail.subject}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold pt-1">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>Dispatched via Gmail API</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Email Sender Form */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-xl border border-surface-container space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">send</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Send Welcome Email Tester
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant">
                Enter an email address to dispatch an authentic TATI ChildSave welcome message via Gmail:
              </p>

              <form onSubmit={handleInitiateTestEmail} className="space-y-3">
                <input
                  type="email"
                  required
                  value={testEmailRecipient}
                  onChange={(e) => setTestEmailRecipient(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={isSendingTestEmail}
                  className="w-full py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Send Test Welcome Email</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
