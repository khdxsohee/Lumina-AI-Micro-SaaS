
import React, { useState, useRef } from 'react';
import { generateSpeech, decodeAudio, decodeAudioToBuffer } from '../services/geminiService';

const VocalTool: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleSpeak = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const base64 = await generateSpeech(text, voice);
      const rawData = decodeAudio(base64);
      
      if (!audioContextRef.current) {
        // Use 24000 sample rate as recommended for Gemini TTS models
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      }
      
      const buffer = await decodeAudioToBuffer(rawData, audioContextRef.current);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">Vocalizer</h2>
        <p className="text-slate-400 mb-6">Convert any text into high-quality human speech.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select 
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="md:col-span-1 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 focus:outline-none"
          >
            <option value="Kore">Kore (Neutral)</option>
            <option value="Puck">Puck (Fast)</option>
            <option value="Charon">Charon (Deep)</option>
            <option value="Fenrir">Fenrir (Classic)</option>
            <option value="Zephyr">Zephyr (Light)</option>
          </select>
          
          <div className="md:col-span-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              rows={4}
            />
          </div>
        </div>
        
        <button
          onClick={handleSpeak}
          disabled={loading || !text}
          className="px-8 py-4 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 rounded-xl font-bold transition-all w-full flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <span>🔊 Play Audio</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VocalTool;
