import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChildRegistration } from '../types';

interface OutboxEmailRecord {
  id: string;
  recipientEmail: string;
  recipientName: string;
  childName: string;
  sentAt: string;
  subject: string;
  status: 'sent' | 'pending' | 'failed';
}

interface RegistrationState {
  registrations: ChildRegistration[];
  activeForm: Partial<ChildRegistration>;
  isSubmitting: boolean;
  submitError: string | null;
  spreadsheetInfo: {
    id: string | null;
    url: string | null;
    title: string | null;
    lastSyncedAt: string | null;
  };
  emailOutbox: OutboxEmailRecord[];
  lastRegisteredChild: ChildRegistration | null;
}

const defaultRegistrations: ChildRegistration[] = [
  {
    id: 'reg-001',
    childName: 'Ama Mensah',
    childAge: 10,
    childGender: 'girl',
    city: 'Accra',
    country: 'Ghana',
    avatarSeed: 'ama',
    parentName: 'Nana Kwame Mensah',
    parentEmail: 'charlesadusarkodie@gmail.com',
    parentPhone: '+233 24 123 4567',
    pathway: 'flex',
    kitDeliveryAddress: '14 Independence Avenue, Ridge, Accra',
    savingsGoal: 'Solar Science Experiment Kit',
    initialSavingsCedis: 75,
    registeredAt: '2026-09-28T10:15:00Z',
    sheetSynced: true,
    welcomeEmailSent: true,
  },
  {
    id: 'reg-002',
    childName: 'Kofi Boateng',
    childAge: 11,
    childGender: 'boy',
    city: 'Kumasi',
    country: 'Ghana',
    avatarSeed: 'kofi',
    parentName: 'Abena Boateng',
    parentEmail: 'abena.boateng@example.com',
    parentPhone: '+233 20 876 5432',
    pathway: 'virtual',
    kitDeliveryAddress: 'Plot 12 Ahodwo Hills, Kumasi',
    savingsGoal: 'Junior Coding Raspberry Pi',
    initialSavingsCedis: 40,
    registeredAt: '2026-10-01T14:30:00Z',
    sheetSynced: true,
    welcomeEmailSent: true,
  }
];

const loadSavedRegistrations = (): ChildRegistration[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('tati_registrations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored registrations', e);
      }
    }
  }
  return defaultRegistrations;
};

const initialState: RegistrationState = {
  registrations: loadSavedRegistrations(),
  activeForm: {
    childName: '',
    childAge: 9,
    childGender: 'girl',
    city: 'Accra',
    country: 'Ghana',
    parentName: '',
    parentEmail: '',
    parentPhone: '+233 ',
    pathway: 'flex',
    kitDeliveryAddress: '',
    savingsGoal: 'First Savings Goal',
    initialSavingsCedis: 50,
  },
  isSubmitting: false,
  submitError: null,
  spreadsheetInfo: {
    id: null,
    url: null,
    title: 'TATI ChildSave Community Registrations',
    lastSyncedAt: null,
  },
  emailOutbox: [
    {
      id: 'outbox-001',
      recipientEmail: 'charlesadusarkodie@gmail.com',
      recipientName: 'Nana Kwame Mensah',
      childName: 'Ama Mensah',
      sentAt: '2026-09-28T10:15:20Z',
      subject: 'Welcome to TATI ChildSave! 🌟 Excited to have Ama Mensah join our community',
      status: 'sent',
    }
  ],
  lastRegisteredChild: null,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateActiveForm: (state, action: PayloadAction<Partial<ChildRegistration>>) => {
      state.activeForm = { ...state.activeForm, ...action.payload };
    },
    resetActiveForm: (state) => {
      state.activeForm = {
        childName: '',
        childAge: 10,
        childGender: 'girl',
        city: 'Accra',
        country: 'Ghana',
        parentName: '',
        parentEmail: '',
        parentPhone: '+233 ',
        pathway: 'flex',
        kitDeliveryAddress: '',
        savingsGoal: 'Science Project & Savings Goal',
        initialSavingsCedis: 50,
      };
      state.submitError = null;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSubmitError: (state, action: PayloadAction<string | null>) => {
      state.submitError = action.payload;
      state.isSubmitting = false;
    },
    addRegistrationSuccess: (state, action: PayloadAction<ChildRegistration>) => {
      state.registrations.unshift(action.payload);
      state.lastRegisteredChild = action.payload;
      state.isSubmitting = false;
      state.submitError = null;

      if (typeof window !== 'undefined') {
        localStorage.setItem('tati_registrations', JSON.stringify(state.registrations));
      }
    },
    setSpreadsheetInfo: (
      state,
      action: PayloadAction<{ id: string; url: string; title: string }>
    ) => {
      state.spreadsheetInfo = {
        ...action.payload,
        lastSyncedAt: new Date().toISOString(),
      };
    },
    addOutboxRecord: (state, action: PayloadAction<OutboxEmailRecord>) => {
      state.emailOutbox.unshift(action.payload);
    },
  },
});

export const {
  updateActiveForm,
  resetActiveForm,
  setSubmitting,
  setSubmitError,
  addRegistrationSuccess,
  setSpreadsheetInfo,
  addOutboxRecord,
} = registrationSlice.actions;

export default registrationSlice.reducer;
