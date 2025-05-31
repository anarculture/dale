// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6 text-sm">
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}
