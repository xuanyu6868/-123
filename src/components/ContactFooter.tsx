import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'motion/react';
import { Mail, MessageCircle, MapPin, Phone, User } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [isPulling, setIsPulling] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  // Add a natural slight rotation when moving X
  const rotateString = useTransform(dragX, [-200, 200], [-30, 30]);
  
  // Zigzag path based on phone position
  const zigzagPath = useTransform([dragX, dragY], ([xPos, yPos]: any[]) => {
    const points = 40; 
    const width = 10;
    let path = `M 50 0`; 
    
    const currentX = xPos || 0;
    const currentY = Math.max(0, yPos || 0);
    
    for (let i = 1; i <= points; i++) {
        const baseX = 50 + (currentX / points) * i;
        const x = baseX + (i % 2 === 0 ? width : -width);
        const pointY = (currentY / points) * i;
        path += ` L ${x} ${pointY}`;
    }
    return path;
  });

  const handleDragEnd = (_: any, info: any) => {
    setIsPulling(false);
    
    const pullAmount = Math.max(0, info.offset.y);
    
    // The amount of scrolling is proportional to the pull distance.
    const currentScrollY = window.scrollY;
    
    // Threshold distance: if pulled more than this, scroll all the way to top
    const THRESHOLD = 300;
    
    if (pullAmount >= THRESHOLD) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (pullAmount > 20) {
      // Not enough for full jump, jump proportionally
      const scrollJump = pullAmount * 6; // Adjust multiplier for feel
      const targetScrollY = Math.max(0, currentScrollY - scrollJump);
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
    
    animate(dragY, 0, { type: "spring", stiffness: 300, damping: 20 });
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <footer className="bg-[#111111] py-40 px-6 relative overflow-visible select-none">
      <div className="max-w-7xl mx-auto relative text-center">
        
        {/* Floating Icons */}
        <motion.div 
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 left-[20%] text-white opacity-80 pointer-events-none"
        >
            <Mail className="w-16 h-16 -rotate-12" />
        </motion.div>
        
        <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-10 left-[10%] text-[#22c55e] pointer-events-none"
        >
            <MessageCircle className="w-20 h-20 rotate-12" />
        </motion.div>

        <motion.div 
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-12 right-[30%] text-[#0099ff] pointer-events-none"
        >
            <User className="w-16 h-16" />
        </motion.div>

        <motion.div 
            animate={{ y: [0, 10, 0], rotate: [-10, 10, -10] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="absolute top-20 right-[15%] text-[#ea580c] pointer-events-none"
        >
            <MapPin className="w-20 h-20" />
            <div className="w-16 h-2 bg-black/40 blur-sm rounded-full mx-auto mt-2" />
        </motion.div>

        {/* Main Text */}
        <h2 className="text-[8rem] md:text-[14rem] font-impact text-white leading-tight tracking-tight uppercase relative z-10">
          联系我们
        </h2>

        {/* The Phone Mechanism */}
        <div className="absolute left-[54%] md:left-[51%] top-[80%] -translate-x-1/2 w-40 flex flex-col items-center">
            {/* Zigzag String */}
            <svg width="100" height="1000" className="absolute top-0 pointer-events-none overflow-visible">
                <motion.path 
                    d={zigzagPath}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                />
            </svg>

            {/* Handset */}
            <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 800, left: -200, right: 200 }}
                dragElastic={0.2}
                onDragStart={() => setIsPulling(true)}
                onDragEnd={handleDragEnd}
                style={{ x: dragX, y: dragY, rotate: rotateString }}
                className="relative z-20 cursor-grab active:cursor-grabbing group"
            >
                <div className="w-32 h-32 text-neon flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(0,255,0,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(0,255,0,0.6)] transition-all">
                    <Phone className="w-24 h-24 rotate-[135deg]" fill="currentColor" />
                </div>
            </motion.div>

            {/* Hint Text */}
            <motion.div 
                animate={{ 
                    opacity: isPulling ? 0 : [0.4, 0.8, 0.4],
                    y: isPulling ? 20 : 0 
                }}
                transition={{ opacity: { duration: 2, repeat: Infinity } }}
                className="mt-4 text-stone-500 text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap"
            >
                Pull to return home
            </motion.div>
        </div>
      </div>
      
      {/* Copyright stuff lower down */}
      <div className="mt-80 pt-20 border-t border-white/5 text-center">
            <p className="text-stone-600 text-[10px] font-black uppercase tracking-[0.4em]">
                © 2026 睿思星启 — ALL RIGHTS RESERVED
            </p>
      </div>
    </footer>
  );
};
