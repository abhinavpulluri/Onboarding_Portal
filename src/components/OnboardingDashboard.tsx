import React, { useState, useEffect } from 'react';
// Welcome Popup Component
const WelcomePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <div style={{
      backgroundColor: '#fff',
      padding: 30,
      borderRadius: 16,
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      textAlign: 'center',
      maxWidth: 400,
      animation: 'fadeIn 0.5s ease-in-out'
    }}>
      <h2 style={{ color: '#004c99', marginBottom: 10 }}>Welcome to Synchrony! 🎉</h2>
      <p style={{ fontSize: 16, color: '#444', marginBottom: 20 }}>
        Hi there! We're excited to have you on board.<br />
        Let's make something great together.
      </p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#004c99',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer'
        }}
        onClick={onClose}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
        autoFocus
      >
        Let’s Get Started
      </button>
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, User, Building, Trophy, LogOut } from 'lucide-react';
import { User as UserType, OnboardingChecklist, ChecklistItem } from '@/types/User';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

interface OnboardingDashboardProps {
  user: UserType;
}

const OnboardingDashboard: React.FC<OnboardingDashboardProps> = ({ user }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  // Show welcome popup only for new users (first visit)
  useEffect(() => {
    const welcomeKey = `welcome_shown_${user.id}`;
    if (!localStorage.getItem(welcomeKey)) {
      setShowWelcome(true);
      localStorage.setItem(welcomeKey, 'true');
    }
  }, [user.id]);
  const { logout } = useAuth();
  const [checklist, setChecklist] = useState<OnboardingChecklist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo fallback tasks
    const demoTasks = [
      {
        id: '1',
        title: 'Set up your Synchrony account',
        description: 'Log in and update your profile information.',
        category: 'Setup',
        priority: 'high',
        completed: false,
        estimatedTime: 10,
      },
      {
        id: '2',
        title: 'Meet your team',
        description: 'Attend the welcome meeting with your team.',
        category: 'Meetings',
        priority: 'medium',
        completed: false,
        estimatedTime: 30,
      },
      {
        id: '3',
        title: 'Complete onboarding training',
        description: 'Finish the required onboarding modules.',
        category: 'Training',
        priority: 'high',
        completed: false,
        estimatedTime: 60,
      },
      {
        id: '4',
        title: 'Setup work tools',
        description: 'Install and configure all necessary software.',
        category: 'Setup',
        priority: 'medium',
        completed: false,
        estimatedTime: 20,
      },
      {
        id: '5',
        title: 'Read company handbook',
        description: 'Review the Synchrony employee handbook.',
        category: 'Learning',
        priority: 'low',
        completed: false,
        estimatedTime: 15,
      },
    ];

    const fetchTasks = async () => {
      setLoading(true);
      let items = [];
      try {
        const { data, error } = await supabase
          .from('task_templates')
          .select('*')
          .or(`role.eq.${user.role},role.eq.any`)
          .or(`department.eq.${user.department},department.eq.any`)
          .or(`level.eq.${user.level},level.eq.any`);
        if (!error && data && data.length > 0) {
          // Remove duplicates (if any)
          const unique = Array.from(new Map(data.map(t => [t.id, t])).values());
          items = unique.map(t => ({
            id: t.id,
            title: t.title,
            description: t.description,
            category: t.category,
            priority: t.priority,
            completed: false,
            estimatedTime: t.estimated_time,
          }));
        } else {
          // Use demo tasks if no data or error
          items = demoTasks;
        }
      } catch (err) {
        items = demoTasks;
      }
      const now = new Date().toISOString();
      const checklistObj = {
        id: `checklist_${user.id}`,
        userId: user.id,
        items,
        progress: 0,
        createdAt: now,
        updatedAt: now,
      };
      setChecklist(checklistObj);
      setLoading(false);
    };
    fetchTasks();
  }, [user]);

  const handleTaskToggle = (taskId: string) => {
    if (!checklist) return;

    const updatedItems = checklist.items.map(item =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );

    const completedCount = updatedItems.filter(item => item.completed).length;
    const progress = Math.round((completedCount / updatedItems.length) * 100);

    const updatedChecklist = {
      ...checklist,
      items: updatedItems,
      progress,
      updatedAt: new Date().toISOString(),
    };

    setChecklist(updatedChecklist);
    localStorage.setItem(`checklist_${user.id}`, JSON.stringify(updatedChecklist));

    // If completed, mark in localStorage for admin panel
    if (progress === 100) {
      let completedUsers = JSON.parse(localStorage.getItem('completed_users') || '[]');
      if (!completedUsers.includes(user.email)) {
        completedUsers.push(user.email);
        localStorage.setItem('completed_users', JSON.stringify(completedUsers));
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Setup': return '⚙️';
      case 'Learning': return '📚';
      case 'Meetings': return '🤝';
      case 'Training': return '🎓';
      case 'Administrative': return '📋';
      case 'Social': return '👥';
      case 'Planning': return '📅';
      case 'Mentorship': return '🌟';
      default: return '📝';
    }
  };

  if (loading || !checklist) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Show welcome popup overlay if needed
  if (showWelcome) {
    return <WelcomePopup onClose={() => setShowWelcome(false)} />;
  }

  const completedTasks = checklist.items.filter(item => item.completed).length;
  const totalTasks = checklist.items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h1>
              <p className="text-gray-600">Your personalized onboarding checklist</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <User className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Role</p>
                <p className="text-lg font-semibold capitalize">{user.role}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <Building className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-lg font-semibold capitalize">{user.department}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-lg font-semibold capitalize">{user.level}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Onboarding Progress</span>
              <Badge variant="secondary" className="ml-2">
                {completedTasks} / {totalTasks} completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={checklist.progress} className="w-full h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{checklist.progress}% Complete</span>
                <span>{totalTasks - completedTasks} tasks remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Your Onboarding Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {checklist.items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  item.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => handleTaskToggle(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{getCategoryIcon(item.category)}</span>
                      <h3 className={`font-semibold ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.title}
                      </h3>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className={`text-gray-600 mb-3 ${item.completed ? 'line-through' : ''}`}>
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.estimatedTime} min</span>
                      </div>
                      <Badge variant="outline">{item.category}</Badge>
                      {item.dueDate && (
                        <span className="text-orange-600">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completion Message */}
        {checklist.progress === 100 && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Congratulations!
              </h2>
              <p className="text-green-700">
                You've completed your onboarding checklist. Welcome to the team!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OnboardingDashboard;
