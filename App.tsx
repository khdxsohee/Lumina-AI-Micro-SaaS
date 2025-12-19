
import React, { useState } from 'react';
import { ToolType } from './types';
import Sidebar from './components/Sidebar';
import WriterTool from './tools/WriterTool';
import CoderTool from './tools/CoderTool';
import VisionTool from './tools/VisionTool';
import VocalTool from './tools/VocalTool';
import DataTool from './tools/DataTool';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.WRITER);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.WRITER: return <WriterTool />;
      case ToolType.CODER: return <CoderTool />;
      case ToolType.VISION: return <VisionTool />;
      case ToolType.VOCAL: return <VocalTool />;
      case ToolType.DATA: return <DataTool />;
      default: return <WriterTool />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto h-full">
          {renderTool()}
        </div>
      </main>
    </div>
  );
};

export default App;
