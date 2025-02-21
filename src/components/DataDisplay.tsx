import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface DataDisplayProps {
  userData: {
    username: string;
    userId: string;
    email: string;
    rollNumber: string;
    dateOfBirth: string;
  };
  isDark: boolean;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ userData, isDark }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<string[]>([]);

  const options = ['Alphabets', 'Numbers', 'Highest alphabet'];

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const processInput = () => {
    const results: string[] = [];
    
    if (selectedOptions.includes('Alphabets')) {
      results.push(`Alphabets in input: ${inputText.match(/[a-zA-Z]/g)?.join(', ') || 'None'}`);
    }
    
    if (selectedOptions.includes('Numbers')) {
      results.push(`Numbers in input: ${inputText.match(/[0-9]/g)?.join(', ') || 'None'}`);
    }
    
    if (selectedOptions.includes('Highest alphabet')) {
      const letters = inputText.match(/[a-zA-Z]/g) || [];
      if (letters.length > 0) {
        results.push(`Highest alphabet: ${letters.sort().pop()?.toUpperCase()}`);
      }
    }

    setResponse(results);
  };

  return (
    <div className={`${
      isDark 
        ? 'bg-black/50 border border-yellow-500/20' 
        : 'bg-white/10'
    } backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl transition-colors duration-300`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${
          isDark ? 'text-yellow-400' : 'text-white'
        } text-center mb-4`}>{userData.rollNumber}</h1>
        <div className={`space-y-2 ${isDark ? 'text-yellow-400/80' : 'text-white/80'}`}>
          <p>Welcome, {userData.username}!</p>
          <p>User ID: {userData.userId}</p>
          <p>Email: {userData.email}</p>
          <p>Date of Birth: {userData.dateOfBirth}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => handleOptionToggle(option)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedOptions.includes(option)
                  ? isDark
                    ? 'bg-yellow-500 text-black'
                    : 'bg-purple-500 text-white'
                  : isDark
                    ? 'bg-gray-900/50 text-yellow-400/80 hover:bg-gray-800/50'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text..."
            className={`flex-1 px-4 py-2 ${
              isDark 
                ? 'bg-gray-900/50 border-yellow-500/20 focus:border-yellow-500/40 text-yellow-400' 
                : 'bg-white/5 border-white/10 focus:border-white/30 text-white'
            } border rounded-lg placeholder-gray-400 focus:outline-none transition-colors duration-300`}
          />
          <button
            onClick={processInput}
            className={`${
              isDark 
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500'
            } p-2 rounded-lg hover:opacity-90 transition-all duration-300`}
          >
            <Send className="text-white h-5 w-5" />
          </button>
        </div>

        {response.length > 0 && (
          <div className={`mt-4 p-4 ${
            isDark ? 'bg-gray-900/50' : 'bg-white/5'
          } rounded-lg`}>
            {response.map((result, index) => (
              <p key={index} className={
                isDark ? 'text-yellow-400/80' : 'text-white/80'
              }>{result}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDisplay;