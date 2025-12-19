
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const VisionTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">Visionary</h2>
        <p className="text-slate-400 mb-6">Describe an image and see it come to life.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city with purple neon lights..."
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            onClick={handleCreate}
            disabled={loading || !prompt}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl font-bold transition-all whitespace-nowrap"
          >
            {loading ? 'Creating...' : 'Create Art'}
          </button>
        </div>
      </div>

      {imageUrl && (
        <div className="glass p-2 rounded-2xl overflow-hidden group relative">
          <img src={imageUrl} alt="Generated AI Art" className="w-full rounded-xl shadow-2xl" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <a 
              href={imageUrl} 
              download="ai-art.png"
              className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-slate-200"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="flex flex-col items-center justify-center p-20 glass rounded-2xl">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-400 animate-pulse">Dreaming up your visual...</p>
        </div>
      )}
    </div>
  );
};

export default VisionTool;
