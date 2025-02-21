import React, { useState } from 'react';
import { User, Mail, Hash, Calendar } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: {
    username: string;
    userId: string;
    email: string;
    rollNumber: string;
    dateOfBirth: string;
  }) => void;
  isDark: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isDark }) => {
  const [formData, setFormData] = useState({
    username: '',
    userId: '',
    email: '',
    rollNumber: '',
    dateOfBirth: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`${
      isDark 
        ? 'bg-black/50 border border-yellow-500/20' 
        : 'bg-white/10'
    } backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl transition-colors duration-300`}>
      <h2 className={`text-3xl font-bold ${
        isDark ? 'text-yellow-400' : 'text-white'
      } mb-6 text-center`}>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-yellow-400/60' : 'text-white/60'
          } h-5 w-5`} />
          <input
            type="text"
            placeholder="Username"
            className={`w-full pl-10 pr-4 py-2 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-500/20 focus:border-yellow-500/40' 
                : 'bg-white/5 border-white/10 focus:border-white/30'
            } border rounded-lg ${
              isDark ? 'text-yellow-400' : 'text-white'
            } placeholder-gray-400 focus:outline-none transition-colors duration-300`}
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Hash className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-yellow-400/60' : 'text-white/60'
          } h-5 w-5`} />
          <input
            type="text"
            placeholder="User ID"
            className={`w-full pl-10 pr-4 py-2 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-500/20 focus:border-yellow-500/40' 
                : 'bg-white/5 border-white/10 focus:border-white/30'
            } border rounded-lg ${
              isDark ? 'text-yellow-400' : 'text-white'
            } placeholder-gray-400 focus:outline-none transition-colors duration-300`}
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-yellow-400/60' : 'text-white/60'
          } h-5 w-5`} />
          <input
            type="email"
            placeholder="College Email ID"
            className={`w-full pl-10 pr-4 py-2 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-500/20 focus:border-yellow-500/40' 
                : 'bg-white/5 border-white/10 focus:border-white/30'
            } border rounded-lg ${
              isDark ? 'text-yellow-400' : 'text-white'
            } placeholder-gray-400 focus:outline-none transition-colors duration-300`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Hash className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-yellow-400/60' : 'text-white/60'
          } h-5 w-5`} />
          <input
            type="text"
            placeholder="College Roll Number"
            className={`w-full pl-10 pr-4 py-2 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-500/20 focus:border-yellow-500/40' 
                : 'bg-white/5 border-white/10 focus:border-white/30'
            } border rounded-lg ${
              isDark ? 'text-yellow-400' : 'text-white'
            } placeholder-gray-400 focus:outline-none transition-colors duration-300`}
            value={formData.rollNumber}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isDark ? 'text-yellow-400/60' : 'text-white/60'
          } h-5 w-5`} />
          <input
            type="date"
            className={`w-full pl-10 pr-4 py-2 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-500/20 focus:border-yellow-500/40' 
                : 'bg-white/5 border-white/10 focus:border-white/30'
            } border rounded-lg ${
              isDark ? 'text-yellow-400' : 'text-white'
            } placeholder-gray-400 focus:outline-none transition-colors duration-300`}
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full ${
            isDark 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500'
          } text-white py-2 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold`}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginForm;