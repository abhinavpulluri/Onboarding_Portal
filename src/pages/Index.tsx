
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Company! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with your personalized onboarding journey tailored to your role and experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">New Employee Portal</CardTitle>
              <CardDescription>
                Get your personalized onboarding checklist based on your role, department, and experience level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/onboarding')}
                className="w-full"
                size="lg"
              >
                Start My Onboarding
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Admin Panel</CardTitle>
              <CardDescription>
                Manage task templates and customize onboarding experiences for different roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/admin')}
                className="w-full"
                size="lg"
                variant="outline"
              >
                Manage Tasks
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Built with React, TypeScript, and Tailwind CSS for a modern onboarding experience.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>✨ Personalized Checklists</span>
            <span>📊 Progress Tracking</span>
            <span>🎯 Role-Based Tasks</span>
            <span>📱 Mobile Responsive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
