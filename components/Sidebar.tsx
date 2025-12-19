
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
  const navItems = [
    { id: ToolType.WRITER, label: 'AI Writer', icon: '✍️' },
    { id: ToolType.CODER, label: 'Code Master', icon: '💻' },
    { id: ToolType.VISION, label: 'Visionary', icon: '🎨' },
    { id: ToolType.VOCAL, label: 'Vocalizer', icon: '🎙️' },
    { id: ToolType.DATA, label: 'Data Struct', icon: '📊' },
  ];

  return (
    <aside className="w-20 md:w-64 border-r border-slate-800 glass flex flex-col z-20">
      <div className="p-6">
        <h1 className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Lumina AI
        </h1>
        <div className="md:hidden text-center text-2xl">✨</div>
      </div>

      <nav className="flex-1 px-2 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTool(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${
              activeTool === item.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-xl md:mr-3">{item.icon}</span>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="hidden md:flex items-center space-x-3 p-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-xs">JS</span>
          </div>
          <div>
            <p className="text-xs font-semibold">Micro-SaaS Hub</p>
            <p className="text-[10px] text-slate-500">v1.0.0-beta</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
