import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

interface UserStatsProps {
  stats?: {
    battlesWon: number;
    currentStreak: number;
    winRate: number;
    totalBattles: number;
    avgCompletionTime: number;
    xpToNextTier: number;
  };
}

export default function UserStats({ stats }: UserStatsProps) {
  const { user } = useAuth();

  const getTierProgress = () => {
    if (!stats?.xpToNextTier || !user?.xp) return 0;
    const currentTierXp = user.xp % 1000; // Assuming 1000 XP per tier
    return (currentTierXp / 1000) * 100;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Rookie':
        return 'text-gray-400';
      case 'Architect':
        return 'text-blue-400';
      case 'Senior Architect':
        return 'text-purple-400';
      case 'Chaos Guru':
        return 'text-pink-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Current Rank Card */}
      <Card className="card-cyber hover:border-cyan-400/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Current Rank</span>
            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold cyber-gradient bg-clip-text text-transparent mb-1">
            #{user?.rank || 'Unranked'}
          </div>
          <p className={`text-sm mb-3 ${getTierColor(user?.tier || 'Rookie')}`}>
            {user?.tier || 'Rookie'}
          </p>
          <Progress value={getTierProgress()} className="h-2 mb-2" />
          <p className="text-xs text-gray-500">
            {stats?.xpToNextTier || 0} XP to next tier
          </p>
        </CardContent>
      </Card>

      {/* Battle Stats */}
      <Card className="card-cyber hover:border-pink-500/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Battle Stats</span>
            <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xl font-bold text-cyan-400">{stats?.battlesWon || user?.battlesWon || 0}</div>
              <div className="text-xs text-gray-400">Battles Won</div>
            </div>
            <div>
              <div className="text-xl font-bold text-pink-500">{stats?.currentStreak || user?.currentStreak || 0}</div>
              <div className="text-xs text-gray-400">Current Streak</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-400">
                {stats?.winRate ? `${Math.round(stats.winRate)}%` : '0%'}
              </div>
              <div className="text-xs text-gray-400">Win Rate</div>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-400">{user?.xp || 0}</div>
              <div className="text-xs text-gray-400">Total XP</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card className="card-cyber hover:border-green-400/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Performance</span>
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-lg font-bold text-green-400">
                {stats?.avgCompletionTime ? `${Math.round(stats.avgCompletionTime / 60)}m` : '--'}
              </div>
              <div className="text-xs text-gray-400">Avg Completion Time</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">
                {stats?.totalBattles || 0}
              </div>
              <div className="text-xs text-gray-400">Total Battles</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-cyber hover:border-yellow-400/50 transition-colors cursor-pointer group">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Quick Battle</span>
            <svg className="w-5 h-5 text-yellow-400 group-hover:animate-spin" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-400">
              Jump into a random challenge now!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
