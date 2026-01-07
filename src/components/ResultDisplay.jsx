import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, RotateCcw, Sparkles, ShoppingBag, X } from 'lucide-react';
import { mockData } from '../data';

const ResultDisplay = ({ selectedModel, selectedGarments, selectedScene, onReset }) => {
  const [showComparison, setShowComparison] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // 获取场景对应的结果图片
  const resultImage = mockData.results[selectedScene.id];

  // 计算总价
  const totalPrice = selectedGarments.reduce((sum, garment) => sum + garment.price, 0);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Virtual Try-On</h1>
            <p className="text-gray-400">AI-generated result in {selectedScene.name}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Result Image */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src={resultImage}
                alt="Try-on result"
                className="w-full aspect-[3/4] object-cover"
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">AI Generated</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
              >
                <Download className="w-5 h-5" />
                Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share
              </motion.button>
            </div>

            {/* Comparison Toggle */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowComparison(!showComparison)}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 hover:from-purple-500/30 hover:to-cyan-400/30 rounded-xl border border-purple-500/30 transition-all"
            >
              {showComparison ? 'Hide' : 'Show'} Before/After Comparison
            </motion.button>

            {/* Before/After Comparison */}
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={mockData.beforeImage}
                    alt="Before"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="p-2 bg-black/50 backdrop-blur-sm text-center">
                    <span className="text-sm font-medium">Before</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={resultImage}
                    alt="After"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="p-2 bg-black/50 backdrop-blur-sm text-center">
                    <span className="text-sm font-medium">After</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Details Panel */}
          <div className="space-y-6">
            {/* Model Info */}
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">Model Details</h3>
              <div className="flex items-center gap-4">
                <img
                  src={selectedModel.image}
                  alt={selectedModel.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <p className="font-medium">{selectedModel.name}</p>
                  <p className="text-sm text-gray-400">{selectedModel.bodyType} • {selectedModel.skinTone}</p>
                </div>
              </div>
            </div>

            {/* Outfit Details */}
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Outfit Details</h3>
                <span className="text-sm text-gray-400">{selectedGarments.length} items</span>
              </div>

              <div className="space-y-3">
                {selectedGarments.map((garment) => (
                  <div key={garment.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <img
                      src={garment.image}
                      alt={garment.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{garment.name}</p>
                      <p className="text-xs text-gray-400">{garment.brand}</p>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold">£{garment.price}</span>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-medium">Total Value</span>
                <span className="text-xl font-bold text-cyan-400">£{totalPrice}</span>
              </div>
            </div>

            {/* Scene Info */}
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">Scene</h3>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedScene.gradient} flex items-center justify-center text-2xl`}>
                  {selectedScene.emoji}
                </div>
                <p className="font-medium">{selectedScene.name}</p>
              </div>
            </div>

            {/* Purchase CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPurchaseModal(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-400/20 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Purchase This Outfit - £{totalPrice}
            </motion.button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-bold text-cyan-400">{selectedGarments.length}</p>
                <p className="text-xs text-gray-400 mt-1">Items</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-bold text-purple-400">50</p>
                <p className="text-xs text-gray-400 mt-1">Credits Used</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-bold text-pink-400">98%</p>
                <p className="text-xs text-gray-400 mt-1">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowPurchaseModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Purchase Outfit</h2>
                <p className="text-sm text-gray-400 mt-1">Complete your order</p>
              </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedGarments.map((garment) => (
                <div key={garment.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <img
                    src={garment.image}
                    alt={garment.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{garment.name}</p>
                    <p className="text-xs text-gray-400">{garment.brand}</p>
                  </div>
                  <span className="text-cyan-400 font-mono font-bold">£{garment.price}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-xl border border-purple-500/30">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold text-cyan-400">£{totalPrice}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-400/20 transition-all"
            >
              Proceed to Checkout
            </motion.button>

            <p className="text-xs text-center text-gray-500">
              Secure payment powered by Stripe
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ResultDisplay;
