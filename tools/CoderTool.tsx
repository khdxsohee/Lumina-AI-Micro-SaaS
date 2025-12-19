
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';

const CoderTool: React.FC = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code) return;
    setLoading(true);
    try {
      // isComplex: true ensures the Pro model is used for coding tasks
      const response = await generateText(
        `Explain this code and suggest 3 optimizations:\n\n\`\`\`\n${code}\n\`\`\``,
        "You are a senior software engineer. Provide technical, accurate, and helpful code reviews.",
        true
      );
      setExplanation(response || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">Code Master</h2>
        <p className="text-slate-400 mb-6">Paste your code for instant explanation and optimization.</p>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste code snippet here..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-mono text-blue-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[200px]"
        />
        
        <button
          onClick={handleAnalyze}
          disabled={loading || !code}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-bold transition-all w-full md:w-auto"
        >
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>

      {explanation && (
        <div className="glass p-6 rounded-2xl prose prose-invert max-w-none">
          <div className="text-slate-200 whitespace-pre-wrap">{explanation}</div>
        </div>
      )}
    </div>
  );
};

export default CoderTool;
