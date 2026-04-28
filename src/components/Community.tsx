import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Zap, Heart, ArrowRight, Wand2, LayoutGrid } from 'lucide-react';

const ParticleLayer = ({ isHovered }: { isHovered: boolean }) => {
  const rows = 12;
  const cols = 10;
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[3.5rem]">
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

interface CommunityCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  buttonText: string;
  isPrimary?: boolean;
  onClick?: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ icon, title, desc, buttonText, isPrimary = false, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  if (isPrimary) {
    return (
      <div onClick={onClick} className="group p-10 rounded-[3.5rem] bg-stone-900 text-white shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur border border-white/10 group-hover:rotate-12 transition-transform">
          <LayoutGrid className="w-8 h-8 text-neon" />
        </div>
        <h3 className="text-3xl font-impact uppercase italic mb-4 tracking-tight">{title}</h3>
        <p className="text-stone-400 mb-8 text-lg leading-snug">{desc}</p>
        <button className="bg-neon text-stone-900 px-8 py-4 rounded-2xl font-black text-sm hover:bg-white transition-colors">
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-10 rounded-[3.5rem] bg-stone-50 border border-stone-100 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <ParticleLayer isHovered={isHovered} />
      
      <div className="relative z-10">
        <motion.div 
          animate={{ 
            backgroundColor: isHovered ? "#1c1917" : "#ffffff",
            borderColor: isHovered ? "#292524" : "#f5f5f4"
          }}
          className="w-16 h-16 rounded-2xl border flex items-center justify-center mb-8 transition-all duration-500"
        >
          <div className={`transition-colors duration-500 ${isHovered ? 'text-neon' : 'text-stone-900'}`}>
            {icon}
          </div>
        </motion.div>
        
        <h3 className={`text-3xl font-impact uppercase italic mb-4 tracking-tight transition-colors duration-500 ${isHovered ? 'text-white' : 'text-stone-900'}`}>
          {title}
        </h3>
        
        <p className={`mb-8 text-lg leading-snug transition-colors duration-500 ${isHovered ? 'text-stone-400' : 'text-stone-500'}`}>
          {desc}
        </p>
        
        <button className={`font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all ${isHovered ? 'text-neon' : 'text-stone-900'}`}>
          {buttonText} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const ActivityItem: React.FC<{ i: number }> = ({ i }) => {
  const [showPrompt, setShowPrompt] = React.useState(false);

  const images = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800'
  ];

  const types = ['数码产品', '美妆个护', '家居设计', '时尚鞋履', '食品摄影'];

  const descriptions = [
    '超写实微距呈现，利用物理光栅渲染器精确还原电子元器件的纳米级金属质感。',
    '极致影棚光线模拟，为高端美妆产品营造出无懈可击的高级感与纯净气息。',
    '北欧自然光场景重建，在虚构的室内空间中赋予家具最舒适的视觉温差与材质张力。',
    '动态运动捕捉与复杂地质解构，全方位展示鞋款在极端环境下的物理表现力。',
    '针对高光细节进行了算法级微调，完美还原材质的细腻色泽与令人心动的品牌质感。'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="p-10 rounded-[3.5rem] bg-stone-50 border border-stone-100 flex flex-col lg:flex-row gap-12 group/item hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700"
    >
      <div className="w-full lg:w-[450px] h-80 rounded-[2.5rem] overflow-hidden flex-shrink-0 relative">
        <img 
          src={images[i % images.length]} 
          className="w-full h-full object-cover transition-transform duration-[4s] group-hover/item:scale-110" 
          alt="Artwork"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6">
          <div className="px-4 py-2 bg-stone-900 text-neon text-[9px] font-black uppercase tracking-widest rounded-full">
            商业展示案例 _{100 + i}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-neon">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-stone-900 font-impact italic text-xl uppercase tracking-tight">{types[i % types.length]}</div>
              <div className="text-stone-300 text-[10px] font-black uppercase tracking-widest">系统生成 • {i + 1}天前</div>
            </div>
          </div>
          
          <h3 className="text-3xl font-impact uppercase italic mb-4 leading-tight text-stone-900">
            物理引擎优化下的{types[i % types.length]}实践
          </h3>
          
          <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-xl">
            {descriptions[i % descriptions.length]} 本作品完美平衡了 <span className="text-stone-900 font-bold italic">PHANTOM_RELIANCE</span> 物理引擎中的折射与漫反射参数。
          </p>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowPrompt(!showPrompt)}
              className={`px-8 py-4 rounded-3xl text-sm font-black uppercase tracking-widest transition-all inline-flex items-center gap-3 whitespace-nowrap ${showPrompt ? 'bg-stone-900 text-white shadow-xl' : 'bg-white border-2 border-stone-100 text-stone-900 hover:border-black shadow-sm'}`}
            >
              {showPrompt ? '关闭参数' : '解析提示词'}
              <ArrowRight className={`w-4 h-4 transition-transform ${showPrompt ? 'rotate-90' : ''}`} />
            </button>
            <div className="flex -space-x-4">
              {[
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
                'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100'
              ].map((p, idx) => (
                <div key={idx} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-stone-200">
                  <img src={p} className="w-full h-full object-cover" alt="Editor" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-stone-100 flex items-center justify-center text-[10px] font-black text-stone-400">
                +4K
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showPrompt && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-stone-900 p-8 rounded-[2rem] text-sm text-stone-400 font-mono relative">
                <div className="text-[10px] font-black text-neon uppercase tracking-[0.3em] mb-4">提示词解析</div>
                "High-end product photography, professional studio lighting, soft shadows, sharp focus on texture, commercial grade, 8k render, photorealistic --v 6.0"
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-[8px] font-black uppercase text-white/30 mb-1">渲染引擎</div>
                    <div className="text-neon">OCTANE 2026</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase text-white/30 mb-1">随机种子</div>
                    <div className="text-white">924855120</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase text-white/30 mb-1">引导系数</div>
                    <div className="text-white">7.5</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface CommunityProps {
  onNavigate: (view: 'home' | 'studio' | 'community' | 'pricing' | 'profile' | 'auth') => void;
}

export const Community: React.FC<CommunityProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = React.useState('全部动态');

  return (
    <div className="pt-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-8xl font-impact mb-8 tracking-tighter leading-tight italic uppercase whitespace-pre-line"
            >
              商业{"\n"}<span className="text-neon not-italic">交流社区</span>
            </motion.h1>
            <div className="w-20 h-2 bg-stone-900 mb-10 rounded-full" />
            <p className="text-stone-500 text-xl font-medium leading-relaxed">
              这里是全球顶尖电商视觉方案的策源地。加入致力于重塑商业影像的先行者集群，在这里商品即艺术，视觉即生产力。
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="p-8 bg-stone-900 text-white rounded-[2.5rem] flex items-center gap-6 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="text-4xl font-impact italic mb-1 uppercase">52,401</div>
                <div className="text-neon text-[10px] font-black uppercase tracking-widest">网络活跃节点数</div>
              </div>
              <Users className="w-16 h-16 text-white/5 absolute -right-4 -bottom-4 group-hover:scale-110 group-hover:text-neon/10 transition-all duration-700" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-32">
          <CommunityCard 
            icon={<Wand2 className="w-8 h-8" />}
            title="灵感工坊"
            desc="前往工作台，输入您的创意提示词，立即将灵感转化为令人惊叹的商业级摄影大片。"
            buttonText="进入工作台"
            onClick={() => onNavigate('studio')}
          />

          <CommunityCard 
            icon={<LayoutGrid className="w-8 h-8" />}
            title="资产管理"
            desc="在个人中心查看您的生成记录，管理品牌视觉模型，随时追踪您的专属算力额度。"
            buttonText="前往我的主页"
            onClick={() => onNavigate('profile')}
            isPrimary
          />

          <CommunityCard 
            icon={<Zap className="w-8 h-8" />}
            title="算力充值"
            desc="算力不足？浏览我们的订阅方案，获取更多高性能渲染算力与定制化模型支持。"
            buttonText="查看订阅方案"
            onClick={() => onNavigate('pricing')}
          />
        </div>

        {/* Feed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-32">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
              <h2 className="text-5xl font-impact uppercase italic italic leading-tight">最近活跃动态</h2>
              <div className="flex items-center gap-4 p-2 bg-stone-50 rounded-2xl">
                {['全部动态', '热门精华', '官方挑战'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400 hover:text-stone-900'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <ActivityItem key={i} i={i} />
              ))}
              <div className="pt-12 text-center">
                <button className="px-12 py-5 bg-stone-50 border-2 border-stone-100 rounded-[2rem] text-sm font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all">
                  加载更多动态
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div>
              <h3 className="text-xl font-impact uppercase italic mb-8 border-b-4 border-neon pb-2 inline-block">推荐工作流</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: '极简白底', icon: '✨' },
                  { name: '光影重塑', icon: '🌞' },
                  { name: '赛博朋克', icon: '🌃' },
                  { name: '暗黑质感', icon: '🌑' },
                  { name: '商拍大片', icon: '📸' }
                ].map((tag, idx) => (
                   <motion.button 
                    key={tag.name} 
                    onClick={() => onNavigate('studio')}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: idx * 0.2
                    }}
                    className="px-5 py-3 bg-stone-50 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all border border-stone-100 shadow-sm flex items-center gap-2 group"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform">{tag.icon}</span>
                    {tag.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div onClick={() => onNavigate('pricing')} className="p-8 bg-stone-50 rounded-[3rem] border border-stone-100 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:border-stone-900 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon/10 rounded-bl-[4rem] flex items-start justify-end p-6 transition-all group-hover:bg-neon/20 group-hover:scale-110 origin-top-right">
                 <Zap className="w-8 h-8 text-neon" />
              </div>
              <div className="relative z-10">
                <div className="text-stone-900 text-[10px] font-black uppercase tracking-widest mb-4 inline-block bg-neon px-3 py-1 rounded-full shadow-sm">额度预警</div>
                <h3 className="text-3xl font-impact uppercase italic mb-6 leading-tight text-stone-900">免费渲染额度<br/>即将用尽</h3>
                <div className="w-full bg-stone-200 h-2 rounded-full mb-2 overflow-hidden">
                  <div className="bg-stone-900 h-full w-[85%] rounded-full relative overflow-hidden">
                     <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-stone-400 mb-8 uppercase tracking-widest">
                  <span>已用 85%</span>
                  <span>剩余极速算力</span>
                </div>
                
                <button className="w-full py-4 bg-stone-900 border border-stone-900 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase text-neon hover:bg-neon hover:text-black transition-all shadow-xl flex items-center justify-center gap-2 group/btn">
                  解锁 PRO 级算力
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div onClick={() => onNavigate('profile')} className="relative aspect-square rounded-[3.5rem] bg-stone-900 p-10 flex flex-col justify-end overflow-hidden group cursor-pointer border border-stone-800">
              <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-700 via-stone-900 to-black opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" alt="Assets" referrerPolicy="no-referrer" />
              
              <div className="relative z-10">
                <div className="text-neon text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm drop-shadow-md">专属空间</div>
                <h4 className="text-white text-3xl font-impact uppercase italic leading-tight mb-4 drop-shadow-lg">管理您的<br/>私域资产库</h4>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:bg-neon transition-colors shadow-xl">
                  <ArrowRight className="w-6 h-6 text-stone-900 group-hover:-rotate-45 transition-transform" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
