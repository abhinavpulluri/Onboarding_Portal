
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LogOut, CheckCircle2, Clock, User, Building, Calendar, Trophy } from "lucide-react";
import { User as UserType, OnboardingChecklist } from "@/types/User";
import { ChecklistGenerator } from "@/utils/ChecklistGenerator";
import { ChecklistItem } from "@/components/ChecklistItem";
import { WelcomeCard } from "@/components/WelcomeCard";
import { StatsCard } from "@/components/StatsCard";
import { toast } from "@/hooks/use-toast";

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [checklist, setChecklist] = useState<OnboardingChecklist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate or load checklist
    const generator = new ChecklistGenerator();
    const generatedChecklist = generator.generateChecklist(user);
    
    // Check if there's a saved checklist
    const savedChecklistKey = `checklist_${user.id}`;
    const savedChecklist = localStorage.getItem(savedChecklistKey);
    
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        setChecklist(parsed);
      } catch (error) {
        console.error('Error parsing saved checklist:', error);
        setChecklist(generatedChecklist);
      }
    } else {
      setChecklist(generatedChecklist);
    }
    
    setIsLoading(false);
  }, [user]);

  const handleItemToggle = (itemId: string) => {
    if (!checklist) return;
    
    const updatedItems = checklist.items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
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
    
    if (progress === 100) {
      toast({
        title: "Congratulations! 🎉",
        description: "You've completed your onboarding checklist!",
      });
    }
  };

  if (isLoading || !checklist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const completedItems = checklist.items.filter(item => item.completed).length;
  const totalItems = checklist.items.length;
  const remainingItems = totalItems - completedItems;
  const estimatedTimeRemaining = checklist.items
    .filter(item => !item.completed)
    .reduce((total, item) => total + item.estimatedTime, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Onboarding Portal
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span className="font-medium">{user.name}</span>
                <Badge variant="secondary" className="capitalize">
                  {user.role}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <WelcomeCard user={user} progress={checklist.progress} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Total Tasks"
              value={totalItems}
              icon={CheckCircle2}
              color="blue"
            />
            <StatsCard
              title="Completed"
              value={completedItems}
              icon={Trophy}
              color="green"
            />
            <StatsCard
              title="Remaining"
              value={remainingItems}
              icon={Clock}
              color="orange"
            />
            <StatsCard
              title="Est. Time Left"
              value={`${Math.ceil(estimatedTimeRemaining / 60)}h`}
              icon={Calendar}
              color="purple"
            />
          </div>

          {/* Progress Overview */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span>Overall Progress</span>
              </CardTitle>
              <CardDescription>
                You've completed {completedItems} out of {totalItems} onboarding tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={checklist.progress} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{checklist.progress}% Complete</span>
                  <span>{remainingItems} tasks remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your Personalized Checklist</CardTitle>
              <CardDescription>
                Tasks tailored for {user.role}s in the {user.department} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklist.items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    onToggle={() => handleItemToggle(item.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
