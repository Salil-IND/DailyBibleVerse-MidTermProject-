import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

function Navbar({ theme, toggleTheme, likeList }) {
  return (
    // Changed 'flex-col' to 'flex flex-row' so items align horizontally
    <nav className={`h-20 w-full px-8 flex flex-row items-center justify-between shadow-sm transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
    }`}>
      
      {/* Left: Logo */}
      <div className="w-32 flex items-center justify-start">
        <img 
          src={logo} 
          alt="logo" 
          style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
        />
      </div>

      
      <div className="flex justify-center items-center space-x-8 flex-1">
        <Link to="/" className="font-medium hover:text-blue-500 hover:underline decoration-blue-400 underline-offset-4 transition duration-200">Verse of the Day</Link>
        <Link to="/liked-verses" className="font-medium hover:text-blue-500 hover:underline underline-offset-4 decoration-blue-400 transition-colors duration-200">Liked Verses <span className='text-white text-xs p-1 rounded-2xl bg-red-500 '>{likeList.length}</span></Link>
      </div>

      {/* Right: Toggle Button */}
      <div className="w-32 flex justify-end items-center">
        
        <button 
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer ${
            theme === 'dark' ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {(theme === "dark")?
            <i className="fa-solid fa-sun" style={{color:"rgb(255, 255, 255)"}}></i>
            : <i className="fa-solid fa-moon" style={{color: "rgb(0,0,0)"}}></i>
          }
        </button>
      </div>
      
    </nav>
  );
}

export default Navbar;