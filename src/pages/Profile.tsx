import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileProps {
  user: { email: string; name: string } | null;
  onLogout: () => void;
  onBack: () => void;
  onUpload: () => void;
}

const Profile = ({ user, onLogout, onBack, onUpload }: ProfileProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">D</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Datrix</span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack}>
            Back to Home
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Welcome, {user?.name}!</CardTitle>
              <p className="text-muted-foreground text-center">
                Ready to transform your data with Datrix?
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Account Info</h3>
                  <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
                  <p className="text-sm text-muted-foreground">Member since: January 2025</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Usage Stats</h3>
                  <p className="text-sm text-muted-foreground">Files processed: 0</p>
                  <p className="text-sm text-muted-foreground">Data transformed: 0 MB</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="primary" size="lg" onClick={onUpload}>
                  Start Processing Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;