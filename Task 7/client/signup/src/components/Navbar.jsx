import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("email");
      navigate("/"); 
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500">
      <div className="flex space-x-4">
        <Link to="/blogform" className="text-white px-4 py-2 rounded hover:bg-blue-600">Home</Link>
        <Link to="/about" className="text-white px-4 py-2 rounded hover:bg-blue-600">About</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/create" className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600">Create Blog</Link>
        <button 
          onClick={handleLogout} 
          className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
