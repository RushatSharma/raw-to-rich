import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Database, Mail, Play } from 'lucide-react';
import Navbar from './Navbar';

interface HeroProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onProfileClick: () => void;
}

const Hero = ({ onGetStarted, isLoggedIn, onAuthClick, onProfileClick }: HeroProps) => {
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTyping(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar 
        isLoggedIn={isLoggedIn}
        onAuthClick={onAuthClick}
        onProfileClick={onProfileClick}
      />

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-card rounded-full flex items-center justify-center float-animation" style={{boxShadow: 'var(--floating-shadow)'}}>
          <FileText className="w-8 h-8 text-primary" />
        </div>
        
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-card rounded-full flex items-center justify-center float-animation float-delay-1" style={{boxShadow: 'var(--floating-shadow)'}}>
          <Database className="w-8 h-8 text-primary" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-card rounded-full flex items-center justify-center float-animation float-delay-2" style={{boxShadow: 'var(--floating-shadow)'}}>
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-card rounded-full flex items-center justify-center float-animation" style={{boxShadow: 'var(--floating-shadow)'}}>
          <FileText className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            TURN RAW DATA INTO
            <br />
            <span className="text-primary">
              {showTyping ? (
                <span className="typing-effect">STRUCTURE.</span>
              ) : (
                'STRUCTURE.'
              )}
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xl text-muted-foreground">
              Let Datrix handle the chaos and surface the insights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" className="min-w-48" onClick={onGetStarted}>
              Try Datrix Now
            </Button>
            <Button variant="outline" size="lg" className="min-w-48">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom floating icon */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center float-animation float-delay-1" style={{boxShadow: 'var(--floating-shadow)'}}>
          <Database className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default Hero;