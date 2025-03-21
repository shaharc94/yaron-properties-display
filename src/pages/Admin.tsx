
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminProperties from "@/components/AdminProperties";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordSubmit = () => {
    // Simple password check - in a real app this would be much more secure
    if (password === "admin123") {
      setIsAccessDialogOpen(false);
    } else {
      alert("סיסמה שגויה!");
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-realestate-primary">ניהול נכסים</h1>
          
          {!isAccessDialogOpen && <AdminProperties />}
          
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
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>ביטול</AlertDialogCancel>
                <AlertDialogAction onClick={handlePasswordSubmit}>כניסה</AlertDialogAction>
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
