import React, { createContext, useContext, useState, ReactNode } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import CoursesPage from './components/CoursesPage';
import BookingPage from './components/BookingPage';
import QuizPage from './components/QuizPage';
import SubscriptionPage from './components/SubscriptionPage';
import CalendarPage from './components/CalendarPage';
import ProfilePage from './components/ProfilePage';
import OnboardingFlow from './components/OnboardingFlow';

interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'pro';
  trialEndsAt?: Date;
  phone?: string;
  location?: string;
  bio?: string;
  handicap?: string;
  profilePicture?: string;
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  startFreeTrial: () => void;
  upgradePlan: (plan: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (email: string, _password: string) => {
    // Mock authentication
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      subscription: 'free',
      profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
    });
  };

  const register = (name: string, email: string, _password: string) => {
    // Mock registration
    setUser({
      id: '1',
      name,
      email,
      subscription: 'free',
      profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const startFreeTrial = () => {
    if (user) {
      setUser({
        ...user,
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    }
  };

  const upgradePlan = (plan: string) => {
    if (user) {
      setUser({
        ...user,
        subscription: plan as 'premium' | 'pro'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, startFreeTrial, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register') => {
    if (mode === 'register') {
      // Show onboarding flow for registration
      setShowOnboarding(true);
    } else {
      // Show login modal
      setAuthMode(mode);
      setShowAuthModal(true);
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {showOnboarding ? (
          <OnboardingFlow
            onComplete={() => {
              setShowOnboarding(false);
              setCurrentPage('dashboard');
            }}
            onCancel={() => {
              setShowOnboarding(false);
              setCurrentPage('landing');
            }}
          />
        ) : (
          <>
            <AppContent 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage}
              openAuth={openAuth}
            />
            {showAuthModal && (
              <AuthModal
                mode={authMode}
                onClose={() => setShowAuthModal(false)}
                onSwitch={(mode) => {
                  if (mode === 'register') {
                    setShowAuthModal(false);
                    setShowOnboarding(true);
                  } else {
                    setAuthMode(mode);
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </AuthProvider>
  );
}

interface AppContentProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openAuth: (mode: 'login' | 'register') => void;
}

const AppContent: React.FC<AppContentProps> = ({ currentPage, setCurrentPage, openAuth }) => {
  const { user } = useAuth();

  const renderPage = () => {
    if (!user && currentPage !== 'landing') {
      return <LandingPage onNavigate={setCurrentPage} openAuth={openAuth} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'courses':
        return <CoursesPage onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingPage onNavigate={setCurrentPage} />;
      case 'calendar':
        return <CalendarPage onNavigate={setCurrentPage} />;
      case 'quiz':
        return <QuizPage onNavigate={setCurrentPage} />;
      case 'subscription':
        return <SubscriptionPage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} openAuth={openAuth} />;
    }
  };

  return renderPage();
};

export default App;