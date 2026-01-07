import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, Check } from 'lucide-react';
import { exploreData } from '../data';

const ExplorePage = ({ wardrobe, setWardrobe }) => {
  const [selectedGender, setSelectedGender] = useState('men');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = exploreData[selectedGender];

  const toggleWardrobe = (item) => {
    const isInWardrobe = wardrobe.some(w => w.id === item.id);
    if (isInWardrobe) {
      setWardrobe(wardrobe.filter(w => w.id !== item.id));
    } else {
      setWardrobe([...wardrobe, item]);
    }
  };

  const isInWardrobe = (itemId) => wardrobe.some(w => w.id === itemId);

  return (
    <div className="flex h-[calc(100vh-160px)]">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 overflow-y-auto scrollbar-hide">
        {/* Gender Toggle */}
        <div className="p-4 border-b border-white/10">
          <div className="flex gap-2 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => {
                setSelectedGender('men');
                setSelectedCategory(null);
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedGender === 'men'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              For Men
            </button>
            <button
              onClick={() => {
                setSelectedGender('women');
                setSelectedCategory(null);
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedGender === 'women'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              For Women
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="p-2">
          {Object.keys(categories).map((category) => (
            <motion.button
              key={category}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedCategory(category)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-1 transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-400/20 border border-purple-500/30'
                  : 'hover:bg-white/5'
              }`}
            >
              <span className={`text-sm font-medium ${
                selectedCategory === category ? 'text-white' : 'text-gray-400'
              }`}>
                {category}
              </span>
              <ChevronRight className={`w-4 h-4 transition-colors ${
                selectedCategory === category ? 'text-cyan-400' : 'text-gray-600'
              }`} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 flex items-center justify-center">
                  <ChevronRight className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Select a Category</h3>
                <p className="text-gray-400 text-sm">Choose from the sidebar to explore items</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">{selectedCategory}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories[selectedCategory].map((item) => {
                  const inWardrobe = isInWardrobe(item.id);
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all"
                    >
                      {/* Image */}
                      <div className="aspect-[3/4] bg-white/5 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4 bg-black/50 backdrop-blur-sm">
                        <h3 className="font-medium text-sm mb-1 truncate">{item.name}</h3>
                        <p className="text-xs text-gray-400 mb-2">{item.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-400 font-mono font-bold">£{item.price}</span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleWardrobe(item)}
                            className={`p-2 rounded-lg transition-all ${
                              inWardrobe
                                ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            {inWardrobe ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExplorePage;
