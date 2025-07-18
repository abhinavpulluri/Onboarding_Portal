
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'intern' | 'worker';
  department: 'engineering' | 'marketing' | 'sales' | 'hr' | 'design';
  level: 'junior' | 'mid' | 'senior';
  startDate: string;
  avatar?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number; // in minutes
  completed: boolean;
  dueDate?: string;
}

export interface OnboardingChecklist {
  id: string;
  userId: string;
  items: ChecklistItem[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}
