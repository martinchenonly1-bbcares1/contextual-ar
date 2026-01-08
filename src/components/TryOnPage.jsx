import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import localforage from 'localforage';
import { 
  Upload, Camera, Sparkles, Zap, X, Check, 
  Shirt, Download, Share2, Award, ChevronRight,
  AlertCircle, Loader, MapPin
} from 'lucide-react';

// 配置 localforage（用于存储大文件）
localforage.config({
  name: 'ContextualApp',
  storeName: 'tryonData'
});

const TryOnPage = ({ setCredits, wardrobe }) => {
  const [mode, setMode] = useState(() => {
    return sessionStorage.getItem('tryonMode') || 'photo';
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedScene, setSelectedScene] = useState(() => {
    const saved = sessionStorage.getItem('tryonScene');
    return saved ? parseInt(saved) : null;
  });
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = sessionStorage.getItem('tryonItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);

  const virtualScenes = [
    {
      id: 1,
      name: 'City Street',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
      description: 'Urban downtown setting',
      icon: '🏙️'
    },
    {
      id: 2,
      name: 'Beach Resort',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      description: 'Tropical beach paradise',
      icon: '🏖️'
    },
    {
      id: 3,
      name: 'Luxury Mall',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
      description: 'High-end shopping center',
      icon: '🛍️'
    }
  ];

  // 从 IndexedDB 加载照片
  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const savedPhoto = await localforage.getItem('tryonPhoto');
        if (savedPhoto) {
          setSelectedPhoto(savedPhoto);
        }
      } catch (error) {
        console.error('Error loading photo:', error);
      } finally {
        setIsLoadingPhoto(false);
      }
    };
    loadPhoto();
  }, []);

  // 保存模式到 sessionStorage
  useEffect(() => {
    sessionStorage.setItem('tryonMode', mode);
  }, [mode]);

  // 保存场景到 sessionStorage
  useEffect(() => {
    if (selectedScene) {
      sessionStorage.setItem('tryonScene', selectedScene.toString());
    } else {
      sessionStorage.removeItem('tryonScene');
    }
  }, [selectedScene]);

  // 保存选中的物品到 sessionStorage
  useEffect(() => {
    if (selectedItems.length > 0) {
      sessionStorage.setItem('tryonItems', JSON.stringify(selectedItems));
    } else {
      sessionStorage.removeItem('tryonItems');
    }
  }, [selectedItems]);

  // 压缩图片函数
  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 按比例缩放
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // 转换为压缩后的 base64
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoadingPhoto(true);

        // 显示加载状态
        const loadingToast = document.createElement('div');
        loadingToast.id = 'loading-toast';
        loadingToast.className = 'fixed top-4 right-4 bg-purple-500 text-white px-6 py-3 rounded-xl z-50 shadow-lg';
        loadingToast.innerHTML = `
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Compressing image...</span>
          </div>
        `;
        document.body.appendChild(loadingToast);

        // 压缩图片
        const compressedImage = await compressImage(file, 1200, 0.8);
        
        // 保存到 IndexedDB
        await localforage.setItem('tryonPhoto', compressedImage);
        
        setSelectedPhoto(compressedImage);
        setUploadedFile(file);

        // 移除加载提示
        const toast = document.getElementById('loading-toast');
        if (toast) document.body.removeChild(toast);

        // 显示成功提示
        const successToast = document.createElement('div');
        successToast.id = 'success-toast';
        successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl z-50 shadow-lg';
        successToast.innerHTML = `
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Image uploaded successfully!</span>
          </div>
        `;
        document.body.appendChild(successToast);
        setTimeout(() => {
          const toast = document.getElementById('success-toast');
          if (toast) document.body.removeChild(toast);
        }, 2000);

      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try a smaller file.');
      } finally {
        setIsLoadingPhoto(false);
      }
    }
  };

  const handleItemToggle = (item) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleTryOn = () => {
    if (mode === 'photo' && !selectedPhoto) {
      alert('Please upload a photo');
      return;
    }
    if (mode === 'scene' && !selectedScene) {
      alert('Please select a virtual scene');
      return;
    }
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const creditsUsed = selectedItems.length * 10;
      setCredits(prev => prev === '∞' ? '∞' : Math.max(0, prev - creditsUsed));
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleReset = async () => {
    setShowResults(false);
    setSelectedPhoto(null);
    setSelectedScene(null);
    setSelectedItems([]);
    setUploadedFile(null);
    
    // 清除所有存储
    await localforage.removeItem('tryonPhoto');
    sessionStorage.removeItem('tryonScene');
    sessionStorage.removeItem('tryonItems');
  };

  const handleRemovePhoto = async () => {
    setSelectedPhoto(null);
    setUploadedFile(null);
    await localforage.removeItem('tryonPhoto');
  };

  const handleDownload = () => {
    alert('Download feature coming soon!');
  };

  const handleShare = () => {
    alert('Share feature coming soon!');
  };

  const resultImage = mode === 'photo' ? selectedPhoto : virtualScenes.find(s => s.id === selectedScene)?.image;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Virtual Try-On
          </h1>
          <p className="text-gray-400">Upload your photo or choose a virtual scene</p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Mode Selector */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex gap-4 mb-8"
>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => {
      setMode('photo');
      setSelectedScene(null);
      // 保留照片，不清除
    }}
    className={`flex-1 p-6 rounded-2xl border-2 transition-all ${
      mode === 'photo'
        ? 'border-purple-500 bg-purple-500/20'
        : 'border-white/10 bg-white/5 hover:border-white/30'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${mode === 'photo' ? 'bg-purple-500' : 'bg-white/10'}`}>
        <Camera className="w-6 h-6" />
      </div>
      <div className="text-left">
        <h3 className="font-bold text-lg">Upload Photo</h3>
        <p className="text-sm text-gray-400">Use your own photo</p>
        {selectedPhoto && mode !== 'photo' && (
          <p className="text-xs text-green-400 mt-1">✓ Photo saved</p>
        )}
      </div>
    </div>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => {
      setMode('scene');
      // 不清除照片，保持状态
    }}
    className={`flex-1 p-6 rounded-2xl border-2 transition-all ${
      mode === 'scene'
        ? 'border-cyan-500 bg-cyan-500/20'
        : 'border-white/10 bg-white/5 hover:border-white/30'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${mode === 'scene' ? 'bg-cyan-500' : 'bg-white/10'}`}>
        <MapPin className="w-6 h-6" />
      </div>
      <div className="text-left">
        <h3 className="font-bold text-lg">Virtual Scene</h3>
        <p className="text-sm text-gray-400">Try AI-generated scenes</p>
        {selectedScene && mode !== 'scene' && (
          <p className="text-xs text-cyan-400 mt-1">✓ Scene selected</p>
        )}
      </div>
    </div>
  </motion.button>
