import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Rocket } from 'lucide-react';

const ParticleLayer = ({ isHovered }: { isHovered: boolean }) => {
  const rows = 8;
  const cols = 8;
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
      <div 
        className="grid w-full h-full"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)` 
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          
          const distX = Math.min(c, cols - 1 - c);
          const distY = Math.min(r, rows - 1 - r);
          const minDistToEdge = Math.min(distX, distY);
          
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={isHovered ? {
                scale: 1.1,
                opacity: 1,
              } : {
                scale: 0,
                opacity: 0,
              }}
              transition={{ 
                duration: 0.2, 
                delay: isHovered ? minDistToEdge * 0.05 + Math.random() * 0.15 : 0,
                ease: "easeOut"
              }}
              className="bg-stone-900 w-full h-full"
            />
          );
        })}
      </div>
    </div>
  );
};

const AnimatedWord = ({ text, className }: { text: string; className: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-default"
          whileHover={{ 
            y: -15, 
            scale: 1.2,
            rotate: Math.random() > 0.5 ? 10 : -10,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

interface PricingCardProps {
  icon: React.ReactNode;
  tag: string;
  price: string;
  points: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ icon, tag, price, points, features, buttonText, isPopular }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-10 rounded-[3rem] ${isPopular ? 'bg-black text-white' : 'bg-stone-50 border border-stone-100'} flex flex-col justify-between transition-all duration-500 overflow-hidden cursor-pointer`}
    >
      {!isPopular && <ParticleLayer isHovered={isHovered} />}
      
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-black z-20">
          最受欢迎
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <motion.span 
            animate={{ 
              backgroundColor: isHovered && !isPopular ? "#1c1917" : (isPopular ? "rgba(255,255,255,0.1)" : "#ffffff"),
              borderColor: isHovered && !isPopular ? "#292524" : (isPopular ? "rgba(255,255,255,0.2)" : "#f5f5f4")
            }}
            className="p-3 rounded-2xl border flex items-center justify-center shadow-sm"
          >
            <div className={`transition-colors duration-500 ${isHovered || isPopular ? 'text-neon' : 'text-stone-900'}`}>
              {icon}
            </div>
          </motion.span>
          <span className={`font-impact uppercase tracking-wider text-lg ${isHovered ? 'text-white/50' : (isPopular ? 'text-white/50' : 'text-stone-400')}`}>
            {tag}
          </span>
        </div>

        <div className="mb-10">
          <span className={`text-7xl font-impact tracking-tighter transition-colors duration-500 ${isHovered || isPopular ? 'text-white' : 'text-stone-900'}`}>
            {price}
          </span>
          <span className={`ml-2 font-medium ${isHovered ? 'text-stone-500' : (isPopular ? 'text-white/30' : 'text-stone-400')}`}>
            / {points}
          </span>
        </div>

        <ul className="space-y-4 mb-12">
          {features.map((feature, i) => (
            <li key={i} className={`flex items-center gap-3 text-sm transition-colors duration-500 ${isHovered ? 'text-stone-300' : (isPopular ? 'text-white/80' : 'text-stone-600')}`}>
              <Check className={`w-4 h-4 ${isHovered || isPopular ? 'text-neon' : 'text-green-500'}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button className={`relative z-10 w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-300 ${isPopular ? 'bg-neon text-black hover:bg-white' : (isHovered ? 'bg-neon text-black' : 'bg-white text-stone-900 border-2 border-stone-100 hover:border-stone-900')}`}>
        {buttonText}
      </button>
    </motion.div>
  );
};

export const Pricing: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-20 select-none">
          <motion.h1 
            className="text-6xl md:text-8xl font-impact mb-6 tracking-tighter text-stone-900 leading-tight uppercase"
          >
            <AnimatedWord text="选择你的" className="block italic" />
            <AnimatedWord text="积分套餐" className="block text-neon -rotate-1" />
          </motion.h1>
          <p className="text-stone-500 text-xl font-medium">
            为不同规模的卖家量身定制，让 AI 视觉资产助力您的生意增长。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <PricingCard 
            icon={<Zap className="w-6 h-6" />}
            tag="基础包"
            price="¥9.9"
            points="100 积分"
            features={[
              "100 次渲染额度",
              "标准场景库访问",
              "作品社区展示",
              "标准分辨率导出"
            ]}
            buttonText="立即购买"
          />

          <PricingCard 
            icon={<Rocket className="w-6 h-6" />}
            tag="进阶包"
            price="¥29.9"
            points="500 积分"
            features={[
              "500 次渲染额度",
              "优先渲染队列",
              "4K 超清商用大片",
              "全渠道商业许可"
            ]}
            buttonText="立即升级"
            isPopular
          />

          <PricingCard 
            icon={<Sparkles className="w-6 h-6" />}
            tag="专业包"
            price="¥99.9"
            points="2000 积分"
            features={[
              "2000 次渲染额度",
              "多成员协作工作流",
              "专属品牌调性微调",
              "API 自动化集成"
            ]}
            buttonText="立即购买"
          />
        </div>
      </div>
    </div>
  );
};
