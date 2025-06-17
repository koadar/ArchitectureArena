import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import DesignCanvas from "@/components/DesignCanvas";
import ComponentLibrary from "@/components/ComponentLibrary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Link } from "wouter";
import type { Challenge, Battle } from "@shared/schema";

export default function Challenge() {
  const { id } = useParams();
  const challengeId = parseInt(id!);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [architecture, setArchitecture] = useState<any>(null);
  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null);


  const { data: challenge, isLoading: challengeLoading } = useQuery<Challenge>({
    queryKey: [`/api/challenges/${challengeId}`],
  });

  const { data: userBattles = [] } = useQuery<Battle[]>({
    queryKey: ["/api/battles/user"],
  });

  // Check for existing active battle
  useEffect(() => {
    const activeBattle = userBattles.find(
      (battle: Battle) => battle.challengeId === challengeId && battle.status === "ACTIVE"
    );
    if (activeBattle) {
      setCurrentBattle(activeBattle);
      if (activeBattle.startedAt && challenge) {
        const startTime = new Date(activeBattle.startedAt).getTime();
        const timeLimit = challenge.timeLimit * 60 * 1000; // Convert to milliseconds
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, timeLimit - elapsed);
        setTimeLeft(Math.floor(remaining / 1000));
      }
      if (activeBattle.architecture) {
        setArchitecture(activeBattle.architecture);
      }
    }
  }, [userBattles, challengeId, challenge]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentBattle) {
      // Auto-submit when time runs out
      handleSubmit();
    }
  }, [timeLeft, currentBattle]);

  const startBattleMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/battles", {
        challengeId,
        status: "ACTIVE",
      });
      return response.json();
    },
    onSuccess: (battle: Battle) => {
      setCurrentBattle(battle);
      if (challenge) {
        setTimeLeft(challenge.timeLimit * 60);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/battles/user"] });
      toast({
        title: "Battle Started!",
        description: "The timer has begun. Good luck, architect!",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to start battle. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateBattleMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PATCH", `/api/battles/${currentBattle!.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/battles/user"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
    },
  });

  const handleStartBattle = () => {
    startBattleMutation.mutate();
  };

  const handleSave = () => {
    if (currentBattle && architecture) {
      updateBattleMutation.mutate({
        architecture,
      });
      toast({
        title: "Progress Saved",
        description: "Your architecture has been saved.",
      });
    }
  };

  const handleSubmit = () => {
    if (currentBattle) {
      const timeSpent = challenge ? (challenge.timeLimit * 60) - timeLeft : 0;
      updateBattleMutation.mutate({
        status: "COMPLETED",
        completedAt: new Date().toISOString(),
        timeSpent,
        architecture,
        score: calculateScore(),
      });
      toast({
        title: "Battle Completed!",
        description: "Your solution has been submitted for evaluation.",
      });
    }
  };

  const calculateScore = () => {
    // Simple scoring algorithm based on components used and time taken
    if (!architecture) return 0;
    const componentsCount = architecture.nodes?.length || 0;
    const timeBonus = Math.max(0, timeLeft / 60);
    return Math.floor(componentsCount * 10 + timeBonus * 5);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY': return 'bg-green-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'HARD': return 'bg-red-500';
      case 'BOSS': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (challengeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <NavBar />
        <div className="pt-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading challenge...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <NavBar />
        <div className="pt-20 px-4 flex items-center justify-center">
          <Card className="card-cyber">
            <CardContent className="p-6 text-center">
              <h1 className="text-2xl font-bold mb-2">Challenge Not Found</h1>
              <p className="text-gray-400">The requested challenge could not be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <NavBar />
      
      <div className="pt-20">
        {/* Challenge Header */}
        <div className="bg-gray-800/50 border-b border-gray-700 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">{challenge.title}</h1>
              <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                {challenge.difficulty}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {currentBattle && (
                <div className="flex items-center space-x-2 text-lg font-mono">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={timeLeft < 300 ? 'text-red-400' : 'text-cyan-400'}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              {!currentBattle ? (
                <Button 
                  onClick={handleStartBattle}
                  className="btn-cyber"
                  disabled={startBattleMutation.isPending}
                >
                  {startBattleMutation.isPending ? 'Starting...' : 'Start Battle'}
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button asChild variant="outline" className="glassmorphism hover:neon-glow">
                    <Link href={`/editorial/${challengeId}`}>View Editorial</Link>
                  </Button>
                  <Button 
                    onClick={handleSave}
                    variant="outline"
                    className="glassmorphism hover:neon-glow"
                    disabled={updateBattleMutation.isPending}
                  >
                    Save Progress
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="btn-cyber"
                    disabled={updateBattleMutation.isPending}
                  >
                    Submit Solution
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Challenge Content */}
        {!currentBattle ? (
          <div className="px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle>Challenge Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{challenge.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{challenge.timeLimit}</div>
                      <div className="text-sm text-gray-400">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">+{challenge.xpReward}</div>
                      <div className="text-sm text-gray-400">XP Reward</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">{challenge.difficulty}</div>
                      <div className="text-sm text-gray-400">Difficulty</div>
                    </div>
                  </div>
                  {Boolean(challenge.constraints) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Constraints</h3>
                      <div className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto text-gray-300">
                        {JSON.stringify(challenge.constraints as any, null, 2)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex h-screen">
            {/* Component Library Sidebar */}
            <div className="w-80 bg-gray-800/50 border-r border-gray-700">
              <ComponentLibrary />
            </div>
            
            {/* Design Canvas */}
            <div className="flex-1">
              <DesignCanvas
                architecture={architecture}
                onChange={setArchitecture}
                challenge={challenge}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
