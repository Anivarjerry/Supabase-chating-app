import React from 'react';

interface AvatarProps {
  username: string;
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorFromUsername = (username: string): string => {
  const colors = [
    'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500',
    'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'
  ];
  const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
};

const Avatar: React.FC<AvatarProps> = ({ username, isOnline = false, size = 'md' }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : '?';
  const bgColor = colorFromUsername(username || '');

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  };

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
      <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-white ${bgColor}`}>
        {firstLetter}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-slate-800" />
      )}
    </div>
  );
};

export default Avatar;