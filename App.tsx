import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';

type Page = 'login' | 'signup' | 'chat';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setCurrentPage('chat');
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentPage('chat');
      } else {
        setCurrentPage('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-slate-900">
            <div className="text-xl text-slate-500 dark:text-slate-300">Loading...</div>
        </div>
      )
  }

  if (session) {
    return <ChatPage session={session} theme={theme} toggleTheme={toggleTheme} />;
  }

  switch (currentPage) {
    case 'signup':
      return <SignUpPage onNavigate={navigateTo} />;
    case 'login':
    default:
      return <LoginPage onNavigate={navigateTo} />;
  }
};

export default App;