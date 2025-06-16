import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Challenge } from "@shared/schema";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-500 hover:bg-green-600';
      case 'MEDIUM':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'HARD':
        return 'bg-red-500 hover:bg-red-600';
      case 'BOSS':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return '🟢';
      case 'MEDIUM':
        return '🟡';
      case 'HARD':
        return '🔴';
      case 'BOSS':
        return '👑';
      default:
        return '⚪';
    }
  };

  return (
    <Card className="card-cyber hover:border-cyan-400/50 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white font-semibold`}>
            {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
          </Badge>
          <span className="text-xs text-gray-400">{challenge.timeLimit} min</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
          {challenge.title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {challenge.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-400 font-semibold">+{challenge.xpReward} XP</span>
          </div>
          
          <Button asChild className="btn-cyber group-hover:animate-glow transition-all">
            <Link href={`/challenge/${challenge.id}`}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Battle
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
