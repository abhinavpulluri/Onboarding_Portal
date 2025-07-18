
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, UserPlus, Building, Briefcase } from "lucide-react";
import { User as UserType } from "@/types/User";
import { toast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "" as "intern" | "worker" | "",
    department: "" as "engineering" | "marketing" | "sales" | "hr" | "design" | "",
    level: "" as "junior" | "mid" | "senior" | "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      if (!formData.name || !formData.email || !formData.role || !formData.department || !formData.level) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      
      const newUser: UserType = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        level: formData.level,
        startDate: new Date().toISOString(),
      };
      
      onLogin(newUser);
      toast({
        title: "Welcome aboard! 🎉",
        description: "Your personalized onboarding checklist has been generated.",
      });
    } else {
      // Demo login
      if (!formData.email) {
        toast({
          title: "Error",
          description: "Please enter your email",
          variant: "destructive",
        });
        return;
      }
      
      // Demo user for quick login
      const demoUser: UserType = {
        id: "demo-user",
        name: "Demo User",
        email: formData.email,
        role: "worker",
        department: "engineering",
        level: "mid",
        startDate: new Date().toISOString(),
      };
      
      onLogin(demoUser);
      toast({
        title: "Welcome back!",
        description: "Logged in successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <Building className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Onboarding Portal
          </CardTitle>
          <CardDescription>
            {isRegistering ? "Create your account to get started" : "Welcome back! Sign in to continue"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11"
              />
            </div>
            
            {isRegistering && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value: "intern" | "worker") => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intern">Intern</SelectItem>
                      <SelectItem value="worker">Full-time Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select onValueChange={(value: "engineering" | "marketing" | "sales" | "hr" | "design") => setFormData({ ...formData, department: value })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Experience Level</Label>
                  <Select onValueChange={(value: "junior" | "mid" | "senior") => setFormData({ ...formData, level: value })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="mid">Mid-level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
              {isRegistering ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {isRegistering ? "Already have an account? Sign in" : "New here? Create an account"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
