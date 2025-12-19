
// Import React to fix "Cannot find namespace 'React'"
import React from 'react';

export enum ToolType {
  WRITER = 'writer',
  CODER = 'coder',
  VISION = 'vision',
  VOCAL = 'vocal',
  DATA = 'data'
}

export interface ToolMetadata {
  id: ToolType;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
