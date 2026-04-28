import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'studio' | 'community' | 'pricing' | 'profile' | 'auth') => void;
  currentView: string;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, isAuthenticated }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
       <nav className="bg-white/80 backdrop-blur-2xl border border-stone-100 rounded-[2rem] shadow-2xl shadow-stone-200/50 px-6 sm:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-black hidden sm:block">睿思星启</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-10">
          <button 
            onClick={() => onNavigate('community')}
            className={`text-xs sm:text-sm font-black uppercase tracking-widest transition-all ${currentView === 'community' ? 'text-neon translate-y-[-1px]' : 'text-black hover:text-neon'}`}
          >
            社区
          </button>
          <button 
            onClick={() => onNavigate('pricing')}
            className={`text-xs sm:text-sm font-black uppercase tracking-widest transition-all ${currentView === 'pricing' ? 'text-neon translate-y-[-1px]' : 'text-black hover:text-neon'}`}
          >
            方案
          </button>
          <button 
            onClick={() => isAuthenticated ? onNavigate('profile') : onNavigate('auth')}
            className={`text-xs sm:text-sm font-black uppercase tracking-widest transition-all ${currentView === 'profile' ? 'text-neon translate-y-[-1px]' : 'text-black hover:text-neon'}`}
          >
            我的
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => isAuthenticated ? onNavigate('studio') : onNavigate('auth')}
            className={`px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-impact tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
              currentView === 'studio' 
              ? 'bg-stone-50 text-stone-300 border border-stone-100' 
              : 'bg-stone-900 text-neon hover:bg-black shadow-stone-200'
            }`}
          >
            {!isAuthenticated ? '登录与注册' : (currentView === 'studio' ? '工作台' : '开始创作')}
          </button>
        </div>
      </nav>
    </div>
  );
};


