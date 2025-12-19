
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';

const DataTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [json, setJson] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStructure = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const response = await generateText(
        `Convert the following unstructured text into a clean JSON object. Ensure it's valid JSON only. Text:\n\n${input}`,
        "You are a data engineer. Extract key entities and relationships from text and output them as a JSON structure. Only return the JSON block."
      );
      setJson(response || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Data Struct</h2>
        <p className="text-slate-400 mb-6">Turn messy notes into structured JSON data.</p>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="E.g. John Doe is a developer at Apple. He lives in San Francisco and earns $150k..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[150px]"
        />
        
        <button
          onClick={handleStructure}
          disabled={loading || !input}
          className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl font-bold transition-all"
        >
          {loading ? 'Structuring...' : 'Generate JSON'}
        </button>
      </div>

      {json && (
        <div className="glass p-6 rounded-2xl shadow-xl overflow-x-auto">
          <pre className="text-emerald-400 text-sm">{json}</pre>
        </div>
      )}
    </div>
  );
};

export default DataTool;
