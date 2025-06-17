import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Eye, EyeOff, Lightbulb, BookOpen, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Challenge } from '@shared/schema';
import EditorialPanel from './EditorialPanel';
// Editorial panel is now integrated inline

interface DesignCanvasProps {
  architecture: any;
  onChange: (architecture: any) => void;
  challenge: Challenge;
}

// Custom node types
const nodeTypes = {
  // We'll use default nodes for now, but can extend later
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 100 },
    data: { label: 'API Gateway' },
    style: {
      background: 'rgba(0, 209, 255, 0.1)',
      border: '2px solid #00D1FF',
      borderRadius: '8px',
      color: '#fff',
    },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 250 },
    data: { label: 'Database' },
    style: {
      background: 'rgba(255, 0, 140, 0.1)',
      border: '2px solid #FF008C',
      borderRadius: '8px',
      color: '#fff',
    },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 250 },
    data: { label: 'Cache' },
    style: {
      background: 'rgba(255, 255, 0, 0.1)',
      border: '2px solid #FFFF00',
      borderRadius: '8px',
      color: '#fff',
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    style: { stroke: '#00D1FF', strokeWidth: 2 },
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    style: { stroke: '#FF008C', strokeWidth: 2 },
    animated: true,
  },
];

function DesignCanvasInner({ architecture, onChange, challenge }: DesignCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(architecture?.nodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(architecture?.edges || initialEdges);
  const [loadSlider, setLoadSlider] = useState([25]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [showEditorial, setShowEditorial] = useState(false);
  const [simulationMetrics, setSimulationMetrics] = useState({
    latency: 45,
    throughput: 2.5,
    cost: 12.34
  });
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Update parent component when nodes or edges change
  React.useEffect(() => {
    onChange({ nodes, edges });
  }, [nodes, edges, onChange]);

  // Auto-complete mutation
  const autoCompleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/challenges/${challenge.id}/auto-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to auto-complete');
      }
      return response.json();
    },
    onSuccess: (data: any) => {
      if (data.architecture) {
        setNodes(data.architecture.nodes || []);
        setEdges(data.architecture.edges || []);
        toast({
          title: "Architecture Auto-Completed",
          description: "Optimal architecture has been generated for this challenge.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Auto-Complete Failed",
        description: "Could not generate architecture. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit solution mutation
  const submitSolutionMutation = useMutation({
    mutationFn: async (data: any) => {
      return await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: challenge.id,
          architecture: { nodes, edges },
          status: "SUBMITTED",
        }),
      }).then(res => res.json());
    },
    onSuccess: () => {
      toast({
        title: "Solution Submitted",
        description: "Your architecture has been submitted for evaluation.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });
    },
  });

  const handleApplyOptimalSolution = (optimalArchitecture: any) => {
    if (optimalArchitecture?.nodes && optimalArchitecture?.edges) {
      setNodes(optimalArchitecture.nodes);
      setEdges(optimalArchitecture.edges);
      toast({
        title: "Solution Applied",
        description: "The optimal architecture has been loaded to your canvas.",
      });
    }
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    
    // Animate metrics during simulation
    const interval = setInterval(() => {
      setSimulationMetrics({
        latency: Math.max(10, Math.floor(45 + (Math.random() - 0.5) * 40)),
        throughput: Math.max(0.5, (2.5 + (Math.random() - 0.5) * 2)),
        cost: Math.max(5, (12.34 + (Math.random() - 0.5) * 10))
      });
    }, 200);
    
    // Stop simulation after 3 seconds
    setTimeout(() => {
      setSimulationRunning(false);
      clearInterval(interval);
      // Reset to stable values
      setSimulationMetrics({
        latency: 45,
        throughput: 2.5,
        cost: 12.34
      });
    }, 3000);
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow-label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: `${Date.now()}`,
        type: 'default',
        position,
        data: { label },
        style: {
          background: 'rgba(0, 209, 255, 0.1)',
          border: '2px solid #00D1FF',
          borderRadius: '8px',
          color: '#fff',
          padding: '10px',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="h-full flex">
      {/* Main Canvas */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <EditorialPanel
          challenge={challenge}
          onClose={() => setShowEditorial(false)}
          isVisible={showEditorial}
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-900"
        >
          <Controls className="!bg-gray-800 !border-gray-700" />
          <MiniMap 
            className="!bg-gray-800 !border-gray-700" 
            nodeColor="#00D1FF"
            maskColor="rgba(0, 0, 0, 0.8)"
          />
          <Background 
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#00D1FF"
            className="opacity-20"
          />
        </ReactFlow>
      </div>

      {/* Simulation Panel */}
      <div className="w-80 bg-gray-800/50 border-l border-gray-700 p-4 flex flex-col">
        <Card className="glassmorphism mb-4">
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Simulation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Latency</span>
              <span className="text-sm font-mono text-green-400">
                {simulationMetrics.latency}ms
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Throughput</span>
              <span className="text-sm font-mono text-cyan-400">
                {simulationMetrics.throughput.toFixed(1)}K req/s
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cost/hour</span>
              <span className="text-sm font-mono text-pink-500">
                ${simulationMetrics.cost.toFixed(2)}
              </span>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-xs mb-2">
                <span>Load Test</span>
                <span>1K → 100K users</span>
              </div>
              <Slider
                value={loadSlider}
                onValueChange={setLoadSlider}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1K</span>
                <span>100K</span>
              </div>
            </div>

            <Button
              onClick={runSimulation}
              className="w-full btn-cyber"
              disabled={simulationRunning}
            >
              {simulationRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Simulating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Run Simulation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Auto-Complete Actions */}
        <Card className="glassmorphism mb-4">
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <Wand2 className="w-4 h-4 mr-2 text-purple-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => autoCompleteMutation.mutate()}
              disabled={autoCompleteMutation.isPending}
              className="w-full btn-cyber"
              variant="outline"
            >
              {autoCompleteMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Auto-Complete Architecture
                </>
              )}
            </Button>
            
            <Button
              onClick={() => setShowEditorial(!showEditorial)}
              className="w-full btn-cyber"
              variant="outline"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showEditorial ? 'Hide Hints' : 'Show Hints'}
            </Button>
          </CardContent>
        </Card>

        {/* Challenge Info */}
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-sm">Challenge Info</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2 text-white bg-slate-800/50 p-2 rounded">{challenge.title}</h3>
            <p className="text-xs text-gray-300 mb-4 bg-slate-800/30 p-2 rounded">{challenge.description}</p>
            
              {Boolean(challenge.constraints) && (
                <div>
                  <h4 className="text-xs font-semibold mb-2 text-cyan-400">Constraints:</h4>
                  <div className="text-xs text-gray-300 bg-gray-800 p-2 rounded">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(challenge.constraints as any, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DesignCanvas(props: DesignCanvasProps) {
  return (
    <ReactFlowProvider>
      <DesignCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
