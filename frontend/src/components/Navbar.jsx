import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/projects" className="text-2xl font-bold hover:opacity-90 transition-opacity">
            Task Manager
          </Link>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.email}</span>
              <Button
                onClick={logout}
                size="sm"
                variant="secondary"
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
