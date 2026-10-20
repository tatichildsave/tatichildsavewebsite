export interface ChildRegistration {
  id: string;
  childName: string;
  childAge: number;
  childGender: 'girl' | 'boy' | 'other';
  city: string;
  country: string;
  avatarSeed: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  pathway: 'flex' | 'virtual' | 'in-person';
  kitDeliveryAddress: string;
  savingsGoal: string;
  initialSavingsCedis: number;
  registeredAt: string;
  sheetSynced: boolean;
  welcomeEmailSent: boolean;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
}

export interface CurriculumModule {
  id: number;
  numberString: string;
  title: string;
  summary: string;
  badgeName: string;
  badgeIcon: string;
  colorTheme: 'primary' | 'secondary' | 'tertiary';
  story: {
    character: string;
    scenario: string;
    africanContext: string;
  };
  discover: string;
  decideQuestion: string;
  options: {
    id: string;
    text: string;
    outcome: string;
    xpEarned: number;
    recommended: boolean;
  }[];
  doMission: string;
  discussPrompt: string;
  reflectPrompt: string;
}

export interface QuestScenario {
  id: string;
  title: string;
  round: number;
  situation: string;
  question: string;
  stewardshipLesson: string;
  choices: {
    id: string;
    label: string;
    consequence: string;
    xp: number;
    moralTag: string;
  }[];
}

export interface ChildLearnerState {
  activeChild: {
    name: string;
    age: number;
    city: string;
    level: number;
    xp: number;
    avatar: string;
    pathway: string;
  };
  unlockedModules: number[];
  completedModules: number[];
  earnedBadges: {
    id: string;
    title: string;
    icon: string;
    unlockedAt: string;
    category: string;
  }[];
  savingsGoal: {
    title: string;
    targetAmount: number;
    currentAmount: number;
    currency: string;
  };
  completedTalksCount: number;
  completedQuests: string[];
}
