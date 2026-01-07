import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Grid3x3, List, Search, Filter } from 'lucide-react';

const WardrobePage = ({ wardrobe, setWardrobe }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // 获取所有唯一的分类
  const categories = ['all', ...new Set(wardrobe.map(item => {
    // 从 id 中提取分类（例如 'men-suit-1' -> 'men'）
    return item.id.split('-')[0];
  }))];

  // 过滤衣服
  const filteredWardrobe = wardrobe.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.id.startsWith(filterCategory);
    return matchesSearch && matchesCategory;
  });

  const removeFromWardrobe = (itemId) => {
    setWardrobe(wardrobe.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wardrobe</h1>
        <p className="text-gray-400">
          {wardrobe.length} {wardrobe.length === 1 ? 'item' : 'items'} in your collection
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-black">
                {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white/5 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                : 'hover:bg-white/10'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                : 'hover:bg-white/10'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filteredWardrobe.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 flex items-center justify-center">
              <Grid3x3 className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {wardrobe.length === 0 ? 'Your wardrobe is empty' : 'No items found'}
            </h3>
            <p className="text-gray-400 text-sm">
              {wardrobe.length === 0 
                ? 'Start adding items from the Explore page' 
                : 'Try adjusting your search or filter'}
            </p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredWardrobe.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-red-400/50 transition-all"
              >
                {/* Image */}
                <div className="aspect-[3/4] bg-white/5 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromWardrobe(item.id)}
                  className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg backdrop-blur-sm transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>

                {/* Info */}
                <div className="p-4 bg-black/50 backdrop-blur-sm">
                  <h3 className="font-medium text-sm mb-1 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{item.brand}</p>
                  <span className="text-cyan-400 font-mono font-bold">£{item.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredWardrobe.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all"
              >
                {/* Image */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{item.brand}</p>
                  <span className="text-cyan-400 font-mono font-bold">£{item.price}</span>
                </div>

                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromWardrobe(item.id)}
                  className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WardrobePage;
