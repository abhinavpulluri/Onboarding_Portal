import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import ProfileForm from '@/components/ProfileForm';
import OnboardingDashboard from '@/components/OnboardingDashboard';
import { User } from '@/types/User';

const OnboardingContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  const handleProfileComplete = (userData: User) => {
    setHasCompletedProfile(true);
  };

  if (isAuthenticated && user) {
    return <OnboardingDashboard user={user} />;
  }

  return <ProfileForm onComplete={handleProfileComplete} />;
};

const OnboardingPage: React.FC = () => {
  return (
    <AuthProvider>
      <OnboardingContent />
    </AuthProvider>
  );
};

export default OnboardingPage;
