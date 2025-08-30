import { useState } from 'react';
import Hero from '@/components/Hero';
import UploadForm from '@/components/UploadForm';
import Results from '@/components/Results';

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'upload' | 'results'>('hero');
  const [resultData, setResultData] = useState(null);

  const handleShowUpload = () => setCurrentView('upload');
  const handleShowResults = (data: any) => {
    setResultData(data);
    setCurrentView('results');
  };
  const handleBackToUpload = () => setCurrentView('upload');
  const handleStartOver = () => {
    setCurrentView('hero');
    setResultData(null);
  };

  return (
    <>
      {currentView === 'hero' && <Hero onGetStarted={handleShowUpload} />}
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
