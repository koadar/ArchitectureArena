import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, X, Lightbulb, Target, Zap } from "lucide-react";
import type { Challenge } from '@shared/schema';

interface EditorialPanelProps {
  challenge: Challenge;
  onClose: () => void;
  isVisible: boolean;
}

export default function EditorialPanel({ challenge, onClose, isVisible }: EditorialPanelProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-4 right-4 w-96 max-h-[calc(100vh-8rem)] z-50">
      <Card className="border-slate-700 bg-slate-800/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white text-lg">Editorial Hints</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`${
                challenge.difficulty === "EASY" ? "border-green-500 text-green-400" :
                challenge.difficulty === "MEDIUM" ? "border-yellow-500 text-yellow-400" :
                challenge.difficulty === "HARD" ? "border-red-500 text-red-400" :
                "border-purple-500 text-purple-400"
              }`}
            >
              {challenge.difficulty}
            </Badge>
            <span className="text-sm text-slate-400">{challenge.xpReward} points</span>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {/* Key Requirements */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <h4 className="text-sm font-semibold text-white">Key Requirements</h4>
                </div>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>• Design for {challenge.title.toLowerCase()}</p>
                  <p>• Consider scalability and reliability</p>
                  <p>• Focus on data flow and component interactions</p>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Design Tips */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  <h4 className="text-sm font-semibold text-white">Design Tips</h4>
                </div>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>• Start with core components</p>
                  <p>• Add caching layers where appropriate</p>
                  <p>• Consider database partitioning for scale</p>
                  <p>• Include monitoring and observability</p>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Common Patterns */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <h4 className="text-sm font-semibold text-white">Common Patterns</h4>
                </div>
                <div className="text-sm text-slate-300 space-y-1">
                  {challenge.difficulty === "EASY" && (
                    <>
                      <p>• Simple client-server architecture</p>
                      <p>• Basic load balancing</p>
                      <p>• Single database instance</p>
                    </>
                  )}
                  {challenge.difficulty === "MEDIUM" && (
                    <>
                      <p>• Microservices architecture</p>
                      <p>• Message queues for async processing</p>
                      <p>• Database replication</p>
                      <p>• CDN for static content</p>
                    </>
                  )}
                  {(challenge.difficulty === "HARD" || challenge.difficulty === "BOSS") && (
                    <>
                      <p>• Distributed system design</p>
                      <p>• Event-driven architecture</p>
                      <p>• Database sharding</p>
                      <p>• Multiple caching layers</p>
                      <p>• Circuit breakers and fallbacks</p>
                    </>
                  )}
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Evaluation Criteria */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">What We're Looking For</h4>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>• Appropriate component selection</p>
                  <p>• Logical data flow connections</p>
                  <p>• Scalability considerations</p>
                  <p>• Performance optimizations</p>
                  <p>• Reliability and fault tolerance</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}