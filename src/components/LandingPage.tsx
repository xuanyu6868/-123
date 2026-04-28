import React from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Zap, Users, LayoutGrid, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (view: 'home' | 'studio' | 'community' | 'pricing' | 'profile') => void;
}

const AnimatedWord = ({ text, className }: { text: string; className: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-default"
          whileHover={{ 
            y: -25, 
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

const ParticleLayer = ({ isHovered }: { isHovered: boolean }) => {
  const rows = 12;
  const cols = 10;
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[4rem]">
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
          
          // Calculate distance to nearest edge
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle, desc }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      className="group relative h-[600px] flex flex-col justify-between p-14 rounded-[4rem] bg-stone-50 border border-stone-100 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <ParticleLayer isHovered={isHovered} />
      
      <div className="relative z-10">
        <motion.div 
          animate={{ 
            backgroundColor: isHovered ? "#1c1917" : "#ffffff",
            borderColor: isHovered ? "#292524" : "#f5f5f4"
          }}
          className="w-24 h-24 rounded-[2rem] shadow-sm border flex items-center justify-center mb-12 transition-all duration-500"
        >
          <div className={`transition-colors duration-500 ${isHovered ? 'text-neon' : 'text-stone-900'}`}>
            {icon}
          </div>
        </motion.div>
        
        <h3 className={`text-6xl font-impact mb-8 tracking-tighter uppercase italic leading-tight transition-colors duration-500 ${isHovered ? 'text-white' : 'text-stone-900'}`}>
          {title} <br />
          <span className={`transition-colors duration-500 ${isHovered ? 'text-neon' : 'text-stone-900'}`}>
            {subtitle}
          </span>
        </h3>
        
        <p className={`text-xl font-medium leading-tight transition-colors duration-500 ${isHovered ? 'text-stone-400' : 'text-stone-400'}`}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = React.useState("0");
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: false });

  React.useEffect(() => {
    if (isInView) {
      const numericPart = value.replace(/[^0-9.]/g, '');
      const suffix = value.replace(/[0-9.]/g, '');
      const targetValue = parseFloat(numericPart);
      let startTime: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const current = progress * targetValue;
        
        if (value.includes(',')) {
          setDisplayValue(current.toLocaleString(undefined, { maximumFractionDigits: 1 }) + suffix);
        } else {
          setDisplayValue(current.toFixed(value.includes('.') ? 1 : 0) + suffix);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayValue("0");
    }
  }, [isInView, value, duration]);

  return <div ref={nodeRef}>{displayValue}</div>;
};

export const CardStack = ({ mini = false, items }: { mini?: boolean; items?: {url: string; title: string; engine: string}[] }) => {
  const [isStackHovered, setIsStackHovered] = React.useState(false);

  const cards = items || [
    {
      url: "/cup_raw.png",
      title: "原始拍摄",
      engine: "基础模型"
    },
    {
      url: "/cup_rendered.png",
      title: "商业渲染",
      engine: "神经渲染引擎"
    }
  ];

  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center ${mini ? 'pt-0' : 'pt-20'}`}
      onMouseEnter={() => setIsStackHovered(true)}
      onMouseLeave={() => setIsStackHovered(false)}
    >
      {cards.map((card, i) => {
        const isLast = i === cards.length - 1;
        
        // Dynamic animation values
        const rotation = isStackHovered 
          ? (i - (cards.length - 1) / 2) * (mini ? 8 : 25) 
          : (mini ? 0 : (i - (cards.length - 1) / 2) * 2);

        const xOffset = isStackHovered 
          ? (i - (cards.length - 1) / 2) * (mini ? 30 : 160)
          : (mini ? 0 : (i - (cards.length - 1) / 2) * 4);

        return (
          <motion.div
            key={i}
            initial={false}
            animate={{ 
              rotate: rotation,
              x: xOffset,
              y: isStackHovered ? (mini ? -20 : -40) : 0,
              zIndex: i,
              scale: isStackHovered ? (mini ? 1.05 : 1.02) : 1,
              transition: { type: "spring", stiffness: 150, damping: 15 }
            }}
            whileHover={{ 
              y: mini ? -60 : -180,
              rotate: 0,
              scale: 1.1,
              zIndex: 100,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className={`absolute ${mini ? 'w-full h-full border-none shadow-xl rounded-2xl' : 'w-64 md:w-80 h-96 md:h-[28rem] border-2 md:border-4 border-white shadow-2xl rounded-[3rem]'} bg-stone-50 overflow-hidden origin-bottom group`}
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: isStackHovered ? 'transform' : 'auto'
            }}
          >
            <img 
              src={card.url} 
              className="w-full h-full object-cover"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                WebkitFontSmoothing: 'antialiased',
                transform: 'translateZ(0)'
              }}
              alt={card.title}
              referrerPolicy="no-referrer"
            />
            {/* Card Info Overlay */}
            <div className={`absolute inset-x-0 bottom-0 ${mini ? 'p-4' : 'p-8'} bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity`}>
              <div className={`${mini ? 'text-[8px]' : 'text-xs'} font-black uppercase tracking-widest opacity-50 mb-1`}>{card.engine}</div>
              <div className={`${mini ? 'text-sm' : 'text-xl'} font-bold italic font-impact uppercase`}>{card.title}</div>
            </div>
            {/* Side Label */}
            {!mini && (
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 text-[8px] font-black tracking-widest text-stone-300 opacity-20 group-hover:opacity-100 transition-opacity">
                素材_{i+1}_处理
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};


export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-neon selection:text-black relative">
      <ParticleBackground />
      {/* Hero Section */}
      <section className="pt-40 md:pt-60 pb-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-stone-50 border border-stone-100 rounded-full text-stone-900 text-xs font-black uppercase tracking-[0.2em] mb-12 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
            睿思星启 — 电商视觉革命
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-7xl md:text-[8rem] font-impact tracking-tighter text-stone-900 mb-12 leading-tight uppercase flex flex-col items-center select-none pl-4 md:pl-8"
          >
            <AnimatedWord text="一站生成！" className="block italic" />
            <AnimatedWord text="全平台电商视觉" className="block text-neon -rotate-2" />
            <div className="flex font-display text-stone-900 leading-tight">
              <AnimatedWord text="秒级响应出" className="" />
              <AnimatedWord text="爆款" className="text-red-500" />
            </div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-stone-400 text-2xl md:text-3xl mb-16 max-w-4xl mx-auto font-medium leading-tight tracking-tight"
          >
            小红书爆款图 · 高转化电商主图 · 详情页自动生成<br />
            无缝覆盖淘宝、抖音、拼多多、Amazon、Shopee、SHEIN、Temu 等国内外核心赛道。
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button onClick={onStart} className="animated-button shadow-3xl shadow-stone-200/50">
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
              <span className="text font-impact tracking-widest text-2xl uppercase">开始创作</span>
              <span className="circle"></span>
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid - Bento Style */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-12 h-12" />}
              title="爆款"
              subtitle="引擎"
              desc="潜入全网电商高转化视觉底层逻辑，一秒套用热销密码，打造点击率收割机。"
            />
            <FeatureCard 
              icon={<LayoutGrid className="w-12 h-12" />}
              title="全域"
              subtitle="矩阵"
              desc="智能解析多平台差异化视觉规范，原切出图无缝分发，一次生成铺遍全球渠道。"
            />
            <FeatureCard 
              icon={<Sparkles className="w-12 h-12" />}
              title="无界"
              subtitle="摄制"
              desc="解锁顶级 3D 数字外景与百变换模，彻底粉碎昂贵棚拍成本，实现创作上的降维打击。"
            />
        </div>
      </section>

      {/* New Enhanced Showcase Section - "The Real World" */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 bg-stone-100 rounded-full text-[10px] font-black tracking-widest uppercase mb-6"
            >
              重新定义真实
            </motion.div>
            <h2 className="text-7xl font-impact italic uppercase leading-tight tracking-tighter mb-6">
              极致物理 <br /><span className="text-stone-300">感官震撼</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        title: "永恒奢华",
        desc: "精密的拉丝金属纹理与微距镜头下的蓝宝石玻璃质感。"
      },
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        title: "声学大师",
        desc: "哑光亲肤材质在冷色调环境光下的细腻呈现。"
      },
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        title: "街头前沿",
        desc: "复杂拼接面料与街头日光阴影的物理仿真。"
      }
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        viewport={{ once: true }}
        className="group relative h-[500px] rounded-[3rem] overflow-hidden"
      >
        <img 
          src={item.url} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt={item.title}
          referrerPolicy="no-referrer"
        />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-white text-3xl font-impact uppercase italic mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-stone-300 text-sm font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-40 px-6 bg-stone-900 text-white rounded-[5rem] mx-6 my-20 shadow-3xl shadow-stone-200 relative overflow-hidden">
        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 text-neon opacity-40 pointer-events-none drop-shadow-[0_0_20px_rgba(0,255,0,0.5)]"
        >
          <Zap className="w-32 h-32" />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 text-white opacity-10 pointer-events-none"
        >
          <Sparkles className="w-40 h-40" />
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-7xl md:text-8xl font-impact mb-4 tracking-tighter leading-tight italic">
              <Counter value="10.5M" />
            </div>
            <div className="text-stone-500 text-sm uppercase tracking-[0.3em] font-black">商用视觉资产</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-7xl md:text-8xl font-impact mb-4 tracking-tighter leading-tight italic">
              <Counter value="99" />
            </div>
            <div className="text-stone-500 text-sm uppercase tracking-[0.3em] font-black">品牌调性匹配</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-7xl md:text-8xl font-impact mb-4 tracking-tighter leading-tight italic">
              <Counter value="15K" />
            </div>
            <div className="text-stone-500 text-sm uppercase tracking-[0.3em] font-black">深度合作卖家</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-7xl md:text-8xl font-impact mb-4 tracking-tighter leading-tight italic">
              <Counter value="24H" />
            </div>
            <div className="text-stone-500 text-sm uppercase tracking-[0.3em] font-black">全天候渲染引擎</div>
          </motion.div>
        </div>
      </section>

      {/* Showcase - Immersive */}
      <section className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-6xl font-black tracking-tighter uppercase mb-8 leading-tight">纯粹 <br /><span className="text-stone-300">美学</span></h2>
              <p className="text-stone-400 text-2xl font-medium mb-12 leading-snug">
                每一件作品都是技术的极致演绎，<br />
                也是艺术的当代重构。
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={onStart} 
                  className="custom-ripple-button h-16 px-10 text-lg font-impact uppercase italic tracking-wider"
                >
                  <span className="mr-3">立即预览效果</span>
                  <svg width="24" height="24" viewBox="0 0 100 100">
                    <polygon points="20,10 80,50 20,90"></polygon>
                    <polygon points="40,10 100,50 40,90"></polygon>
                    <polygon points="60,10 120,50 60,90"></polygon>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full relative flex justify-center">
              <div className="w-full max-w-md">
                <CardStack />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-stone-200/50 rounded-full blur-[80px] -z-10" />
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-stone-100 rounded-full blur-[100px] -z-10" />
            </div>
        </div>
      </section>

      {/* How it works - Minimal Steps */}
      <section className="py-40 px-6 border-t border-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-24">
            {[
              { step: "01", title: "上传底图", desc: "上传商品原型图或 3D 模型渲染底图。" },
              { step: "02", title: "匹配场景", desc: "输入场景关键词，AI 智能匹配商业意境。" },
              { step: "03", title: "极速出图", desc: "秒级生成超高清商业大片，直接用于商用。" }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-9xl font-black text-stone-100 mb-8 tracking-tighter group-hover:text-stone-900 group-hover:-translate-y-4 transition-all duration-700">
                  {item.step}
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight uppercase italic">{item.title}</h3>
                <p className="text-stone-400 text-xl font-medium leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-40 px-6 bg-stone-50 rounded-[5rem] mx-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-8xl md:text-[8rem] font-impact tracking-tighter leading-tight uppercase mb-8 italic">世界级 <br />艺术 <span className="text-neon not-italic">杰作</span></h2>
              <p className="text-stone-400 text-2xl md:text-3xl font-medium">来自全球顶尖创作者的灵感火花。</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="aspect-[3/4] relative group">
               <CardStack mini />
            </div>
            <div className="aspect-[3/4] relative group">
               <CardStack mini items={[
                 { url: "/headphones_raw.png", title: "原始拍摄", engine: "基础模型" },
                 { url: "/headphones_rendered.png", title: "商业渲染", engine: "神经渲染引擎" }
               ]} />
            </div>
            <div className="aspect-[3/4] relative group">
               <CardStack mini items={[
                 { url: "/oil_raw.png", title: "原始拍摄", engine: "基础模型" },
                 { url: "/oil_rendered.png", title: "商业渲染", engine: "神经渲染引擎" }
               ]} />
            </div>
            <div className="aspect-[3/4] relative group">
               <CardStack mini items={[
                 { url: "/shoes_raw.png", title: "原始拍摄", engine: "基础模型" },
                 { url: "/shoes_rendered.png", title: "商业渲染", engine: "神经渲染引擎" }
               ]} />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-32 px-6 text-center border-t border-stone-50">
        <div className="flex items-center justify-center gap-2 mb-8 scale-150">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-stone-900">睿思星启</span>
        </div>
        <p className="text-stone-300 text-xs font-black uppercase tracking-[0.5em]">© 2026 用心打造. 保留所有权利.</p>
      </footer>
    </div>
  );
};
