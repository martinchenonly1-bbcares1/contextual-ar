import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Wand2, Check, ChevronRight, X } from 'lucide-react';
import { mockData } from '../data';
import ResultDisplay from './ResultDisplay';

const TryOnPage = ({ setCredits, wardrobe }) => {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [selectedScene, setSelectedScene] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scenes = [
    { id: 'snowy', name: 'Snowy Mountain', emoji: '🏔️', gradient: 'from-blue-400 to-cyan-300' },
    { id: 'cyberpunk', name: 'Cyberpunk City', emoji: '🌃', gradient: 'from-purple-500 to-pink-500' },
    { id: 'forest', name: 'Mystic Forest', emoji: '🌲', gradient: 'from-green-500 to-emerald-400' },
  ];

  const toggleGarment = (garment) => {
    if (selectedGarments.find(g => g.id === garment.id)) {
      setSelectedGarments(selectedGarments.filter(g => g.id !== garment.id));
    } else {
      setSelectedGarments([...selectedGarments, garment]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setCredits(prev => prev === '∞' ? '∞' : Math.max(0, prev - 50));
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 3000);
  };

  const resetAll = () => {
    setStep(1);
    setSelectedModel(null);
    setSelectedGarments([]);
    setSelectedScene(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ResultDisplay
        selectedModel={selectedModel}
        selectedGarments={selectedGarments}
        selectedScene={selectedScene}
        onReset={resetAll}
      />
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white'
                      : 'bg-white/10 text-gray-500'
                  }`}
                  animate={{ scale: step === s ? 1.1 : 1 }}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </motion.div>
                <span className={`text-xs mt-2 ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                  {s === 1 ? 'Model' : s === 2 ? 'Outfit' : s === 3 ? 'Scene' : 'Generate'}
                </span>
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  step > s ? 'bg-gradient-to-r from-purple-500 to-cyan-400' : 'bg-white/10'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Model */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Choose Your Model</h2>
              <p className="text-gray-400 mb-6">Select a model or upload your own photo</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Upload Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/50 transition-all overflow-hidden cursor-pointer group"
                >
                  <div className="aspect-[3/4] flex flex-col items-center justify-center p-6 bg-white/5">
                    <Upload className="w-12 h-12 text-gray-400 group-hover:text-cyan-400 transition-colors mb-3" />
                    <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                      Upload Photo
                    </p>
                  </div>
                </motion.div>

                {/* Model Options */}
                {mockData.models.map((model) => (
                  <motion.div
                    key={model.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedModel(model)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedModel?.id === model.id
                        ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-white/5">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {selectedModel?.id === model.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-black" />
                      </motion.div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="font-medium">{model.name}</p>
                      <p className="text-xs text-gray-400">{model.bodyType} • {model.skinTone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectedModel && setStep(2)}
                disabled={!selectedModel}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedModel
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Pick Outfit */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Pick Your Outfit</h2>
              <p className="text-gray-400 mb-6">
                {wardrobe.length === 0 
                  ? 'Add items to your wardrobe first from the Explore page'
                  : `Select items from your wardrobe (${selectedGarments.length} selected)`
                }
              </p>

              {wardrobe.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your wardrobe is empty</h3>
                  <p className="text-gray-400 text-sm mb-6">Add items from the Explore page to get started</p>
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    Go Back
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {wardrobe.map((garment) => {
                      const isSelected = selectedGarments.find(g => g.id === garment.id);
                      
                      return (
                        <motion.div
                          key={garment.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleGarment(garment)}
                          className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                            isSelected
                              ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="aspect-[3/4] bg-white/5">
                            <img
                              src={garment.image}
                              alt={garment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-5 h-5 text-black" />
                            </motion.div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="font-medium text-sm truncate">{garment.name}</p>
                            <p className="text-xs text-gray-400">{garment.brand}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectedGarments.length > 0 && setStep(3)}
                      disabled={selectedGarments.length === 0}
                      className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        selectedGarments.length > 0
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20'
                          : 'bg-white/10 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Step 3: Choose Scene */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Choose Scene</h2>
              <p className="text-gray-400 mb-6">Select the environment for your try-on</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {scenes.map((scene) => (
                  <motion.div
                    key={scene.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedScene(scene)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedScene?.id === scene.id
                        ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className={`aspect-video bg-gradient-to-br ${scene.gradient} flex items-center justify-center`}>
                      <span className="text-6xl">{scene.emoji}</span>
                    </div>

                    {selectedScene?.id === scene.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-black" />
                      </motion.div>
                    )}

                    <div className="p-4 bg-black/50 backdrop-blur-sm">
                      <p className="font-medium text-center">{scene.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectedScene && setStep(4)}
                  disabled={!selectedScene}
                  className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    selectedScene
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Generate */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-2">Review & Generate</h2>
              <p className="text-gray-400 mb-6">Check your selections before generating</p>

              <div className="space-y-4 mb-6">
                {/* Model Summary */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Model</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedModel.image}
                      alt={selectedModel.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{selectedModel.name}</p>
                      <p className="text-xs text-gray-400">{selectedModel.bodyType}</p>
                    </div>
                  </div>
                </div>

                {/* Garments Summary */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Outfit ({selectedGarments.length} items)</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedGarments.map((garment) => (
                      <div key={garment.id} className="relative group">
                        <img
                          src={garment.image}
                          alt={garment.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <p className="text-xs text-center px-1">{garment.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scene Summary */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Scene</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedScene.gradient} flex items-center justify-center text-2xl`}>
                      {selectedScene.emoji}
                    </div>
                    <p className="font-medium">{selectedScene.name}</p>
                  </div>
                </div>

                {/* Cost */}
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-xl border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Generation Cost</span>
                    <span className="font-mono font-bold text-lg">50 CR</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TryOnPage;
