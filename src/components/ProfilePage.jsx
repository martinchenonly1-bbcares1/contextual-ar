import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Plot from 'react-plotly.js';
import { 
  User, Camera, Shirt, Sparkles, Crown, Settings, 
  TrendingUp, Award, History, ChevronRight,
  Edit2, LogOut, Bell, Shield, Palette, Globe,
  Building2, Upload, Check, Clock, X, AlertCircle, ShieldCheck,
  Info, Eye
} from 'lucide-react';

const ProfilePage = ({ credits, wardrobe, setWardrobe, approvedProducts, setApprovedProducts }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userType, setUserType] = useState(() => localStorage.getItem('userType') || null);
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

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }
  }, [isLoggedIn, userType]);

  useEffect(() => {
    localStorage.setItem('uploadSubmissions', JSON.stringify(uploadSubmissions));
  }, [uploadSubmissions]);

  // 生成 3D T-shirt 数据
  const generateShirtData = (viewAngle) => {
    const body_x = [-2, 2, 2, -2, -2];
    const body_z = [0, 0, -5, -5, 0];
    const left_sleeve_x = [-2, -3.5, -3.5, -2];
    const left_sleeve_z = [0, -1, -2.5, -1.5];
    const right_sleeve_x = [2, 3.5, 3.5, 2];
    const right_sleeve_z = [0, -1, -2.5, -1.5];
    const y_front = 1;
    const y_back = -1;
    const theta = Array.from({length: 20}, (_, i) => (i / 19) * Math.PI);
    const neck_r = 1;
    const neck_x = theta.map(t => neck_r * Math.cos(t));
    const neck_y_front = theta.map(t => -neck_r * Math.sin(t) + 1);
    const neck_z = Array(20).fill(0);

    return {
      data: [
        { type: 'scatter3d', mode: 'lines', x: body_x, y: Array(5).fill(y_front), z: body_z, line: { color: 'royalblue', width: 4 }, name: 'Front Body' },
        { type: 'scatter3d', mode: 'lines', x: left_sleeve_x, y: Array(4).fill(y_front), z: left_sleeve_z, line: { color: 'royalblue', width: 4 }, name: 'Left Sleeve' },
        { type: 'scatter3d', mode: 'lines', x: right_sleeve_x, y: Array(4).fill(y_front), z: right_sleeve_z, line: { color: 'royalblue', width: 4 }, name: 'Right Sleeve' },
        { type: 'scatter3d', mode: 'lines', x: body_x, y: Array(5).fill(y_back), z: body_z, line: { color: 'navy', width: 3, dash: 'dash' }, name: 'Back Body' },
        { type: 'scatter3d', mode: 'lines', x: left_sleeve_x, y: Array(4).fill(y_back), z: left_sleeve_z, line: { color: 'navy', width: 3, dash: 'dash' }, showlegend: false },
        { type: 'scatter3d', mode: 'lines', x: right_sleeve_x, y: Array(4).fill(y_back), z: right_sleeve_z, line: { color: 'navy', width: 3, dash: 'dash' }, showlegend: false },
        { type: 'scatter3d', mode: 'lines', x: neck_x, y: neck_y_front, z: neck_z, line: { color: 'royalblue', width: 3 }, name: 'Neck' },
        { type: 'scatter3d', mode: 'lines', x: [-2, -2], y: [y_front, y_back], z: [0, 0], line: { color: 'gray', width: 2 }, showlegend: false },
        { type: 'scatter3d', mode: 'lines', x: [2, 2], y: [y_front, y_back], z: [0, 0], line: { color: 'gray', width: 2 }, showlegend: false },
        { type: 'scatter3d', mode: 'lines', x: [-2, -2], y: [y_front, y_back], z: [-5, -5], line: { color: 'gray', width: 2 }, showlegend: false },
        { type: 'scatter3d', mode: 'lines', x: [2, 2], y: [y_front, y_back], z: [-5, -5], line: { color: 'gray', width: 2 }, showlegend: false }
      ],
      layout: {
        scene: {
          camera: { eye: { x: Math.cos(viewAngle * Math.PI / 180) * 2, y: Math.sin(viewAngle * Math.PI / 180) * 2, z: 0.5 } },
          xaxis: { visible: false },
          yaxis: { visible: false },
          zaxis: { visible: false },
          aspectmode: 'cube'
        },
        showlegend: false,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { l: 0, r: 0, t: 0, b: 0 },
        height: 200,
        width: 200
      }
    };
  };

  const viewAngles = [
    { id: 'front', label: 'Front View', angle: 270, icon: '👕', description: 'Front facing view' },
    { id: 'side', label: 'Side View', angle: 180, icon: '🔄', description: 'Side profile view' },
    { id: 'back', label: 'Back View', angle: 90, icon: '🔙', description: 'Back facing view' },
    { id: 'angle', label: '3/4 Angle', angle: 315, icon: '📐', description: '45° angle view' }
  ];

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
    setIsLoggedIn(false);
    setUserType(null);
    setLoginMode(null);
    setUsername('');
    setPassword('');
    setLoginError('');
    setActiveSection('overview');
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

  // 登录界面
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!loginMode ? (
              <motion.div key="select-mode" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Welcome to CONTEXTUAL</h1>
                  <p className="text-gray-400">Choose your account type</p>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setLoginMode('personal')} className="w-full p-6 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 border-2 border-purple-500/30 rounded-2xl hover:border-purple-500 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500 rounded-xl"><User className="w-6 h-6 text-white" /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Personal User</h3>
                      <p className="text-sm text-gray-400">Virtual try-on & wardrobe</p>
                    </div>
                    <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
                  </div>
                </motion.button>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setLoginMode('enterprise')} className="w-full p-6 bg-gradient-to-br from-cyan-500/20 to-blue-400/20 border-2 border-cyan-500/30 rounded-2xl hover:border-cyan-500 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500 rounded-xl"><Building2 className="w-6 h-6 text-white" /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Enterprise User</h3>
                      <p className="text-sm text-gray-400">Upload & manage products</p>
                    </div>
                    <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
                  </div>
                </motion.button>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setLoginMode('admin')} className="w-full p-6 bg-gradient-to-br from-orange-500/20 to-red-400/20 border-2 border-orange-500/30 rounded-2xl hover:border-orange-500 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500 rounded-xl"><ShieldCheck className="w-6 h-6 text-white" /></div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Administrator</h3>
                      <p className="text-sm text-gray-400">Review & approve products</p>
                    </div>
                    <ChevronRight className="w-6 h-6 ml-auto text-gray-400" />
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="login-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setLoginMode(null); setLoginError(''); setUsername(''); setPassword(''); }} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  Back
                </motion.button>

                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${loginMode === 'personal' ? 'from-purple-500 to-cyan-400' : loginMode === 'enterprise' ? 'from-cyan-500 to-blue-400' : 'from-orange-500 to-red-400'} rounded-2xl flex items-center justify-center`}>
                    {loginMode === 'personal' && <User className="w-10 h-10 text-white" />}
                    {loginMode === 'enterprise' && <Building2 className="w-10 h-10 text-white" />}
                    {loginMode === 'admin' && <ShieldCheck className="w-10 h-10 text-white" />}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {loginMode === 'personal' && 'Personal Login'}
                    {loginMode === 'enterprise' && 'Enterprise Login'}
                    {loginMode === 'admin' && 'Admin Login'}
                  </h2>
                  <p className="text-gray-400">Enter your credentials</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={`MVP${loginMode}`} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
                  </div>

                  {loginError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="text-sm text-red-400">{loginError}</span>
                    </motion.div>
                  )}

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLogin} className={`w-full py-4 rounded-xl font-bold bg-gradient-to-r ${loginMode === 'personal' ? 'from-purple-500 to-cyan-400' : loginMode === 'enterprise' ? 'from-cyan-500 to-blue-400' : 'from-orange-500 to-red-400'} hover:shadow-lg transition-all`}>
                    Sign In
                  </motion.button>

                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                    <p className="text-sm text-cyan-400 font-medium mb-2">Demo Credentials:</p>
                    <p className="text-xs text-gray-400">Username: <span className="text-white font-mono">MVP{loginMode}</span></p>
                    <p className="text-xs text-gray-400">Password: <span className="text-white font-mono">123456</span></p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // 继续第二部分...
  // 主界面
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {userType === 'personal' && 'My Profile'}
                {userType === 'enterprise' && 'Enterprise Dashboard'}
                {userType === 'admin' && 'Admin Panel'}
              </h1>
              <p className="text-gray-400">
                {userType === 'personal' && 'Manage your account and preferences'}
                {userType === 'enterprise' && 'Manage your products and submissions'}
                {userType === 'admin' && 'Review and manage product submissions'}
              </p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl font-medium flex items-center gap-2 transition-all">
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-8 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-3xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <motion.img whileHover={{ scale: 1.05 }} src={userData.avatar} alt={userData.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20" />
              <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-xl">
                {userType === 'personal' && <User className="w-5 h-5 text-white" />}
                {userType === 'enterprise' && <Building2 className="w-5 h-5 text-white" />}
                {userType === 'admin' && <ShieldCheck className="w-5 h-5 text-white" />}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">{userData.membershipTier}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-3">{userData.email}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400">Member since {userData.memberSince}</span>
                </div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowEditProfile(true)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium flex items-center gap-2 transition-all">
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-400">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {userType === 'personal' && (
            <>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('overview')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'overview' ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>Overview</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('wardrobe')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'wardrobe' ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>My Wardrobe</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('history')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'history' ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>Try-On History</motion.button>
            </>
          )}
          {userType === 'enterprise' && (
            <>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('overview')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'overview' ? 'bg-gradient-to-r from-cyan-500 to-blue-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>Dashboard</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('submissions')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'submissions' ? 'bg-gradient-to-r from-cyan-500 to-blue-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>My Submissions</motion.button>
            </>
          )}
          {userType === 'admin' && (
            <>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('overview')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'overview' ? 'bg-gradient-to-r from-orange-500 to-red-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>Dashboard</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('pending')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${activeSection === 'pending' ? 'bg-gradient-to-r from-orange-500 to-red-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
                Pending Reviews
                {uploadSubmissions.filter(s => s.status === 'pending').length > 0 && (
                  <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded-full">{uploadSubmissions.filter(s => s.status === 'pending').length}</span>
                )}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('all')} className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === 'all' ? 'bg-gradient-to-r from-orange-500 to-red-400 text-white' : 'bg-white/5 hover:bg-white/10'}`}>All Submissions</motion.button>
            </>
          )}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {/* Personal User - Overview */}
          {userType === 'personal' && activeSection === 'overview' && (
            <motion.div key="personal-overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    Activity Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Try-Ons</span>
                      <span className="font-bold text-2xl">{userData.totalTryOns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Wardrobe Items</span>
                      <span className="font-bold text-2xl">{wardrobe?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Spent</span>
                      <span className="font-bold text-2xl">£{userData.totalSpent}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-400" />
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                      <Crown className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="font-bold">Fashion Explorer</p>
                        <p className="text-sm text-gray-400">100+ try-ons completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                      <Sparkles className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="font-bold">Style Curator</p>
                        <p className="text-sm text-gray-400">10+ wardrobe items</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Personal User - Wardrobe */}
          {userType === 'personal' && activeSection === 'wardrobe' && (
            <motion.div key="personal-wardrobe" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Shirt className="w-6 h-6 text-purple-400" />
                  My Wardrobe ({wardrobe?.length || 0} items)
                </h3>
                {wardrobe && wardrobe.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wardrobe.map((item) => (
                      <motion.div key={item.id} whileHover={{ scale: 1.05, y: -5 }} className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
                        <div className="aspect-square">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                          <p className="font-bold text-sm mb-1">{item.name}</p>
                          <p className="text-xs text-gray-300">{item.brand}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shirt className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400 mb-4">Your wardrobe is empty</p>
                    <p className="text-sm text-gray-500">Add items from the Explore page</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Personal User - History */}
          {userType === 'personal' && activeSection === 'history' && (
            <motion.div key="personal-history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <History className="w-6 h-6 text-cyan-400" />
                  Try-On History
                </h3>
                <div className="text-center py-12">
                  <History className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400 mb-4">No try-on history yet</p>
                  <p className="text-sm text-gray-500">Start trying on items to see your history</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Enterprise User - Overview */}
          {userType === 'enterprise' && activeSection === 'overview' && (
            <motion.div key="enterprise-overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Upload Management</h3>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUploadModal(true)} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-xl font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New Product
                </motion.button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                    <span className="text-3xl font-bold">{uploadSubmissions.filter(s => s.status === 'approved').length}</span>
                  </div>
                  <p className="text-gray-400">Approved Products</p>
                  <p className="text-sm text-green-400 mt-2">Live on platform</p>
                </div>

                <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold">{uploadSubmissions.filter(s => s.status === 'pending').length}</span>
                  </div>
                  <p className="text-gray-400">Pending Review</p>
                  <p className="text-sm text-yellow-400 mt-2">2-3 business days</p>
                </div>

                <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <X className="w-8 h-8 text-red-400" />
                    <span className="text-3xl font-bold">{uploadSubmissions.filter(s => s.status === 'rejected').length}</span>
                  </div>
                  <p className="text-gray-400">Rejected</p>
                  <p className="text-sm text-red-400 mt-2">Needs revision</p>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-xl font-bold mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {uploadSubmissions.slice(0, 3).map((submission) => (
                    <div key={submission.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <img src={submission.images[0]} alt={submission.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-bold">{submission.name}</p>
                        <p className="text-sm text-gray-400">{submission.submittedDate}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enterprise User - Submissions */}
          {userType === 'enterprise' && activeSection === 'submissions' && (
            <motion.div key="enterprise-submissions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Upload className="w-6 h-6 text-cyan-400" />
                    All Submissions ({uploadSubmissions.length})
                  </h3>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUploadModal(true)} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-xl font-bold flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload New
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {uploadSubmissions.map((submission) => (
                    <motion.div key={submission.id} whileHover={{ scale: 1.01 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                      <div className="flex gap-6">
                        <img src={submission.images[0]} alt={submission.name} className="w-32 h-32 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-xl font-bold mb-1">{submission.name}</h4>
                              <p className="text-gray-400 text-sm mb-2">{submission.brand}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">£{submission.price}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{submission.category}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">Submitted {submission.submittedDate}</span>
                              </div>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                              {submission.status === 'approved' && <Check className="w-4 h-4" />}
                              {submission.status === 'pending' && <Clock className="w-4 h-4" />}
                              {submission.status === 'rejected' && <X className="w-4 h-4" />}
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </div>
                          </div>
                          {submission.description && (
                            <p className="text-gray-400 text-sm mb-3">{submission.description}</p>
                          )}
                          {submission.status === 'rejected' && submission.rejectReason && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                              <p className="text-sm text-red-400">
                                <span className="font-bold">Rejection Reason:</span> {submission.rejectReason}
                              </p>
                            </div>
                          )}
                          {submission.status === 'approved' && (
                            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                              <p className="text-sm text-green-400 flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                This product is now live on the Explore page!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Admin - Overview */}
          {userType === 'admin' && activeSection === 'overview' && (
            <motion.div key="admin-overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-orange-400" />
                    Review Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Reviews</span>
                      <span className="font-bold text-2xl">{uploadSubmissions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Pending</span>
                      <span className="font-bold text-2xl text-yellow-400">{uploadSubmissions.filter(s => s.status === 'pending').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Approval Rate</span>
                      <span className="font-bold text-2xl text-green-400">
                        {uploadSubmissions.length > 0 ? Math.round((uploadSubmissions.filter(s => s.status === 'approved').length / uploadSubmissions.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('pending')} className="w-full p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/20 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-yellow-400" />
                        <span className="font-bold">Review Pending Items</span>
                      </div>
                      <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                        {uploadSubmissions.filter(s => s.status === 'pending').length}
                      </span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveSection('all')} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Eye className="w-6 h-6 text-cyan-400" />
                        <span className="font-bold">View All Submissions</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Admin - Pending Reviews */}
          {userType === 'admin' && activeSection === 'pending' && (
            <motion.div key="admin-pending" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  Pending Reviews ({uploadSubmissions.filter(s => s.status === 'pending').length})
                </h3>
                <div className="space-y-4">
                  {uploadSubmissions.filter(s => s.status === 'pending').map((submission) => (
                    <motion.div key={submission.id} whileHover={{ scale: 1.01 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-yellow-500/30 transition-all">
                      <div className="flex gap-6">
                        <img src={submission.images[0]} alt={submission.name} className="w-32 h-32 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-1">{submission.name}</h4>
                          <p className="text-gray-400 text-sm mb-3">{submission.brand} • £{submission.price} • {submission.category}</p>
                          {submission.description && (
                            <p className="text-gray-400 text-sm mb-4">{submission.description}</p>
                          )}
                          <div className="flex gap-3">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleApproveSubmission(submission.id)} className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-bold flex items-center gap-2 transition-colors">
                              <Check className="w-5 h-5" />
                              Approve
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRejectSubmission(submission.id)} className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-bold flex items-center gap-2 transition-colors">
                              <X className="w-5 h-5" />
                              Reject
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {uploadSubmissions.filter(s => s.status === 'pending').length === 0 && (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400 mb-4">No pending reviews</p>
                      <p className="text-sm text-gray-500">All submissions have been processed</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Admin - All Submissions */}
          {userType === 'admin' && activeSection === 'all' && (
            <motion.div key="admin-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-cyan-400" />
                  All Submissions ({uploadSubmissions.length})
                </h3>
                <div className="space-y-4">
                  {uploadSubmissions.map((submission) => (
                    <motion.div key={submission.id} whileHover={{ scale: 1.01 }} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                      <div className="flex gap-6">
                        <img src={submission.images[0]} alt={submission.name} className="w-32 h-32 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-xl font-bold mb-1">{submission.name}</h4>
                              <p className="text-gray-400 text-sm mb-2">{submission.brand}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">£{submission.price}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{submission.category}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{submission.submittedDate}</span>
                              </div>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${submission.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                              {submission.status === 'approved' && <Check className="w-4 h-4" />}
                              {submission.status === 'pending' && <Clock className="w-4 h-4" />}
                              {submission.status === 'rejected' && <X className="w-4 h-4" />}
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </div>
                          </div>
                          {submission.status === 'pending' && (
                            <div className="flex gap-3 mt-3">
                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleApproveSubmission(submission.id)} className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm">
                                <Check className="w-4 h-4" />
                                Approve
                              </motion.button>
                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRejectSubmission(submission.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm">
                                <X className="w-4 h-4" />
                                Reject
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upload Modal with 3D Models */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setShowUploadModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-3xl border border-white/10 p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Upload className="w-7 h-7 text-cyan-400" />
                  Upload New Product
                </h2>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Product Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Product Name *</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., Premium Leather Jacket" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
                    <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors">
                      <option value="">Select category</option>
                      {availableCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Price (£) *</label>
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Describe your product..." rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none" />
                  </div>

                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-cyan-400 font-medium mb-2">Photo Requirements:</p>
                        <ul className="text-gray-400 space-y-1">
                          <li>• Upload exactly 4 photos (all angles required)</li>
                          <li>• Follow the 3D model reference for angles</li>
                          <li>• Use clear, well-lit photos</li>
                          <li>• Plain background recommended</li>
                          <li>• Min resolution: 800x800px</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Photo Upload with 3D Reference */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Camera className="w-5 h-5 text-purple-400" />
                      Product Photos ({uploadedImages.length}/4)
                    </h3>
                    {uploadedImages.length === 4 && (
                      <div className="px-3 py-1 bg-green-500/20 rounded-full">
                        <span className="text-sm font-bold text-green-400 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Complete
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {viewAngles.map((view, index) => {
                      const shirtData = generateShirtData(view.angle);
                      const hasImage = uploadedImages[index];

                      return (
                        <div key={view.id} className="relative">
                          {!hasImage ? (
                            <label className="block aspect-square rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/50 transition-all cursor-pointer bg-white/5 hover:bg-white/10 overflow-hidden">
                              <div className="h-full flex flex-col items-center justify-center p-3">
                                <div className="mb-2 opacity-50 hover:opacity-100 transition-opacity">
                                  <Plot data={shirtData.data} layout={shirtData.layout} config={{ displayModeBar: false, staticPlot: true }} />
                                </div>
                                
                                <div className="text-center">
                                  <div className="text-2xl mb-1">{view.icon}</div>
                                  <p className="text-xs font-bold mb-1">{view.label}</p>
                                  <p className="text-xs text-gray-500">{view.description}</p>
                                  <div className="mt-2 px-3 py-1 bg-cyan-500/20 rounded-lg">
                                    <Upload className="w-4 h-4 mx-auto text-cyan-400" />
                                  </div>
                                </div>
                              </div>
                              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                          ) : (
                            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-green-500/50">
                              <img src={hasImage.url} alt={view.label} className="w-full h-full object-cover" />
                              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                                <p className="text-xs font-bold text-green-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  {view.label}
                                </p>
                              </div>
                              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setUploadedImages(uploadedImages.filter((_, i) => i !== index)); }} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                                <X className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmitUpload} disabled={uploadedImages.length !== 4 || !productName || !productCategory || !productPrice} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${uploadedImages.length === 4 && productName && productCategory && productPrice ? 'bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-lg hover:shadow-purple-500/50' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
                    <Upload className="w-5 h-5" />
                    Submit for Review
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
