
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminProperties from "@/components/AdminProperties";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if we have an active session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setAuthenticated(true);
        setIsAccessDialogOpen(false);
      }
    };
    
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuthenticated(true);
          setIsAccessDialogOpen(false);
        } else {
          setAuthenticated(false);
          setIsAccessDialogOpen(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handlePasswordSubmit = async () => {
    // Simple password check - in a real app this would be much more secure
    if (password === "admin123") {
      setAuthenticating(true);
      
      try {
        // For simplicity, we're using email password auth with a predefined admin account
        // In a real app, you'd want to use a more secure authentication method
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "admin@example.com",
          password: password
        });
        
        if (error) {
          console.error("Authentication error:", error);
          toast({
            title: "שגיאת התחברות",
            description: "אירעה שגיאה בהתחברות. נסה שוב מאוחר יותר.",
            variant: "destructive",
          });
        } else {
          setAuthenticated(true);
          setIsAccessDialogOpen(false);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        toast({
          title: "שגיאת התחברות",
          description: "אירעה שגיאה בהתחברות. נסה שוב מאוחר יותר.",
          variant: "destructive",
        });
      } finally {
        setAuthenticating(false);
      }
    } else {
      toast({
        title: "שגיאת התחברות",
        description: "סיסמה שגויה!",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    // Redirect to home if cancelled
    navigate("/");
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
    setIsAccessDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-realestate-primary">ניהול נכסים</h1>
            {authenticated && (
              <button 
                onClick={handleSignOut}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                התנתק
              </button>
            )}
          </div>
          
          {authenticated && <AdminProperties />}
          
          <AlertDialog open={isAccessDialogOpen} onOpenChange={setIsAccessDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>גישת מנהל</AlertDialogTitle>
                <AlertDialogDescription>
                  יש להזין סיסמת מנהל כדי לגשת לדף הניהול.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handlePasswordKeyDown}
                  placeholder="סיסמה"
                  className="w-full border border-gray-300 rounded p-2 text-right"
                  autoFocus
                  disabled={authenticating}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel} disabled={authenticating}>ביטול</AlertDialogCancel>
                <AlertDialogAction onClick={handlePasswordSubmit} disabled={authenticating}>
                  {authenticating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      מתחבר...
                    </>
                  ) : (
                    'כניסה'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