</motion.div>


            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Photo Upload or Scene Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {mode === 'photo' ? (
                      <>
                        <Camera className="w-6 h-6 text-cyan-400" />
                        Upload Your Photo
                      </>
                    ) : (
                      <>
                        <MapPin className="w-6 h-6 text-cyan-400" />
                        Choose Virtual Scene
                      </>
                    )}
                  </h2>

                  {mode === 'photo' ? (
                    // Photo Upload Mode
                    isLoadingPhoto ? (
                      <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-gray-400">Loading photo...</p>
                        </div>
                      </div>
                    ) : !selectedPhoto ? (
                      <label className="block aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/50 transition-all cursor-pointer bg-white/5 hover:bg-white/10">
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                          <div className="w-20 h-20 mb-4 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                            <Upload className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Upload a Photo</h3>
                          <p className="text-sm text-gray-400 mb-4">
                            Choose a clear, full-body photo for best results
                          </p>
                          <div className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl font-bold">
                            Choose File
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Photo will be saved automatically
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-cyan-400/50"
                        >
                          <img
                            src={selectedPhoto}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleRemovePhoto}
                          className="absolute top-4 right-4 p-2 bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                        <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10">
                          <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-medium">Photo saved & ready</span>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    // Virtual Scene Mode
                    <div className="space-y-4">
                      {virtualScenes.map((scene) => (
                        <motion.button
                          key={scene.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedScene(scene.id)}
                          className={`w-full relative rounded-2xl overflow-hidden border-2 transition-all ${
                            selectedScene === scene.id
                              ? 'border-cyan-500 shadow-lg shadow-cyan-500/50'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="aspect-video relative">
                            <img
                              src={scene.image}
                              alt={scene.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{scene.icon}</span>
                                <div className="text-left">
                                  <h3 className="font-bold text-lg">{scene.name}</h3>
                                  <p className="text-sm text-gray-300">{scene.description}</p>
                                </div>
                              </div>
                            </div>
                            {selectedScene === scene.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 right-4 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center"
                              >
                                <Check className="w-6 h-6 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl"
                >
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      {mode === 'photo' ? (
                        <>
                          <p className="text-cyan-400 font-medium mb-1">Tips for best results:</p>
                          <ul className="text-gray-400 space-y-1">
                            <li>• Use a clear, well-lit photo</li>
                            <li>• Stand straight facing the camera</li>
                            <li>• Wear fitted clothing</li>
                            <li>• Plain background works best</li>
                            <li>• Photo is saved automatically</li>
                          </ul>
                        </>
                      ) : (
                        <>
                          <p className="text-cyan-400 font-medium mb-1">Virtual Scene Mode:</p>
                          <p className="text-gray-400">
                            AI will generate a realistic model wearing your selected items in the chosen environment. Perfect for visualizing outfits in different settings!
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Item Selection */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Shirt className="w-6 h-6 text-purple-400" />
                      Select Items
                    </h2>
                    {selectedItems.length > 0 && (
                      <div className="px-3 py-1 bg-purple-500/20 rounded-full">
                        <span className="text-sm font-bold text-purple-400">
                          {selectedItems.length} selected
                        </span>
                      </div>
                    )}
                  </div>

                  {wardrobe && wardrobe.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                      {wardrobe.map((item) => {
                        const isSelected = selectedItems.find(i => i.id === item.id);
                        return (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleItemToggle(item)}
                            className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                              isSelected
                                ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <div className="aspect-square">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
                              >
                                <Check className="w-5 h-5 text-white" />
                              </motion.div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.brand}</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center">
                        <Shirt className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-400 mb-4">Your wardrobe is empty</p>
                      <p className="text-sm text-gray-500">
                        Add items from Explore page to try them on
                      </p>
                    </div>
                  )}
                </div>

                {/* Cost Info */}
                {selectedItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Credits Required</p>
                          <p className="text-xl font-bold text-purple-400">
                            {selectedItems.length * 10} CR
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">10 CR per item</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Try On Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTryOn}
                  disabled={
                    (mode === 'photo' && !selectedPhoto) ||
                    (mode === 'scene' && !selectedScene) ||
                    selectedItems.length === 0 ||
                    isProcessing
                  }
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    (mode === 'photo' && !selectedPhoto) ||
                    (mode === 'scene' && !selectedScene) ||
                    selectedItems.length === 0 ||
                    isProcessing
                      ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-lg hover:shadow-purple-500/50'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Generate Try-On
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </>
        ) : (
          /* Results Display */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* Success Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full mb-4">
                <Check className="w-5 h-5 text-green-400" />
                <span className="font-bold text-green-400">Try-On Complete!</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Here's Your Look</h2>
              <p className="text-gray-400">
                {mode === 'photo' ? 'AI-powered virtual try-on result' : 'AI-generated virtual scene'}
              </p>
            </motion.div>

            {/* Result Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/20"
            >
              <img
                src={resultImage}
                alt="Try-on result"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl border border-cyan-400/30">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-cyan-400">AI Generated</span>
                </div>
              </div>
              {mode === 'scene' && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl border border-purple-400/30">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-bold text-purple-400">
                      {virtualScenes.find(s => s.id === selectedScene)?.name}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Shirt className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-400">Items</span>
                </div>
                <p className="text-2xl font-bold">{selectedItems.length}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm text-gray-400">Credits Used</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">{selectedItems.length * 10}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Award className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-400">Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-green-400">98.5%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400">CO₂ Saved</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">0.3%</p>
              </motion.div>
            </div>

            {/* Eco-Friendly Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Eco-Friendly Virtual Try-On
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    By using virtual try-on, you've helped reduce carbon emissions by{' '}
                    <span className="font-bold text-emerald-400">0.3%</span> compared to traditional in-store shopping. 
                    Every virtual try-on saves approximately{' '}
                    <span className="font-bold text-emerald-400">2.5kg of CO₂</span>! 🌍
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Items Used */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-5 bg-white/5 rounded-2xl border border-white/10"
            >
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Shirt className="w-5 h-5 text-purple-400" />
                Items Used in This Try-On
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {selectedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share
              </motion.button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-medium transition-all flex items-center justify-center gap-2"
            >
              Try Another Look
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Processing Overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">AI Processing</h3>
                <p className="text-gray-400 mb-6">
                  {mode === 'photo' ? 'Creating your virtual try-on...' : 'Generating virtual scene...'}
                </p>
                <div className="flex gap-2 justify-center">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-3 h-3 bg-cyan-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TryOnPage;
