import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Grid, 
  Heart, 
  History, 
  CreditCard, 
  LogOut, 
  Zap, 
  Edit3,
  Share2,
  Bookmark,
  PlusCircle
} from 'lucide-react';

const CREATIONS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', title: 'LUXE WATCH', engine: 'COMMERCIAL_V4', ratio: '16:9', date: '2026.04.12', style: '数码产品' },
  { id: '2', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', title: 'SNEAKER CORE', engine: 'BRAND_SYNC_X', ratio: '1:1', date: '2026.04.10', style: '时尚穿搭' },
  { id: '3', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800', title: 'BEAUTY CARE', engine: 'STUDIO_RENDER', ratio: '3:4', date: '2026.04.08', style: '美妆个护' },
  { id: '4', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', title: 'AUDIO MASTER', engine: 'COMMERCIAL_V4', ratio: '4:5', date: '2026.04.05', style: '数码产品' },
  { id: '5', url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', title: 'MINIMAL CHAIR', engine: 'STUDIO_RENDER', ratio: '16:9', date: '2026.04.02', style: '家居设计' },
  { id: '6', url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', title: 'COFFEE ART', engine: 'BRAND_SYNC_X', ratio: '2:3', date: '2026.03.28', style: '食品摄影' },
];

const FAVORITES = [
  { id: 'f1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', title: 'BRAND HERO' },
  { id: 'f2', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800', title: 'PRODUCT FLOW' },
];

const FOOTPRINTS = [
  { id: 'fp1', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', title: 'SCENE TEST _01' },
];

interface ProfileProps {
  onNavigate: (view: 'home' | 'studio' | 'discover' | 'community' | 'pricing' | 'profile') => void;
  onLogout?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = React.useState('项目库');
  const [filter, setFilter] = React.useState('所有样式');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [username, setUsername] = React.useState('MERCHANT _PRO_01');
  const [bio, setBio] = React.useState('品牌视觉架构师 & 电商影像专家');
  const [selectedCreation, setSelectedCreation] = React.useState<any>(null);
  const [email, setEmail] = React.useState('cyber_art@example.com');
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [tempEmail, setTempEmail] = React.useState(email);
  const [showPasswordReset, setShowPasswordReset] = React.useState(false);

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsEditing(false);
    }, 1200);
  };

  const handleSaveEmail = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setEmail(tempEmail);
      setIsSyncing(false);
      setIsEditingEmail(false);
    }, 800);
  };

  const handlePasswordReset = () => {
    setShowPasswordReset(true);
    setTimeout(() => setShowPasswordReset(false), 3000);
  };

  const filteredCreations = filter === '所有样式' 
    ? CREATIONS 
    : CREATIONS.filter(c => c.style === filter);

  return (
    <div className="pt-32 min-h-screen bg-white relative">
      {/* Detail Modal Overlay */}
      {selectedCreation && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-24"
        >
          <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-3xl" onClick={() => setSelectedCreation(null)} />
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white w-full max-w-6xl rounded-[4rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-full max-h-[85vh]"
          >
            <div className="flex-1 bg-stone-100 relative group overflow-hidden">
              <img src={selectedCreation.url} className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110" alt="Preview" referrerPolicy="no-referrer" />
              <div className="absolute top-8 left-8">
                <div className="px-4 py-2 bg-black/40 backdrop-blur rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                  {selectedCreation.engine}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[400px] p-12 overflow-y-auto flex flex-col justify-between border-l border-stone-100">
              <div>
                <div className="text-neon text-[10px] font-black uppercase tracking-[0.4em] mb-4">元数据解析</div>
                <h2 className="text-4xl font-impact uppercase italic italic mb-8">{selectedCreation.title}</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-stone-300 text-[10px] font-black uppercase tracking-widest block mb-2">提示词解析</label>
                    <div className="bg-stone-50 p-4 rounded-2xl text-stone-600 text-sm font-mono border border-stone-100">
                      Ultra-detailed {selectedCreation.style.toLowerCase()} digital art, complex geometry, 8k resolution, cinematic lighting --v 6.0
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                      <div className="text-stone-300 text-[8px] font-black uppercase tracking-widest mb-1">随机种子</div>
                      <div className="text-sm font-bold">192458120</div>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                      <div className="text-stone-300 text-[8px] font-black uppercase tracking-widest mb-1">采样器</div>
                      <div className="text-sm font-bold">DPM++ 2M</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-neon hover:text-black transition-all shadow-xl">
                  导出高清源文件
                </button>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-stone-50 border border-stone-200 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-stone-100 transition-all">
                    公开作品
                  </button>
                  <button onClick={() => setSelectedCreation(null)} className="px-6 py-4 border border-stone-200 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">
                    <LogOut className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group cursor-pointer"
          >
            <div className="w-56 h-56 rounded-[4rem] overflow-hidden border-8 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] relative">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=500" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Avatar"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlusCircle className="text-white w-10 h-10" />
              </div>
            </div>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isSyncing}
              className={`absolute -bottom-2 -right-2 p-5 ${isEditing ? 'bg-black text-white' : 'bg-neon text-black'} rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 group/edit`}
            >
              {isSyncing ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Edit3 className="w-6 h-6" />
              )}
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover/edit:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {isEditing ? '保存修改' : '编辑个人资料'}
              </span>
            </button>
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex-1 max-w-2xl">
                {isEditing ? (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-5xl font-impact tracking-tight uppercase italic bg-stone-50 border-b-4 border-neon outline-none px-4 py-2 w-full focus:bg-stone-100 transition-colors"
                        autoFocus
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-neon opacity-50">NAME</div>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="text-stone-400 font-medium text-xl bg-stone-50 border-b-2 border-stone-200 outline-none px-4 py-2 w-full focus:bg-stone-100 transition-colors"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-stone-300">BIO</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="text-7xl font-impact tracking-tight uppercase italic mb-3 leading-tight text-stone-900">{username}</h1>
                    <p className="text-stone-400 font-medium text-xl flex items-center gap-3">
                      {bio}
                      <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                    </p>
                  </motion.div>
                )}
              </div>
              <div className="flex gap-4">
                <button className="px-10 py-5 bg-stone-50 border-2 border-stone-100 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all shadow-sm">
                  <Share2 className="w-4 h-4 inline-block mr-3" />
                  分享
                </button>
                <button className="p-5 bg-stone-900 text-white rounded-[2rem] hover:bg-neon hover:text-black transition-all shadow-lg hover:rotate-90">
                  <Settings className="w-6 h-6" />
                </button>
                <button onClick={() => onLogout?.()} className="p-5 bg-red-50 text-red-500 rounded-[2rem] hover:bg-red-500 hover:text-white transition-all shadow-sm group">
                  <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: '商品图总数', value: '1,284', icon: <Grid className="w-4 h-4" />, color: 'neon', growth: '+24' },
                { label: '累计点击率', value: '45.2%', icon: <Heart className="w-4 h-4" />, color: 'red-500', growth: '+1.2%' },
                { label: '渲染算力', value: '428', icon: <Zap className="w-4 h-4" />, color: 'neon', growth: '充值' },
                { label: '品牌模板', value: '12', icon: <Bookmark className="w-4 h-4" />, color: 'stone-900', growth: '3个新增' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-8 bg-stone-50 border border-stone-100 rounded-[2.5rem] cursor-pointer group transition-all hover:bg-white hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-stone-400 text-[9px] font-black uppercase tracking-widest">
                      <span className={`group-hover:text-${stat.color} transition-colors`}>{stat.icon}</span>
                      {stat.label}
                    </div>
                    <span className="text-[8px] font-black text-neon bg-neon/10 px-2 py-0.5 rounded-full">{stat.growth}</span>
                  </div>
                  <div className="text-4xl font-impact tracking-tighter group-hover:translate-x-1 transition-transform">{stat.value}</div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-neon/5 rounded-full group-hover:scale-[3] transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs & Content */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-stone-100 mb-12">
          <div className="flex items-center gap-12">
            {['项目库', '品牌资产', '操作记录', '订阅服务'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-6 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-neon" />}
              </button>
            ))}
          </div>

          {activeTab === '项目库' && (
            <div className="flex items-center gap-4 pb-6 overflow-x-auto no-scrollbar">
              {['所有类目', '数码产品', '美妆个护', '家居设计', '时尚鞋履'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f === '所有类目' ? '所有样式' : f)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${(f === '所有类目' ? filter === '所有样式' : filter === f) ? 'bg-stone-900 text-white shadow-xl' : 'bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-stone-100'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeTab === '项目库' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {/* Create New Trigger */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate('studio')}
              className="aspect-[3/4] rounded-[3rem] border-4 border-dashed border-stone-100 flex flex-col items-center justify-center gap-6 group hover:border-black hover:bg-stone-50 transition-all h-full"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-stone-50 flex items-center justify-center group-hover:bg-neon group-hover:rotate-12 transition-all duration-500 shadow-sm border border-stone-100">
                <PlusCircle className="w-10 h-10 text-stone-300 group-hover:text-black" />
              </div>
              <div className="text-center px-6">
                <span className="font-black uppercase text-xs tracking-[0.3em] block mb-2 text-stone-900">新建项目</span>
                <span className="text-[10px] text-stone-400 font-medium italic block">点此启动 AI 引擎生成新作品</span>
              </div>
            </motion.button>

            {filteredCreations.map((img, i) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCreation(img)}
                className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-stone-100 flex flex-col shadow-xl cursor-pointer"
              >
                <img src={img.url} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" referrerPolicy="no-referrer" />
                
                {/* Image Overlay Info */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="backdrop-blur-xl bg-white/10 rounded-[2rem] p-6 border border-white/20 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <div className="pr-4">
                        <div className="text-neon text-[9px] font-black uppercase tracking-[0.2em] mb-1">{img.engine}</div>
                        <h4 className="text-white font-impact italic text-xl uppercase leading-tight line-clamp-1">{img.title}</h4>
                      </div>
                      <button className="p-2 bg-white/20 rounded-xl backdrop-blur hover:bg-neon hover:text-black transition-colors text-white">
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div>
                      <span className="text-[8px] text-white/40 block mb-1 uppercase tracking-widest font-black">比例 / 风格</span>
                        <span className="text-[10px] text-white font-mono">{img.ratio} • {img.style}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-white/40 block mb-1 uppercase tracking-widest font-black">Date</span>
                        <span className="text-[10px] text-white font-mono">{img.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="px-4 py-1.5 bg-black/40 backdrop-blur rounded-full text-[9px] text-white font-black uppercase tracking-widest border border-white/10">
                    REF {img.id}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === '品牌资产' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {FAVORITES.map((img, i) => (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-stone-100 flex flex-col shadow-xl cursor-pointer"
              >
                <img src={img.url} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <h4 className="text-white font-impact italic text-2xl uppercase">{img.title}</h4>
                    <div className="text-neon text-[10px] font-black uppercase tracking-widest">品牌资产</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === '操作记录' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-impact uppercase italic mb-8">最近活动</h3>
              {[
                { type: '生成', item: 'Neural Mesh', cost: '-2.0', time: '14:24' },
                { type: '变体', item: 'Data Stream', cost: '-0.5', time: '12:05' },
                { type: '导出', item: 'Core Logic', cost: '0.0', time: '09:12' },
                { type: '生成', item: 'Vivid Fusion', cost: '-2.0', time: '昨天' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-stone-50 rounded-3xl border border-stone-100 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      {log.type === '生成' ? <Zap className="w-5 h-5 text-neon" /> : <Grid className="w-5 h-5 text-stone-400" />}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900">{log.type}: {log.item}</div>
                      <div className="text-[10px] text-stone-400 font-black uppercase tracking-widest">{log.time} • 成功</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-mono font-bold ${log.cost === '0.0' ? 'text-stone-300' : 'text-red-500'}`}>{log.cost} CR</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <div className="p-10 bg-stone-900 rounded-[3rem] text-white">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50">Usage Forecast</div>
                <div className="text-4xl font-impact italic mb-6">活跃度: 极高</div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-neon shadow-[0_0_20px_rgba(150,255,0,0.5)]" />
                </div>
                <p className="mt-4 text-xs text-stone-400">您的活跃度处于全社区前 5%，建议保持当前创作节奏以维持排名。</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {FOOTPRINTS.map((img, i) => (
                  <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-stone-100 flex flex-col shadow-xl cursor-pointer"
                  >
                    <img src={img.url} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white font-impact text-lg uppercase leading-tight">{img.title}</h4>
                      <span className="text-[9px] text-neon font-black tracking-widest uppercase">上一次互动</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === '订阅服务' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-12 bg-stone-900 rounded-[4rem] text-white overflow-hidden relative group cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-neon text-black rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-5xl font-impact uppercase italic tracking-tight mb-4 leading-tight">升级至专业版</h3>
                <p className="text-stone-400 font-medium mb-12 text-lg max-w-md">解锁 4K 原图导出、无限云存储空间、以及 AI 优先队列渲染权，让你的创作效率翻倍。</p>
                <button className="px-12 py-5 bg-neon text-black rounded-[2rem] font-black uppercase text-sm tracking-widest hover:bg-white hover:scale-105 transition-all shadow-glow flex items-center gap-3">
                  立即升级计划
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>
              <Zap className="absolute -right-20 -bottom-20 w-[30rem] h-[30rem] text-white/5 rotate-12 group-hover:text-neon/10 transition-all duration-1000" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-12 bg-stone-50 border border-stone-100 rounded-[4rem] flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <Settings className="w-6 h-6 text-stone-900" />
                  </div>
                  <h3 className="text-3xl font-impact uppercase tracking-tight text-stone-900">账户安全中心</h3>
                </div>
                
                <div className="space-y-6">
                  <div className={`w-full flex items-center justify-between p-6 bg-white border rounded-3xl transition-all group ${isEditingEmail ? 'border-neon ring-4 ring-neon/10' : 'border-stone-100'}`}>
                    <div className="flex flex-col items-start flex-1 mr-4">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">电子邮箱</span>
                      {isEditingEmail ? (
                        <input 
                          type="email" 
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          className="text-lg bg-transparent outline-none w-full border-b border-stone-200"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEmail()}
                        />
                      ) : (
                        <span className="text-lg">{email.replace(/(.{2}).*(@.*)/, '$1****$2')}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => isEditingEmail ? handleSaveEmail() : setIsEditingEmail(true)}
                      disabled={isSyncing}
                      className={`p-3 rounded-xl transition-colors ${isEditingEmail ? 'bg-black text-white hover:bg-neon hover:text-black' : 'bg-stone-50 group-hover:bg-neon group-hover:text-black'}`}
                    >
                      {isSyncing && isEditingEmail ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : isEditingEmail ? (
                        <Zap className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="w-full flex items-center justify-between p-6 bg-white border border-stone-100 rounded-3xl text-stone-600 font-bold hover:border-neon hover:shadow-lg transition-all group relative overflow-hidden">
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">登录密码</span>
                      <span className="text-lg">••••••••••••</span>
                    </div>
                    <button 
                      onClick={handlePasswordReset}
                      className="p-3 bg-stone-50 rounded-xl group-hover:bg-neon group-hover:text-black transition-colors"
                    >
                      <History className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {showPasswordReset && (
                        <motion.div 
                          initial={{ x: '100%' }}
                          animate={{ x: 0 }}
                          exit={{ x: '100%' }}
                          className="absolute inset-y-0 right-0 bg-stone-900 border-l-4 border-neon px-8 flex items-center text-xs text-white font-black uppercase tracking-widest z-10"
                        >
                          重置链接已发送至邮箱
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center justify-center gap-4 py-6 text-red-500 font-black uppercase text-xs tracking-[0.2em] mt-12 bg-red-50/30 border-2 border-red-50 rounded-3xl hover:bg-red-50 hover:border-red-100 transition-all">
                <LogOut className="w-5 h-5" />
                安全退出当前登录
              </button>
              
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Settings className="w-32 h-32 rotate-12" />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

