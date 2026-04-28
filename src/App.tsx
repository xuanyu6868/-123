/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImageGrid, ImageItem } from './components/ImageGrid';
import { ImageModal } from './components/ImageModal';
import { LandingPage } from './components/LandingPage';
import { Community } from './components/Community';
import { Pricing } from './components/Pricing';
import { Profile } from './components/Profile';
import { AuthPage } from './components/AuthPage';
import { generateAiImage } from './services/aiService';
import { ContactFooter } from './components/ContactFooter';

const SAMPLE_IMAGES: ImageItem[] = [
  {
    id: '0',
    url: '/手表AI生成图.png',
    prompt: 'Luxury silver watch with complex inner gears, macro photography, studio lighting, sharp focus',
    tags: ['高级腕表', '商业摄影'],
    stackItems: [
      { url: '/手表.png', title: '原始拍摄', engine: '基础模型' },
      { url: '/手表AI生成图.png', title: '商业渲染', engine: '神经渲染引擎' }
    ]
  },
  {
    id: '1',
    url: '/音响AI生成图.png',
    prompt: 'High-end smart speaker, minimalist design, dark studio background, cinematic lighting',
    tags: ['数码产品', '商业摄影', '宏距'],
    stackItems: [
      { url: '/音响.png', title: '原始拍摄', engine: '基础模型' },
      { url: '/音响AI生成图.png', title: '商业渲染', engine: '神经渲染引擎' }
    ]
  },
  {
    id: '2',
    url: '/台灯AI生成图.png',
    prompt: 'A minimalist modern desk lamp emitting warm light, placed on a wooden table, dark moody lighting',
    tags: ['家居设计', '柔光'],
    stackItems: [
      { url: '/台灯.png', title: '原始拍摄', engine: '基础模型' },
      { url: '/台灯AI生成图.png', title: '商业渲染', engine: '神经渲染引擎' }
    ]
  },
  {
    id: '3',
    url: '/电动牙刷AI生成图.png',
    prompt: 'Premium electric toothbrush on water surface with ripples, product photography, studio lighting',
    tags: ['美妆个护', '生活方式', '商业摄影'],
    stackItems: [
      { url: '/电动牙刷.png', title: '原始拍摄', engine: '基础模型' },
      { url: '/电动牙刷AI生成图.png', title: '商业渲染', engine: '神经渲染引擎' }
    ]
  }
];

type AppView = 'home' | 'studio' | 'community' | 'pricing' | 'profile' | 'auth';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [images, setImages] = useState<ImageItem[]>(SAMPLE_IMAGES);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Added auth state

  const handleGenerate = async (prompt: string, aspectRatio: string, style: string) => {
    if (!isAuthenticated) {
      handleNavigate('auth');
      return;
    }

    setIsGenerating(true);
    try {
      const imageUrl = await generateAiImage(prompt, aspectRatio === '1:1' ? '1:1' : aspectRatio === '16:9' ? '16:9' : aspectRatio === '9:16' ? '9:16' : '3:4');
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        tags: ['AI 生成', style !== 'none' ? `风格: ${style}` : '创作者系列']
      };
      setImages([newImage, ...images]);
    } catch (error) {
      console.error(error);
      alert('生成失败。请在 Secrets 面板中检查您的 Gemini API 密钥。');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNavigate = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <LandingPage onStart={() => handleNavigate('studio')} onNavigate={handleNavigate} />;
      case 'community':
        return <Community onNavigate={handleNavigate} />;
      case 'pricing':
        return <Pricing />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} onLogout={() => { setIsAuthenticated(false); handleNavigate('auth'); }} />;
      case 'studio':
        return (
          <main className="pb-40">
            <Hero onGenerate={handleGenerate} isGenerating={isGenerating} />
            
            <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="flex flex-col select-none">
                <h2 className="text-6xl md:text-8xl font-impact tracking-tighter italic uppercase leading-tight mb-4">
                  影像 <br />
                  <span className="text-neon transition-all hover:text-black hover:drop-shadow-[0_0_10px_#00FF00]">画廊</span>
                </h2>
                <div className="w-24 h-2 bg-stone-900 mt-6 mb-8" />
                <p className="text-stone-400 text-xl font-medium tracking-tight max-w-lg">
                  利用 AI 的力量将原本平庸的底图重塑为商业级大片，构建品牌视觉巅峰。
                </p>
              </div>
              <div className="flex gap-4">
                <button className="bg-stone-50 border-2 border-stone-100 text-stone-900 px-10 py-5 rounded-2xl text-sm font-black tracking-[0.2em] hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                  历史归档
                </button>
                <button className="bg-stone-900 text-white px-10 py-5 rounded-2xl text-sm font-black tracking-[0.2em] hover:bg-neon hover:text-black shadow-2xl shadow-stone-200 transition-all">
                  参数配置
                </button>
              </div>
            </div>
            
            <ImageGrid images={images} onImageClick={setSelectedImage} />
          </main>
        );
      case 'auth':
        return <AuthPage onLogin={() => { setIsAuthenticated(true); handleNavigate('studio'); }} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-neon selection:text-black">
      <Navbar onNavigate={handleNavigate} currentView={view} isAuthenticated={isAuthenticated} />
      
      {renderContent()}

      <ContactFooter />

      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}


