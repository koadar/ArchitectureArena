import { useQuery } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { LeaderboardEntry } from "@shared/schema";

export default function Leaderboard() {
  const [period, setPeriod] = useState<"WEEKLY" | "MONTHLY" | "ALL_TIME">("WEEKLY");
  
  const { data: leaderboard = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard", { period }],
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-orange-400 to-orange-600";
    return "from-gray-600 to-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <NavBar />
      
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Global Leaderboard</h1>
            <p className="text-gray-400">The top architects in the arena</p>
          </div>

          {/* Period Selection */}
          <div className="flex justify-center mb-8">
            <Card className="glassmorphism">
              <CardContent className="p-2">
                <div className="flex space-x-1">
                  {(["WEEKLY", "MONTHLY", "ALL_TIME"] as const).map((p) => (
                    <Button
                      key={p}
                      variant={period === p ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPeriod(p)}
                      className={period === p ? "btn-cyber text-xs" : "text-gray-400 hover:text-white text-xs"}
                    >
                      {p === "ALL_TIME" ? "All Time" : p.toLowerCase()}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Elite Architects</span>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {period === "ALL_TIME" ? "All Time" : period.toLowerCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading leaderboard...</p>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  </svg>
                  <p>No rankings available yet</p>
                  <p className="text-sm">Be the first to complete some challenges!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-6 hover:bg-gray-800/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getRankColor(entry.rank)} rounded-full flex items-center justify-center text-gray-900 font-bold text-sm`}>
                          {entry.rank <= 3 ? getRankBadge(entry.rank) : entry.rank}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.userId}`} />
                          <AvatarFallback>
                            {entry.userId.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">User {entry.userId}</div>
                          <div className="text-sm text-gray-400">Architect</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-cyan-400">{entry.totalXp.toLocaleString()} XP</div>
                        <div className="text-sm text-gray-400">{entry.battlesWon} battles won</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <Card className="card-cyber border-cyan-400/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Climb the Ranks?</h3>
                <p className="text-gray-400 mb-6">
                  Complete more challenges to earn XP and improve your position on the leaderboard.
                </p>
                <Button className="btn-cyber">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Start a New Battle
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
