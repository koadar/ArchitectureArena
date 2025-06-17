import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface ComponentNodeData {
  label: string;
  icon?: string;
  color?: string;
}

export default function ComponentNode({ data }: NodeProps<ComponentNodeData>) {
  return (
    <div
      className={`glassmorphism rounded-md border-2 px-2 py-1 text-xs text-white text-center ${
        data.color || 'border-cyan-400'
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        {data.icon && <span className="text-lg leading-none">{data.icon}</span>}
        <span>{data.label}</span>
      </div>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
}
