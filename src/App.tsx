import React, { useState, useEffect } from 'react';
import { ChevronDown, Send, User, Mail, Hash, Calendar, Sun, Moon } from 'lucide-react';
import LoginForm from './components/LoginForm';
import DataDisplay from './components/DataDisplay';
import CustomCursor from './components/CustomCursor';
import { supabase } from './lib/supabase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });
  const [userData, setUserData] = useState({
    username: '',
    userId: '',
    email: '',
    rollNumber: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x: `${x}%`, y: `${y}%` });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (formData: typeof userData) => {
    try {
      // Create a secure password by combining userId with additional characters
      const securePassword = `${formData.userId}#Secure123!`;

      // Sign up the user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: securePassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Insert user data into the students table
        const { error: dbError } = await supabase
          .from('students')
          .insert([
            {
              id: authData.user.id,
              username: formData.username,
              user_id: formData.userId,
              email: formData.email,
              roll_number: formData.rollNumber,
              date_of_birth: formData.dateOfBirth,
            },
          ]);

        if (dbError) throw dbError;

        setUserData(formData);
        setIsLoggedIn(true);
        document.title = formData.rollNumber || 'Student Portal';
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <>
      <CustomCursor />
      <div 
        className="gradient-background"
        style={{
          '--x': mousePosition.x,
          '--y': mousePosition.y,
        } as React.CSSProperties}
      />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400'
      } flex items-center justify-center p-4`}>
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>
        {!isLoggedIn ? (
          <LoginForm onSubmit={handleLogin} isDark={isDark} />
        ) : (
          <DataDisplay userData={userData} isDark={isDark} />
        )}
      </div>
    </>
  );
}

export default App;