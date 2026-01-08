import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Shirt, Camera, User, Sparkles, X, Zap, Crown, ArrowRight, Lock } from 'lucide-react';
import TryOnPage from './components/TryOnPage';
import ExplorePage from './components/ExplorePage';
import WardrobePage from './components/WardrobePage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [hasEntered, setHasEntered] = useState(() => {
    return localStorage.getItem('hasEntered') === 'true';
  });
  
  // 检查登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [activeTab, setActiveTab] = useState('explore');
  const [credits, setCredits] = useState(250);
  const [showTopUp, setShowTopUp] = useState(false);
  const [wardrobe, setWardrobe] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);

  useEffect(() => {
    if (hasEntered) {
      localStorage.setItem('hasEntered', 'true');
    }
  }, [hasEntered]);

  // 监听登录状态变化
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    // 每秒检查一次登录状态
    const interval = setInterval(checkLoginStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'explore', label: 'Explore', icon: Home },
    { id: 'wardrobe', label: 'Wardrobe', icon: Shirt },
    { id: 'tryon', label: 'Try-On', icon: Camera },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const topUpPlans = [
    { id: 'starter', price: 10, credits: 500, icon: Sparkles, gradient: 'from-blue-500 to-cyan-400', popular: false },
    { id: 'pro', price: 50, credits: 2000, icon: Zap, gradient: 'from-purple-500 to-pink-500', popular: true },
    { id: 'premium', price: 100, credits: 5000, icon: Crown, gradient: 'from-orange-500 to-red-500', popular: false },
    { id: 'ultimate', price: 299, credits: '∞', icon: Crown, gradient: 'from-yellow-500 via-purple-500 to-pink-500', popular: false, label: 'ULTIMATE' },
  ];

  const handleTopUp = (plan) => {
    if (plan.credits === '∞') {
      setCredits('∞');
    } else {
      setCredits(prev => prev === '∞' ? '∞' : prev + plan.credits);
    }
    setShowTopUp(false);
  };

  const handleEnterApp = () => {
    setHasEntered(true);
  };

  const renderActivePage = () => {
    // 如果未登录且不是 Profile 页面，显示登录提示
    if (!isLoggedIn && activeTab !== 'profile') {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center"
            >
              <Lock className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-400 mb-8">
              Please login to access {activeTab === 'explore' ? 'Explore' : activeTab === 'wardrobe' ? 'Wardrobe' : 'Try-On'} features
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('profile')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl font-bold text-lg"
            >
              Go to Login
            </motion.button>
          </motion.div>
        </div>
      );
    }

    switch (activeTab) {
      case 'explore':
        return <ExplorePage wardrobe={wardrobe} setWardrobe={setWardrobe} approvedProducts={approvedProducts} />;
      case 'wardrobe':
        return <WardrobePage wardrobe={wardrobe} setWardrobe={setWardrobe} />;
      case 'tryon':
        return <TryOnPage setCredits={setCredits} wardrobe={wardrobe} />;
      case 'profile':
        return <ProfilePage credits={credits} wardrobe={wardrobe} setWardrobe={setWardrobe} approvedProducts={approvedProducts} setApprovedProducts={setApprovedProducts} />;
      default:
        return <ExplorePage wardrobe={wardrobe} setWardrobe={setWardrobe} approvedProducts={approvedProducts} />;
    }
  };

  // 欢迎启动界面
  if (!hasEntered) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', 
            backgroundSize: '40px 40px' 
          }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-2xl"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-block relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-3xl blur-2xl opacity-50"
              />
              <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-3xl flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent">
              CONTEXTUAL
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-full mx-auto mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl text-gray-300 mb-4"
          >
            Welcome to CONTEXTUAL
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-gray-400 mb-12"
          >
            Experience the future of virtual fashion try-on
          </motion.p>

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterApp}
            className="group relative px-12 py-5 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-2xl font-bold text-xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Click to Explore
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </span>
          </motion.button>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: Camera, text: 'AI Try-On' },
              { icon: Sparkles, text: '3D Rendering' },
              { icon: Shirt, text: 'Virtual Wardrobe' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-2"
                >
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-medium text-gray-300">{feature.text}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // 主应用界面
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter">CONTEXTUAL</span>
          </motion.div>
          
          {/* 只有登录后才显示积分 */}
          {isLoggedIn ? (
            <motion.button 
              onClick={() => setShowTopUp(true)} 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm font-mono font-bold">{credits}</span>
              <span className="text-xs text-gray-400">CR</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-400">Login</span>
            </motion.button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full">
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isLocked = !isLoggedIn && tab.id !== 'profile';
            
            return (
              <motion.button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className="flex flex-col items-center gap-1 relative" 
                whileTap={{ scale: 0.9 }}
              >
                {isActive && <motion.div layoutId="activeTab" className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />}
                <div className={`p-2 rounded-xl transition-colors relative ${isActive ? 'bg-gradient-to-br from-purple-500/20 to-cyan-400/20' : 'bg-transparent'}`}>
                  <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-cyan-400' : isLocked ? 'text-gray-600' : 'text-gray-400'}`} />
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Lock className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : isLocked ? 'text-gray-600' : 'text-gray-500'}`}>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Top-Up Modal - 只有登录后才能打开 */}
      <AnimatePresence>
        {showTopUp && isLoggedIn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setShowTopUp(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Top Up Credits</h2>
                  <p className="text-sm text-gray-400 mt-1">Choose your plan</p>
                </div>
                <button onClick={() => setShowTopUp(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-3">
                {topUpPlans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <motion.button key={plan.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleTopUp(plan)} className="w-full relative overflow-hidden rounded-2xl border-2 border-white/10 hover:border-white/30 transition-all">
                      <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-10`} />
                      {plan.popular && <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>}
                      <div className="relative p-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${plan.gradient}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold">£{plan.price}</span>
                              {plan.label && <span className="text-xs text-gray-400">{plan.label}</span>}
                            </div>
                            <p className="text-sm text-gray-400 font-mono">{plan.credits === '∞' ? 'Unlimited' : `${plan.credits} CR`}</p>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${plan.gradient} text-sm font-bold`}>BUY</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-xs text-center text-gray-500">Secure payment powered by Stripe</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
