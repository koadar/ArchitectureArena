import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import UserStats from "@/components/UserStats";
import ChallengeCard from "@/components/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import type { Challenge } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  
  const { data: challenges = [], isLoading: challengesLoading } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
  });

  const { data: userStats } = useQuery({
    queryKey: ["/api/user/stats"],
  });

  const { data: userBattles = [] } = useQuery({
    queryKey: ["/api/battles/user"],
  });

  const activeBattles = userBattles.filter((battle: any) => battle.status === "ACTIVE");
  const featuredChallenges = challenges.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <NavBar />
      
      {/* Main Content */}
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="cyber-gradient bg-clip-text text-transparent">{user?.firstName || 'Architect'}</span>
            </h1>
            <p className="text-gray-400">Ready to battle? Choose your challenge and climb the ranks.</p>
          </div>

          {/* User Stats Grid */}
          <UserStats stats={userStats} />

          {/* Active Battles */}
          {activeBattles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Active Battles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBattles.map((battle: any) => (
                  <Card key={battle.id} className="card-cyber border-cyan-400">
                    <CardHeader>
                      <CardTitle className="text-cyan-400">Battle in Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        Challenge ID: {battle.challengeId}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Started: {new Date(battle.startedAt).toLocaleDateString()}
                        </span>
                        <Button asChild size="sm" className="btn-cyber">
                          <Link href={`/challenge/${battle.challengeId}`}>Continue</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Featured Challenges */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Challenges</h2>
              <Button variant="outline" className="glassmorphism hover:neon-glow">
                View All Challenges
              </Button>
            </div>
            
            {challengesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-cyber animate-pulse">
                    <div className="h-32 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="card-cyber hover:border-cyan-400 transition-colors cursor-pointer"
                onClick={() => {
                  if (challenges.length > 0) {
                    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
                    window.location.href = `/challenge/${randomChallenge.id}`;
                  }
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 cyber-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Quick Battle</h3>
                  <p className="text-sm text-gray-400">Jump into a random challenge</p>
                </CardContent>
              </Card>

              <Card 
                className="card-cyber hover:border-pink-400 transition-colors cursor-pointer"
                onClick={() => {
                  if (challenges.length > 0) {
                    const easyChallenge = challenges.find(c => c.difficulty === 'EASY') || challenges[0];
                    window.location.href = `/challenge/${easyChallenge.id}`;
                  }
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Practice Mode</h3>
                  <p className="text-sm text-gray-400">Learn without time pressure</p>
                </CardContent>
              </Card>

              <Card className="card-cyber hover:border-yellow-400 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Link href="/leaderboard" className="block">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-semibold mb-2">Leaderboard</h3>
                    <p className="text-sm text-gray-400">See your global ranking</p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
