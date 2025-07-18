export type Profile = {
  id: string;
  full_name?: string;
  role: 'admin' | 'new_joiner';
  department?: string;
  level?: string;
};

export type TaskTemplate = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  role: string;
  department: string;
  level: string;
  estimated_time: number;
};
