import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, User, Building, Trophy, LogOut } from 'lucide-react';
import { User as UserType, OnboardingChecklist } from '@/types/User';
import { ChecklistGenerator } from '@/utils/ChecklistGenerator';
import { useNavigate } from 'react-router-dom';

interface OnboardingDashboardProps {
  user: UserType;
}

const OnboardingDashboard: React.FC<OnboardingDashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    console.log('Logging out');
    localStorage.removeItem('token'); // optional
    navigate('/');
  };

  const [checklist, setChecklist] = useState<OnboardingChecklist | null>(null);
  const [generator] = useState(new ChecklistGenerator());

  useEffect(() => {
    const savedChecklist = localStorage.getItem(`checklist_${user.id}`);
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    } else {
      const newChecklist = generator.generateChecklist(user);
      setChecklist(newChecklist);
      localStorage.setItem(`checklist_${user.id}`, JSON.stringify(newChecklist));
    }
  }, [user, generator]);

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
      case 'Setup': return '⚙';
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

  if (!checklist) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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