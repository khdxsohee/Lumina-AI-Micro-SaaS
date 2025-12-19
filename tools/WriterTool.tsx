
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';

const WriterTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const text = await generateText(
        `Write highly engaging and professional content based on this: ${prompt}`,
        "You are an expert copywriter and content strategist. Generate clear, concise, and SEO-friendly content."
      );
      setResult(text || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="glass p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2">AI Writer</h2>
        <p className="text-slate-400 mb-6">Create blogs, tweets, and emails instantly.</p>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g. A blog post about React 19 features..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[150px]"
        />
        
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-bold transition-all w-full md:w-auto"
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </button>
      </div>

      {result && (
        <div className="glass p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
};

export default WriterTool;
