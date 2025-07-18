import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, LogOut } from 'lucide-react';

interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  role: string;
  department: string;
  level: string;
  estimatedTime: number;
}

  const AdminPanel: React.FC = () => {
    // Simple demo logout: redirect to login
    const handleLogout = () => {
      window.location.href = '/';
    };
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<TaskTemplate>>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    role: '',
    department: '',
    level: '',
    estimatedTime: 30
  });

  // Fetch all task templates from Supabase
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('task_templates').select('*');
      if (!error && data) setTemplates(data);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  // Add a new task template to Supabase
  const handleAddTask = async () => {
    if (newTask.title && newTask.description) {
      const { data, error } = await supabase.from('task_templates').insert([
        {
          title: newTask.title,
          description: newTask.description,
          category: newTask.category || 'General',
          priority: newTask.priority || 'medium',
          role: newTask.role || 'any',
          department: newTask.department || 'any',
          level: newTask.level || 'any',
          estimated_time: newTask.estimatedTime || 30
        }
      ]).select();
      if (!error && data) setTemplates([...templates, ...data]);
      setNewTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        role: '',
        department: '',
        level: '',
        estimatedTime: 30
      });
      setIsAddingTask(false);
    }
  };

  // Delete a task template from Supabase
  const handleDeleteTask = async (id: string) => {
    const { error } = await supabase.from('task_templates').delete().eq('id', id);
    if (!error) setTemplates(templates.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Synchrony onboarding tasks
  const synchronyTasks: TaskTemplate[] = [
    {
      id: 'accept_offer',
      title: 'Accept Offer Letter',
      description: 'E-sign offer letter via portal/email.',
      category: 'Pre-Onboarding',
      priority: 'high',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 10
    },
    {
      id: 'background_verification',
      title: 'Complete Background Verification',
      description: 'Submit documents: educational certificates, ID proof, address proof, PAN card, etc. Third-party background verification (education, employment history, criminal records).',
      category: 'Pre-Onboarding',
      priority: 'high',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 30
    },
    {
      id: 'preboarding_portal',
      title: 'Submit Pre-joining Documents',
      description: 'Access onboarding portal, fill out joining forms, complete tax documentation, submit bank account details and UAN for EPF, upload photo and digital signature.',
      category: 'Pre-Onboarding',
      priority: 'medium',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 30
    },
    {
      id: 'it_setup',
      title: 'Receive Laptop & Login Credentials',
      description: 'Instructions to receive laptop and email from IT team for login credentials and system access.',
      category: 'Pre-Onboarding',
      priority: 'medium',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 20
    },
    {
      id: 'day1_induction',
      title: 'Attend Day 1 Induction',
      description: 'Welcome email, HR induction, company policies, culture, and values.',
      category: 'Joining Day',
      priority: 'high',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 60
    },
    {
      id: 'sign_nda',
      title: 'Sign NDA & Policy Documents',
      description: 'Verification of original documents and submission of signed hardcopies if required.',
      category: 'Joining Day',
      priority: 'high',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 20
    },
    {
      id: 'mandatory_trainings',
      title: 'Complete Mandatory Trainings',
      description: 'Code of Conduct, Data Security & Privacy, DE&I, Anti-Harassment & Ethics, Synchrony Culture & Values.',
      category: 'First Week',
      priority: 'high',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 120
    },
    {
      id: 'meet_manager_team',
      title: 'Meet Your Manager & Team',
      description: 'Meet your manager and team members. Organizational structure overview.',
      category: 'First Week',
      priority: 'medium',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 30
    },
    {
      id: 'setup_communication',
      title: 'Setup Communication Tools (Email, Teams, etc.)',
      description: 'Login to work email, Slack/Teams, Workday, ServiceNow, VPN, Duo 2FA, and other security setup.',
      category: 'First Week',
      priority: 'medium',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 30
    },
    {
      id: 'role_training',
      title: 'Start Role-Specific Training',
      description: 'On-the-job training, shadowing colleagues, access to internal LMS.',
      category: 'First 30–90 Days',
      priority: 'medium',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 180
    },
    {
      id: 'checkins',
      title: 'Attend Check-ins with HR & Manager',
      description: '1-on-1 with manager at 30, 60, and 90-day milestones. HR survey or onboarding feedback form.',
      category: 'First 30–90 Days',
      priority: 'low',
      role: 'any',
      department: 'any',
      level: 'any',
      estimatedTime: 30
    }
  ];

  // Bulk insert synchrony tasks to Supabase (skip if already exists)
  const handleGenerateSynchronyTasks = async () => {
    const existingIds = new Set(templates.map(t => t.id));
    const toInsert = synchronyTasks.filter(t => !existingIds.has(t.id));
    if (toInsert.length > 0) {
      const { data, error } = await supabase.from('task_templates').insert(
        toInsert.map(t => ({
          ...t,
          estimated_time: t.estimatedTime
        }))
      ).select();
      if (!error && data) setTemplates([...templates, ...data]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex gap-2 items-center">
            <Button 
              onClick={() => setIsAddingTask(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task Template</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        {loading && <div className="text-center text-gray-500">Loading tasks...</div>}

        {/* Add Task Form */}
        {isAddingTask && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Task Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    placeholder="e.g., Setup, Learning, Meetings"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value as 'high' | 'medium' | 'low'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newTask.role} onValueChange={(value) => setNewTask({...newTask, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Role</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="worker">Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={newTask.department} onValueChange={(value) => setNewTask({...newTask, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Department</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={newTask.level}
                    onValueChange={(value) => setNewTask({ ...newTask, level: value })}
                    disabled={newTask.role === 'intern'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Level</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={newTask.estimatedTime}
                  onChange={(e) => setNewTask({...newTask, estimatedTime: parseInt(e.target.value)})}
                  placeholder="30"
                  min="1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask}>
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Onboarding Completion List (Demo) */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Completed Onboarding (Demo)</h2>
          {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('completed_users') || '[]').length === 0 ? (
            <div className="text-gray-500">No users have completed onboarding yet.</div>
          ) : (
            <ul className="list-disc ml-6 text-green-800">
              {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('completed_users') || '[]').map(email => (
                <li key={email}>{email}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Task Templates List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Task Templates ({templates.length})</h2>
          
          {templates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No task templates yet. Add your first task template to get started!</p>
              </CardContent>
            </Card>
          ) : (
            templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{template.title}</h3>
                        <Badge className={getPriorityColor(template.priority)}>
                          {template.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge variant="outline">Role: {template.role}</Badge>
                        <Badge variant="outline">Dept: {template.department}</Badge>
                        <Badge variant="outline">Level: {template.level}</Badge>
                        <Badge variant="outline">{template.estimatedTime} min</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteTask(template.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
