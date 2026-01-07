import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Camera, Shirt, Sparkles, Crown, Settings, 
  TrendingUp, Award, History, ChevronRight,
  Edit2, LogOut, Bell, Shield, Palette, Globe,
  Building2, Upload, Check, Clock, X, AlertCircle, ShieldCheck
} from 'lucide-react';

const ProfilePage = ({ credits, wardrobe, setWardrobe, approvedProducts, setApprovedProducts }) => {
  // 从 localStorage 读取登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || null;
  });
  const [loginMode, setLoginMode] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  
  // 从 ExplorePage 获取的类别列表
  const availableCategories = [
    { value: 'jackets', label: 'Jackets' },
    { value: 'coats', label: 'Coats' },
    { value: 'suits', label: 'Suits' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'formal', label: 'Formal Wear' },
    { value: 'casual', label: 'Casual' },
    { value: 'athletic', label: 'Athletic' }
  ];

  // 从 localStorage 读取提交记录
  const [uploadSubmissions, setUploadSubmissions] = useState(() => {
    const saved = localStorage.getItem('uploadSubmissions');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Premium Leather Jacket',
        brand: 'LuxeFashion',
        price: 299,
        category: 'jackets',
        description: 'High-quality leather jacket',
        status: 'approved',
        submittedDate: '2024-01-15',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400']
      },
      {
        id: 2,
        name: 'Designer Wool Coat',
        brand: 'LuxeFashion',
        price: 450,
        category: 'coats',
        description: 'Elegant wool coat',
        status: 'pending',
        submittedDate: '2024-01-20',
        images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400']
      }
    ];
  });

  // 监听登录状态变化，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [isLoggedIn, userType]);

  // 监听提交记录变化，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('uploadSubmissions', JSON.stringify(uploadSubmissions));
  }, [uploadSubmissions]);

  const personalUserData = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    memberSince: 'January 2024',
    membershipTier: 'Pro',
    totalTryOns: 127,
    totalSpent: 2450,
    favoriteStyle: 'Streetwear',
  };

  const enterpriseUserData = {
    name: 'LuxeFashion Co.',
    email: 'contact@luxefashion.com',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400',
    memberSince: 'December 2023',
    membershipTier: 'Enterprise',
    totalUploads: uploadSubmissions.length,
    approvedItems: uploadSubmissions.filter(s => s.status === 'approved').length,
    pendingItems: uploadSubmissions.filter(s => s.status === 'pending').length,
    rejectedItems: uploadSubmissions.filter(s => s.status === 'rejected').length,
  };

  const adminUserData = {
    name: 'System Administrator',
    email: 'admin@contextual.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    memberSince: 'January 2024',
    membershipTier: 'Admin',
    totalReviews: uploadSubmissions.length,
    pendingReviews: uploadSubmissions.filter(s => s.status === 'pending').length,
    approvedToday: uploadSubmissions.filter(s => s.status === 'approved').length,
  };

  const userData = userType === 'personal' ? personalUserData : userType === 'enterprise' ? enterpriseUserData : adminUserData;

  const handleLogin = () => {
    setLoginError('');
    if (loginMode === 'personal') {
      if (username === 'MVPpersonal' && password === '123456') {
        setIsLoggedIn(true);
        setUserType('personal');
      } else {
        setLoginError('Invalid username or password');
      }
    } else if (loginMode === 'enterprise') {
      if (username === 'MVPenterprise' && password === '123456') {
        setIsLoggedIn(true);
        setUserType('enterprise');
      } else {
        setLoginError('Invalid username or password');
      }
    } else if (loginMode === 'admin') {
      if (username === 'MVPadmin' && password === '123456') {
        setIsLoggedIn(true);
        setUserType('admin');
      } else {
        setLoginError('Invalid admin credentials');
      }
    }
  };

  const handleLogout = () => {
    // 清除所有登录状态
    setIsLoggedIn(false);
    setUserType(null);
    setLoginMode(null);
    setUsername('');
    setPassword('');
    setLoginError('');
    setActiveSection('overview');
    
    // 清除 localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedImages.length + files.length > 4) {
      alert('Maximum 4 images allowed');
      return;
    }
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleSubmitUpload = () => {
    if (uploadedImages.length !== 4) {
      alert('Please upload exactly 4 images');
      return;
    }
    if (!productName || !productCategory || !productPrice) {
      alert('Please fill in all required fields');
      return;
    }
    const newSubmission = {
      id: Date.now(),
      name: productName,
      brand: 'LuxeFashion',
      price: parseFloat(productPrice),
      category: productCategory,
      description: productDescription,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      images: uploadedImages.map(img => img.url)
    };
    setUploadSubmissions([newSubmission, ...uploadSubmissions]);
    setUploadedImages([]);
    setProductName('');
    setProductCategory('');
    setProductPrice('');
    setProductDescription('');
    setShowUploadModal(false);
    alert('Submission sent for review!');
  };

  const handleApproveSubmission = (submissionId) => {
    const submission = uploadSubmissions.find(s => s.id === submissionId);
    if (!submission) return;
    setUploadSubmissions(uploadSubmissions.map(s => 
      s.id === submissionId ? { ...s, status: 'approved' } : s
    ));
    const newProduct = {
      id: `approved-${submissionId}`,
      name: submission.name,
      brand: submission.brand,
      price: submission.price,
      category: submission.category,
      image: submission.images[0],
      rating: 4.5,
      reviews: 0,
      isNew: true
    };
    if (setApprovedProducts) {
      setApprovedProducts(prev => [...prev, newProduct]);
    }
    alert(`${submission.name} has been approved and added to Explore page!`);
  };

  const handleRejectSubmission = (submissionId) => {
    const reason = prompt('Rejection reason:');
    if (!reason) return;
    setUploadSubmissions(uploadSubmissions.map(s => 
      s.id === submissionId ? { ...s, status: 'rejected', rejectReason: reason } : s
    ));
    alert('Submission rejected');
  };

  const personalStats = [
    { label: 'Try-Ons', value: 127, icon: Camera, gradient: 'from-blue-500 to-cyan-400', change: '+12 this week' },
    { label: 'Wardrobe', value: wardrobe?.length || 0, icon: Shirt, gradient: 'from-purple-500 to-pink-500', change: '+3 this week' },
    { label: 'Spent', value: '£2450', icon: TrendingUp, gradient: 'from-orange-500 to-red-500', change: '+£180' },
    { label: 'Credits', value: credits || 0, icon: Sparkles, gradient: 'from-yellow-500 to-orange-400', change: 'Top up' },
  ];

  const enterpriseStats = [
    { label: 'Uploads', value: uploadSubmissions.length, icon: Upload, gradient: 'from-blue-500 to-cyan-400', change: '+2 week' },
    { label: 'Approved', value: uploadSubmissions.filter(s => s.status === 'approved').length, icon: Check, gradient: 'from-green-500 to-emerald-400', change: '75%' },
    { label: 'Pending', value: uploadSubmissions.filter(s => s.status === 'pending').length, icon: Clock, gradient: 'from-yellow-500 to-orange-400', change: '2-3 days' },
    { label: 'Rejected', value: uploadSubmissions.filter(s => s.status === 'rejected').length, icon: X, gradient: 'from-red-500 to-pink-500', change: 'View' },
  ];

  const adminStats = [
    { label: 'Reviews', value: uploadSubmissions.length, icon: ShieldCheck, gradient: 'from-blue-500 to-cyan-400', change: 'All time' },
    { label: 'Pending', value: uploadSubmissions.filter(s => s.status === 'pending').length, icon: Clock, gradient: 'from-yellow-500 to-orange-400', change: 'Needs attention' },
    { label: 'Approved', value: uploadSubmissions.filter(s => s.status === 'approved').length, icon: Check, gradient: 'from-green-500 to-emerald-400', change: 'Today' },
    { label: 'Rate', value: '50%', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500', change: 'Overall' },
  ];

  const stats = userType === 'personal' ? personalStats : userType === 'enterprise' ? enterpriseStats : adminStats;

  // 如果未登录，显示登录界面
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!loginMode && (
              <motion.div key="select-mode" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Welcome to CONTEXTUAL</h1>
                  <p className="text-gray-400">Choose your account type</p>
                </div>

                {/* Personal User Card */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setLoginMode('personal')} className="w-full p-6 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-2xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all text-left">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Personal User</h3>
                      <p className="text-sm text-gray-400">Virtual try-on & shopping</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cyan-400">
                    <span>Continue as Personal User</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>

                {/* Enterprise User Card */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setLoginMode('enterprise')} className="w-full p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border-2 border-orange-500/30 hover:border-orange-500/50 transition-all text-left">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Enterprise User</h3>
                      <p className="text-sm text-gray-400">Upload & manage products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-400">
                    <span>Continue as Enterprise User</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>

                {/* Admin User Card */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setLoginMode('admin')} className="w-full p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border-2 border-indigo-500/30 hover:border-indigo-500/50 transition-all text-left">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Administrator</h3>
                      <p className="text-sm text-gray-400">Review & manage submissions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-400">
                    <span>Continue as Administrator</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>
              </motion.div>
            )}

            {loginMode && (
              <motion.div key="login-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <button onClick={() => { setLoginMode(null); setLoginError(''); setUsername(''); setPassword(''); }} className="mb-6 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                    loginMode === 'personal' 
                      ? 'from-purple-500 to-cyan-400' 
                      : loginMode === 'enterprise'
                      ? 'from-orange-500 to-red-500'
                      : 'from-indigo-500 to-purple-500'
                  } rounded-2xl flex items-center justify-center`}>
                    {loginMode === 'personal' ? (
                      <User className="w-8 h-8 text-white" />
                    ) : loginMode === 'enterprise' ? (
                      <Building2 className="w-8 h-8 text-white" />
                    ) : (
                      <ShieldCheck className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {loginMode === 'personal' ? 'Personal Login' : loginMode === 'enterprise' ? 'Enterprise Login' : 'Admin Login'}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {loginMode === 'personal' 
                      ? 'Access your virtual wardrobe' 
                      : loginMode === 'enterprise'
                      ? 'Manage your products'
                      : 'System administrator access'}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Username</label>
                    <input 
                      type="text" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      placeholder={
                        loginMode === 'personal' 
                          ? 'MVPpersonal' 
                          : loginMode === 'enterprise'
                          ? 'MVPenterprise'
                          : 'MVPadmin'
                      } 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all" 
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="123456" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all" 
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()} 
                    />
                  </div>
                  {loginError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      {loginError}
                    </motion.div>
                  )}
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={handleLogin} 
                    className={`w-full py-4 rounded-xl font-bold bg-gradient-to-r ${
                      loginMode === 'personal' 
                        ? 'from-purple-500 to-cyan-400' 
                        : loginMode === 'enterprise'
                        ? 'from-orange-500 to-red-500'
                        : 'from-indigo-500 to-purple-500'
                    } hover:shadow-lg transition-all`}
                  >
                    Login
                  </motion.button>
                </div>
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
                  <p className="text-xs font-mono text-cyan-400">
                    Username: {
                      loginMode === 'personal' 
                        ? 'MVPpersonal' 
                        : loginMode === 'enterprise'
                        ? 'MVPenterprise'
                        : 'MVPadmin'
                    }
                  </p>
                  <p className="text-xs font-mono text-cyan-400">Password: 123456</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // 已登录后的主界面
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`relative mb-8 p-8 bg-gradient-to-br ${userType === 'admin' ? 'from-indigo-500/20 via-purple-500/20 to-pink-500/20' : 'from-purple-500/20 via-pink-500/20 to-cyan-400/20'} rounded-3xl border border-white/10 overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20">
                <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
              </motion.div>
              {userType !== 'admin' && (
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute bottom-2 right-2 p-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </motion.button>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <div className={`px-3 py-1 bg-gradient-to-r ${userType === 'personal' ? 'from-yellow-500 to-orange-500' : userType === 'enterprise' ? 'from-purple-500 to-pink-500' : 'from-indigo-500 to-purple-500'} rounded-full flex items-center gap-1`}>
                  {userType === 'personal' ? <Crown className="w-4 h-4" /> : userType === 'enterprise' ? <Building2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  <span className="text-xs font-bold">{userData.membershipTier}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-1">{userData.email}</p>
              <p className="text-sm text-gray-500">Member since {userData.memberSince}</p>
            </div>
            <div className="flex gap-3">
              {userType === 'enterprise' && (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUploadModal(true)} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-medium transition-all flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload
                </motion.button>
              )}
              {userType !== 'admin' && (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEditProfile(true)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all">
                  Edit
                </motion.button>
              )}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                <Settings className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -4 }} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                <p className="text-xs text-cyan-400">{stat.change}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {userType === 'personal' ? (
            ['overview', 'settings'].map((section) => (
              <motion.button key={section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveSection(section)} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === section ? 'bg-gradient-to-r from-purple-500 to-cyan-400' : 'bg-white/5 hover:bg-white/10'}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))
          ) : userType === 'enterprise' ? (
            ['overview', 'uploads', 'settings'].map((section) => (
              <motion.button key={section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveSection(section)} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === section ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/5 hover:bg-white/10'}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))
          ) : (
            ['pending', 'approved', 'rejected', 'settings'].map((section) => (
              <motion.button key={section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveSection(section)} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === section ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/5 hover:bg-white/10'}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))
          )}
        </div>

        <AnimatePresence mode="wait">
          {userType === 'personal' && activeSection === 'overview' && (
            <motion.div key="personal-overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Welcome back!</h3>
              <p className="text-gray-400">Your personal dashboard</p>
            </motion.div>
          )}

          {userType === 'enterprise' && activeSection === 'overview' && (
            <motion.div key="enterprise-overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowUploadModal(true)} className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 hover:border-orange-500/50 transition-all text-left">
                  <Upload className="w-8 h-8 text-orange-400 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Upload New Product</h3>
                  <p className="text-sm text-gray-400">Submit 4 high-quality images</p>
                </motion.button>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Performance</h3>
                  <p className="text-sm text-gray-400 mb-3">Products performing well</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Approval Rate</span>
                      <span className="font-bold text-green-400">{Math.round((userData.approvedItems / userData.totalUploads) * 100) || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold mb-6">Recent Submissions</h3>
                <div className="space-y-3">
                  {uploadSubmissions.slice(0, 3).map((submission) => (
                    <motion.div key={submission.id} whileHover={{ x: 4 }} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {submission.status === 'approved' && <Check className="w-6 h-6" />}
                        {submission.status === 'pending' && <Clock className="w-6 h-6" />}
                        {submission.status === 'rejected' && <X className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{submission.name}</p>
                        <p className="text-sm text-gray-400">{submission.submittedDate}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {submission.status.toUpperCase()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {userType === 'enterprise' && activeSection === 'uploads' && (
            <motion.div key="enterprise-uploads" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">All Submissions</h3>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUploadModal(true)} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  New
                </motion.button>
              </div>
              <div className="space-y-3">
                {uploadSubmissions.map((submission) => (
                  <div key={submission.id} className="p-5 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {submission.status === 'approved' && <Check className="w-8 h-8" />}
                        {submission.status === 'pending' && <Clock className="w-8 h-8" />}
                        {submission.status === 'rejected' && <X className="w-8 h-8" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold mb-1">{submission.name}</h4>
                            <p className="text-sm text-gray-400">{submission.brand}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                            {submission.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                          <span>Submitted: {submission.submittedDate}</span>
                          <span>•</span>
                          <span>Category: {availableCategories.find(c => c.value === submission.category)?.label || submission.category}</span>
                          <span>•</span>
                          <span className="text-cyan-400 font-bold">£{submission.price}</span>
                        </div>
                        {submission.status === 'rejected' && submission.rejectReason && (
                          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-sm text-red-400">{submission.rejectReason}</p>
                          </div>
                        )}
                        {submission.status === 'approved' && (
                          <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <p className="text-sm text-green-400">Live on Explore page</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {userType === 'admin' && activeSection === 'pending' && (
            <motion.div key="admin-pending" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <p className="text-sm text-yellow-400">{uploadSubmissions.filter(s => s.status === 'pending').length} submission(s) awaiting review</p>
              </div>
              {uploadSubmissions.filter(s => s.status === 'pending').map((submission) => (
                <div key={submission.id} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{submission.name}</h3>
                      <p className="text-sm text-gray-400">{submission.brand} • {submission.submittedDate}</p>
                    </div>
                    <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold">PENDING</div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {submission.images?.map((image, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="mb-4 p-4 bg-white/5 rounded-xl">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Category</p>
                        <p className="font-medium">{availableCategories.find(c => c.value === submission.category)?.label || submission.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Price</p>
                        <p className="font-medium text-cyan-400">£{submission.price}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-400 mb-1">Description</p>
                        <p className="font-medium">{submission.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleRejectSubmission(submission.id)} className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
                      <X className="w-5 h-5" />
                      Reject
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleApproveSubmission(submission.id)} className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl font-medium flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Approve
                    </motion.button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {userType === 'admin' && activeSection === 'approved' && (
            <motion.div key="admin-approved" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-6">Approved Products</h3>
              <div className="space-y-3">
                {uploadSubmissions.filter(s => s.status === 'approved').map((submission) => (
                  <div key={submission.id} className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{submission.name}</p>
                      <p className="text-sm text-gray-400">{submission.submittedDate} • {availableCategories.find(c => c.value === submission.category)?.label}</p>
                    </div>
                    <span className="text-cyan-400 font-bold">£{submission.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {userType === 'admin' && activeSection === 'rejected' && (
            <motion.div key="admin-rejected" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-6">Rejected Submissions</h3>
              <div className="space-y-3">
                {uploadSubmissions.filter(s => s.status === 'rejected').map((submission) => (
                  <div key={submission.id} className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                        <X className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{submission.name}</p>
                        <p className="text-sm text-gray-400">{submission.submittedDate}</p>
                      </div>
                    </div>
                    {submission.rejectReason && (
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <p className="text-sm text-red-400">{submission.rejectReason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <motion.button whileHover={{ x: 4 }} className="w-full flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all text-left">
                <div className="p-3 bg-white/10 rounded-xl"><Bell className="w-6 h-6" /></div>
                <div className="flex-1">
                  <p className="font-medium mb-1">Notifications</p>
                  <p className="text-sm text-gray-400">Manage alerts</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button whileHover={{ x: 4 }} className="w-full flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all text-left">
                <div className="p-3 bg-white/10 rounded-xl"><Shield className="w-6 h-6" /></div>
                <div className="flex-1">
                  <p className="font-medium mb-1">Privacy</p>
                  <p className="text-sm text-gray-400">Control data</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
              <div className="mt-8 p-6 bg-red-500/10 rounded-2xl border border-red-500/30">
                <h4 className="font-bold text-red-400 mb-4">Danger Zone</h4>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Log Out</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && userType === 'enterprise' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => { setShowUploadModal(false); setUploadedImages([]); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Upload Product</h2>
                  <p className="text-sm text-gray-400 mt-1">Submit 4 high-quality images</p>
                </div>
                <button onClick={() => { setShowUploadModal(false); setUploadedImages([]); }} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">Images ({uploadedImages.length}/4)</label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {uploadedImages.map((image, index) => (
                    <div key={image.id} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                      <img src={image.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button onClick={() => setUploadedImages(uploadedImages.filter(img => img.id !== image.id))} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-bold">Image {index + 1}</div>
                    </div>
                  ))}
                  {uploadedImages.length < 4 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-white/20 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col items-center justify-center bg-white/5">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-400">Upload</span>
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Product Name</label>
                  <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Premium Leather Jacket" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Category *</label>
                    <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all">
                      <option value="">Select category</option>
                      {availableCategories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Must match Explore page categories</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Price (£)</label>
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="299" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea rows="3" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Describe product..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all resize-none" />
                </div>
              </div>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-cyan-400 font-medium mb-1">Review Process</p>
                    <p className="text-gray-400">Reviewed within 2-3 days. Once approved, added to Explore page under selected category.</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setShowUploadModal(false); setUploadedImages([]); }} className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all">
                  Cancel
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmitUpload} disabled={uploadedImages.length !== 4 || !productName || !productCategory || !productPrice} className={`flex-1 py-3 rounded-xl font-medium transition-all ${uploadedImages.length === 4 && productName && productCategory && productPrice ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setShowEditProfile(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input type="text" defaultValue={userData.name} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" defaultValue={userData.email} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowEditProfile(false)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all">
                  Cancel
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowEditProfile(false)} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl font-medium">
                  Save
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
