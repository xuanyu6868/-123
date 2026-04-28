import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wand2, Loader2 } from 'lucide-react';

interface HeroProps {
  onGenerate: (prompt: string, aspectRatio: string, style: string) => void;
  isGenerating: boolean;
}

const ASPECT_RATIOS = [
  { label: '1:1', value: '1:1', icon: '□' },
  { label: '4:3', value: '4:3', icon: '▭' },
  { label: '16:9', value: '16:9', icon: '▬' },
  { label: '9:16', value: '9:16', icon: '▯' },
];

const STYLES = [
  { id: 'none', name: '默认', prompt: '', icon: '✨' },
  { id: 'cinematic', name: '电影感', prompt: 'cinematic lighting, ultra-detailed, 8k, masterpiece', icon: '🎬' },
  { id: 'anime', name: '二次元', prompt: 'anime style, vibrant colors, detailed cel shading', icon: '🎨' },
  { id: 'oil', name: '油画', prompt: 'oil painting, thick brushstrokes, classical texture', icon: '🖌️' },
  { id: 'cyber', name: '赛博朋克', prompt: 'cyberpunk aesthetic, neon glows, futuristic details', icon: '🌃' },
  { id: '3d', name: '3D 渲染', prompt: '3d render, unreal engine 5, octane render, volumetric lighting', icon: '🧊' },
];

const AnimatedWord = ({ text, className }: { text: string; className: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (char === '<' || char === 'b' || char === 'r' || char === '/' || char === '>') ? (
        <span key={i}>{char}</span>
      ) : (
        <motion.span
          key={i}
          className="inline-block cursor-default"
          whileHover={{ 
            y: -20, 
            scale: 1.15,
            rotate: Math.random() > 0.5 ? 5 : -5,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 bg-stone-50 border border-stone-100 rounded-full blur-2xl"
          animate={{
            x: [Math.random() * 800, Math.random() * 800],
            y: [Math.random() * 600, Math.random() * 600],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [selectedStyle, setSelectedStyle] = useState('none');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      const styleObj = STYLES.find(s => s.id === selectedStyle);
      const stylePrompt = styleObj?.prompt || '';
      const fullPrompt = stylePrompt ? `${prompt}, ${stylePrompt}` : prompt;
      onGenerate(fullPrompt, aspectRatio, styleObj?.name || '默认');
    }
  };

  return (
    <section className="pt-48 pb-20 px-6 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-neon/5 blur-[120px] rounded-full -z-10 opacity-60" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-impact tracking-tighter mb-8 text-stone-900 leading-tight uppercase italic select-none"
          >
            <AnimatedWord text="开始生成" className="block" />
            <AnimatedWord text="商业大片" className="text-neon block -rotate-1 not-italic" />
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-20 h-1.5 bg-neon mx-auto rounded-full mb-10 shadow-[0_0_15px_#00FF00]"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-2xl font-medium tracking-tight"
          >
            驱动您的灵感引擎，将文字编译为视觉现实。
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-stone-100 p-4 rounded-[4rem] shadow-3xl shadow-stone-200/50"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述您的杰作... (例如: 一个在云端漫步的机械鲸鱼)"
                className="w-full bg-stone-50/50 border-none rounded-[3rem] py-10 pl-12 pr-40 text-stone-900 placeholder:text-stone-300 focus:ring-4 focus:ring-neon/10 transition-all text-2xl font-bold leading-snug resize-none min-h-[220px]"
              />
              <div className="absolute right-6 bottom-6 flex items-center gap-4">
                {prompt && (
                  <button 
                    type="button"
                    onClick={() => setPrompt('')}
                    className="p-4 text-stone-300 hover:text-stone-900 transition-colors uppercase text-xs font-black tracking-widest"
                  >
                    清空
                  </button>
                )}
                <button
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-stone-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-neon hover:text-black hover:shadow-[0_0_30px_rgba(0,255,0,0.4)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-2xl shadow-stone-200 active:scale-95 duration-300"
                >
                  {isGenerating ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Wand2 className="w-6 h-6" />
                  )}
                  {isGenerating ? '生成中...' : '生成图像'}
                </button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row xl:items-end justify-between px-10 pb-8 gap-12">
              <div className="flex flex-wrap items-start gap-16">
                <div>
                  <label className="text-[11px] uppercase font-black text-stone-300 block mb-5 tracking-[0.2em] px-1">生成比例</label>
                  <div className="flex bg-stone-50 p-2 rounded-3xl border border-stone-100">
                    {ASPECT_RATIOS.map((ratio) => (
                      <button
                        key={ratio.value}
                        type="button"
                        onClick={() => setAspectRatio(ratio.value)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                          aspectRatio === ratio.value 
                          ? 'bg-stone-900 text-neon shadow-xl' 
                          : 'text-stone-400 hover:text-stone-900'
                        }`}
                      >
                        <span className="text-lg opacity-40">{ratio.icon}</span>
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-black text-stone-300 block mb-5 tracking-[0.2em] px-1">引擎风格</label>
                  <div className="flex flex-wrap gap-3">
                    {STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setSelectedStyle(style.id)}
                        className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all flex items-center gap-3 ${
                          selectedStyle === style.id 
                          ? 'bg-stone-900 border-stone-900 text-neon shadow-xl scale-105' 
                          : 'bg-white border-stone-100 text-stone-400 hover:border-stone-400 hover:bg-stone-50 hover:-rotate-2'
                        }`}
                      >
                        <span className="text-base">{style.icon}</span>
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 py-4 bg-stone-50 rounded-[2rem] border border-stone-100 italic">
                <div className="w-2.5 h-2.5 bg-neon rounded-full animate-pulse shadow-[0_0_12px_#00FF00]"></div>
                <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest">安全的云端渲染</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
