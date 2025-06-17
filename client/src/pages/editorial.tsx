import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, Clock, Trophy, Users, Zap } from "lucide-react";

export default function EditorialPage() {
  const [match, params] = useRoute("/editorial/:id");
  const challengeId = params?.id;

  const { data: editorial, isLoading: editorialLoading } = useQuery({
    queryKey: ["/api/editorials", challengeId],
    enabled: !!challengeId,
  });

  const { data: challenge, isLoading: challengeLoading } = useQuery({
    queryKey: ["/api/challenges", challengeId],
    enabled: !!challengeId,
  });

  if (editorialLoading || challengeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!editorial || !challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Editorial not available</h3>
              <p className="text-slate-400 mb-6">Complete the challenge to unlock the editorial</p>
              <Link href={`/challenge/${challengeId}`}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Go to Challenge
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/challenge/${challengeId}`}>
            <Button variant="ghost" className="mb-4 text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Challenge
            </Button>
          </Link>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Editorial</h1>
              <h2 className="text-2xl text-purple-300 mb-2">{challenge?.title || 'Loading...'}</h2>
              <p className="text-slate-400">{challenge?.description || 'Loading...'}</p>
            </div>
            <Badge 
              variant="outline" 
              className={`${
                challenge?.difficulty === "EASY" ? "border-green-500 text-green-400" :
                challenge?.difficulty === "MEDIUM" ? "border-yellow-500 text-yellow-400" :
                challenge?.difficulty === "HARD" ? "border-red-500 text-red-400" :
                "border-purple-500 text-purple-400"
              }`}
            >
              {challenge?.difficulty || 'Loading...'}
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{challenge?.timeLimit || 0}m limit</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Trophy className="h-4 w-4" />
              <span className="text-sm">{challenge?.xpReward || 0} points</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="h-4 w-4" />
              <span className="text-sm">{editorial?.completionRate || 0}% completion</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="h-4 w-4" />
              <span className="text-sm">Avg: {editorial?.estimatedReadTime || 0}m</span>
            </div>
          </div>
        </div>

        {/* Editorial Content */}
        <div className="space-y-6">
          {/* Problem Analysis */}
          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">Problem Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Understanding the core requirements and constraints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  {editorial?.content?.split('\n').slice(0, 3).join('\n') || "This section provides a detailed breakdown of the problem requirements, key constraints, and important considerations for designing an effective solution."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Solution Approach */}
          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">Recommended Solution</CardTitle>
              <CardDescription className="text-slate-400">
                Step-by-step approach to solving this challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {editorial?.content || "This section outlines the recommended architectural approach, including key components, data flow patterns, and design decisions that lead to an optimal solution."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader>
              <CardTitle className="text-white">Key Insights & Best Practices</CardTitle>
              <CardDescription className="text-slate-400">
                Important takeaways and common pitfalls to avoid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {editorial?.keyInsights?.join('\n• ') || "This section highlights critical design principles, scalability considerations, and common mistakes that candidates often make when approaching this type of system design problem."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Approaches */}
          {editorial?.keyInsights && editorial.keyInsights.length > 0 && (
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-white">Alternative Approaches</CardTitle>
                <CardDescription className="text-slate-400">
                  Other valid solutions and trade-offs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {editorial?.keyInsights?.slice(3).join('\n• ') || ''}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Actions */}
        <div className="flex gap-4">
          <Link href={`/challenge/${challengeId}`}>
            <Button variant="outline">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Browse More Challenges
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}