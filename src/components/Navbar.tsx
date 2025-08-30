import { Button } from '@/components/ui/button';

interface NavbarProps {
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onProfileClick: () => void;
}

const Navbar = ({ isLoggedIn, onAuthClick, onProfileClick }: NavbarProps) => {
  return (
    <nav className="flex justify-between items-center p-6 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">D</span>
        </div>
        <span className="text-2xl font-bold text-foreground">Datrix</span>
      </div>
      <Button 
        variant="primary" 
        size="lg" 
        onClick={isLoggedIn ? onProfileClick : onAuthClick}
      >
        {isLoggedIn ? 'Profile' : 'Try Now'}
      </Button>
    </nav>
  );
};

export default Navbar;