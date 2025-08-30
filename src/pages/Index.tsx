import { useState, useEffect } from 'react';
import Home from './Home';
import UploadForm from '@/components/UploadForm';
import Results from '@/components/Results';
import Auth from './Auth';
import Profile from './Profile';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'results' | 'auth' | 'profile'>('home');
  const [resultData, setResultData] = useState(null);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for saved login state on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('datrix_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const handleShowUpload = () => setCurrentView('upload');
  const handleShowResults = (data: any) => {
    setResultData(data);
    setCurrentView('results');
  };
  const handleBackToUpload = () => setCurrentView('upload');
  const handleStartOver = () => {
    setCurrentView('home');
    setResultData(null);
  };

  const handleAuthClick = () => setCurrentView('auth');
  const handleProfileClick = () => setCurrentView('profile');
  
  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('datrix_user', JSON.stringify(userData));
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('datrix_user');
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' && (
        <Home 
          onGetStarted={handleShowUpload}
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onProfileClick={handleProfileClick}
        />
      )}
      {currentView === 'auth' && (
        <Auth onLogin={handleLogin} onBack={handleStartOver} />
      )}
      {currentView === 'profile' && (
        <Profile 
          user={user}
          onLogout={handleLogout}
          onBack={handleStartOver}
          onUpload={handleShowUpload}
        />
      )}
      {currentView === 'upload' && (
        <UploadForm onBack={handleStartOver} onResult={handleShowResults} />
      )}
      {currentView === 'results' && resultData && (
        <Results 
          data={resultData} 
          onBack={handleBackToUpload} 
          onStartOver={handleStartOver} 
        />
      )}
    </>
  );
};

export default Index;
