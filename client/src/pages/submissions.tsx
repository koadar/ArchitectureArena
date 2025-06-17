import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Trophy, Target } from "lucide-react";
import { format } from "date-fns";

export default function Submissions() {
  const { user } = useAuth();
  
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["/api/submissions"],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Submissions</h1>
          <p className="text-slate-400">Track your battle history and performance</p>
        </div>

        {!submissions || !Array.isArray(submissions) || submissions.length === 0 ? (
          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-12 text-center">
              <Target className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No submissions yet</h3>
              <p className="text-slate-400 mb-6">Start your first battle to see your submissions here</p>
              <Link href="/">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Browse Challenges
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {submissions.map((submission: any) => (
              <Card key={submission.id} className="border-slate-700 bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{submission.challengeTitle}</CardTitle>
                      <CardDescription className="text-slate-400">
                        Battle #{submission.battleId}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={submission.status === "COMPLETED" ? "default" : "secondary"}
                      className={submission.status === "COMPLETED" ? "bg-green-600" : ""}
                    >
                      {submission.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {format(new Date(submission.submittedAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {submission.completionTime ? `${Math.round(submission.completionTime / 60)}m` : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm">
                        {submission.score || 0} points
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Badge variant="outline" className="text-xs">
                        {submission.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/challenge/${submission.challengeId}`}>
                      <Button variant="outline" size="sm">
                        View Challenge
                      </Button>
                    </Link>
                    {submission.status === "COMPLETED" && (
                      <Link href={`/editorial/${submission.challengeId}`}>
                        <Button variant="outline" size="sm">
                          View Editorial
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}