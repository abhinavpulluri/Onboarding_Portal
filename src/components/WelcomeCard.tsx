
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/User";
import { Sparkles, Calendar, Building } from "lucide-react";

interface WelcomeCardProps {
  user: User;
  progress: number;
}

export const WelcomeCard = ({ user, progress }: WelcomeCardProps) => {
  const startDate = new Date(user.startDate);
  const daysWithCompany = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  
  const getWelcomeMessage = () => {
    if (daysWithCompany === 0) return "Welcome to your first day!";
    if (daysWithCompany < 7) return `Day ${daysWithCompany + 1} - You're doing great!`;
    if (daysWithCompany < 30) return "Getting settled in nicely!";
    return "You're becoming a valued team member!";
  };

  const getProgressMessage = () => {
    if (progress === 0) return "Let's get started with your onboarding!";
    if (progress < 25) return "Nice start! Keep up the momentum.";
    if (progress < 50) return "You're making great progress!";
    if (progress < 75) return "More than halfway there!";
    if (progress < 100) return "Almost done - you've got this!";
    return "Congratulations on completing your onboarding!";
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-2xl font-bold">
                Welcome, {user.name}!
              </h2>
            </div>
            
            <p className="text-blue-100 text-lg">
              {getWelcomeMessage()}
            </p>
            
            <p className="text-blue-50">
              {getProgressMessage()}
            </p>
            
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-blue-200" />
                <span className="text-blue-100 text-sm capitalize">
                  {user.department} Department
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-200" />
                <span className="text-blue-100 text-sm">
                  {daysWithCompany === 0 ? "Started today" : `Day ${daysWithCompany + 1}`}
                </span>
              </div>
              
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                {user.role === 'intern' ? 'Intern' : 'Employee'}
              </Badge>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">{progress}%</div>
            <div className="text-blue-100 text-sm">Complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
