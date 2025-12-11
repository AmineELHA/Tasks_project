import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/projects" className="text-2xl font-bold">
            Task Manager
          </Link>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
