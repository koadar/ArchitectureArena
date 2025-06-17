import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, PlayCircle, BookOpen, Zap, Target, Award, Clock, Users, Star, ArrowRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  content: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "intro-system-design",
    title: "Introduction to System Design",
    description: "Understanding the fundamentals of scalable system architecture",
    duration: "15 min",
    difficulty: "Beginner",
    topics: ["Scalability", "Reliability", "Performance", "Trade-offs"],
    content: `
      <h3>What is System Design?</h3>
      <p>System design is the process of architecting the components of a system and their interactions to satisfy specified requirements. It involves making high-level decisions about:</p>
      <ul>
        <li><strong>Scalability:</strong> How the system handles increased load</li>
        <li><strong>Reliability:</strong> System's ability to function correctly during a specific duration</li>
        <li><strong>Availability:</strong> System's operational time</li>
        <li><strong>Consistency:</strong> All nodes see the same data simultaneously</li>
      </ul>
      
      <h3>Key Principles</h3>
      <ol>
        <li><strong>Single Responsibility:</strong> Each component should have one reason to change</li>
        <li><strong>Loose Coupling:</strong> Components should be independent and communicate through well-defined interfaces</li>
        <li><strong>High Cohesion:</strong> Related functionality should be grouped together</li>
        <li><strong>Separation of Concerns:</strong> Different aspects of functionality should be separated</li>
      </ol>
      
      <h3>The CAP Theorem</h3>
      <p>In distributed systems, you can only guarantee 2 out of 3:</p>
      <ul>
        <li><strong>Consistency:</strong> All nodes return the same data</li>
        <li><strong>Availability:</strong> System remains operational</li>
        <li><strong>Partition Tolerance:</strong> System continues despite network failures</li>
      </ul>
    `
  },
  {
    id: "design-canvas-basics",
    title: "Mastering the Design Canvas",
    description: "Learn to use our visual architecture designer effectively",
    duration: "10 min",
    difficulty: "Beginner",
    topics: ["Components", "Connections", "Properties", "Validation"],
    content: `
      <h3>Component Library</h3>
      <p>Our platform provides a comprehensive set of architecture components:</p>
      
      <h4>Core Components</h4>
      <ul>
        <li><strong>Load Balancer:</strong> Distributes incoming requests across multiple servers</li>
        <li><strong>Web Server:</strong> Handles HTTP requests and serves content</li>
        <li><strong>Application Server:</strong> Executes business logic</li>
        <li><strong>Database:</strong> Stores and retrieves data</li>
        <li><strong>Cache:</strong> Improves performance by storing frequently accessed data</li>
      </ul>
      
      <h4>Advanced Components</h4>
      <ul>
        <li><strong>Message Queue:</strong> Enables asynchronous communication</li>
        <li><strong>API Gateway:</strong> Single entry point for microservices</li>
        <li><strong>CDN:</strong> Content delivery network for global content distribution</li>
        <li><strong>Monitoring:</strong> Observability and alerting systems</li>
      </ul>
      
      <h3>Making Connections</h3>
      <p>Connect components by dragging from output ports to input ports. Each connection represents a data flow or communication path.</p>
      
      <h3>Component Properties</h3>
      <p>Click on any component to configure its properties:</p>
      <ul>
        <li>Capacity settings</li>
        <li>Performance characteristics</li>
        <li>Security configurations</li>
        <li>Scaling parameters</li>
      </ul>
    `
  },
  {
    id: "first-architecture",
    title: "Building Your First Architecture",
    description: "Create a simple but complete web application architecture",
    duration: "20 min",
    difficulty: "Beginner",
    topics: ["Load Balancer", "Web Server", "Database", "Best Practices"],
    content: `
      <h3>Basic Web Application Architecture</h3>
      <p>Let's build a simple e-commerce website architecture step by step:</p>
      
      <h4>Step 1: User Interface Layer</h4>
      <p>Start with a <strong>Load Balancer</strong> to handle incoming traffic:</p>
      <ul>
        <li>Distributes requests across multiple web servers</li>
        <li>Provides high availability</li>
        <li>Enables horizontal scaling</li>
      </ul>
      
      <h4>Step 2: Application Layer</h4>
      <p>Add <strong>Web Servers</strong> behind the load balancer:</p>
      <ul>
        <li>Handle HTTP requests</li>
        <li>Serve static content</li>
        <li>Process user interactions</li>
      </ul>
      
      <h4>Step 3: Business Logic Layer</h4>
      <p>Include <strong>Application Servers</strong> for business logic:</p>
      <ul>
        <li>User authentication and authorization</li>
        <li>Product catalog management</li>
        <li>Order processing</li>
        <li>Payment handling</li>
      </ul>
      
      <h4>Step 4: Data Layer</h4>
      <p>Add a <strong>Database</strong> for persistent storage:</p>
      <ul>
        <li>User accounts and profiles</li>
        <li>Product information</li>
        <li>Order history</li>
        <li>Transaction records</li>
      </ul>
      
      <h4>Step 5: Performance Optimization</h4>
      <p>Include a <strong>Cache</strong> layer for better performance:</p>
      <ul>
        <li>Frequently accessed products</li>
        <li>User session data</li>
        <li>Query results</li>
      </ul>
      
      <h3>Connection Patterns</h3>
      <p>Follow these connection patterns:</p>
      <ol>
        <li>Internet → Load Balancer → Web Servers</li>
        <li>Web Servers → Application Servers</li>
        <li>Application Servers → Cache</li>
        <li>Application Servers → Database</li>
      </ol>
    `
  },
  {
    id: "advanced-patterns",
    title: "Advanced Architecture Patterns",
    description: "Explore microservices, event-driven architecture, and more",
    duration: "30 min",
    difficulty: "Intermediate",
    topics: ["Microservices", "Event Sourcing", "CQRS", "Saga Pattern"],
    content: `
      <h3>Microservices Architecture</h3>
      <p>Break down monolithic applications into smaller, independent services:</p>
      
      <h4>Benefits</h4>
      <ul>
        <li><strong>Scalability:</strong> Scale individual services based on demand</li>
        <li><strong>Technology Diversity:</strong> Use different technologies for different services</li>
        <li><strong>Team Independence:</strong> Teams can work independently on different services</li>
        <li><strong>Fault Isolation:</strong> Failure in one service doesn't affect others</li>
      </ul>
      
      <h4>Challenges</h4>
      <ul>
        <li>Increased complexity in service communication</li>
        <li>Data consistency across services</li>
        <li>Monitoring and debugging distributed systems</li>
        <li>Network latency and reliability</li>
      </ul>
      
      <h3>Event-Driven Architecture</h3>
      <p>Services communicate through events rather than direct calls:</p>
      
      <h4>Key Components</h4>
      <ul>
        <li><strong>Event Producer:</strong> Generates events</li>
        <li><strong>Event Router:</strong> Routes events to interested consumers</li>
        <li><strong>Event Consumer:</strong> Processes events</li>
        <li><strong>Event Store:</strong> Persists events for replay and audit</li>
      </ul>
      
      <h3>CQRS (Command Query Responsibility Segregation)</h3>
      <p>Separate read and write operations for better performance and scalability:</p>
      
      <h4>Commands (Write Side)</h4>
      <ul>
        <li>Handle business operations</li>
        <li>Validate business rules</li>
        <li>Optimized for writes</li>
      </ul>
      
      <h4>Queries (Read Side)</h4>
      <ul>
        <li>Handle data retrieval</li>
        <li>Optimized for reads</li>
        <li>Can use different data models</li>
      </ul>
      
      <h3>Saga Pattern</h3>
      <p>Manage distributed transactions across multiple services:</p>
      
      <h4>Choreography-based Saga</h4>
      <ul>
        <li>Services coordinate through events</li>
        <li>No central coordinator</li>
        <li>Decentralized decision making</li>
      </ul>
      
      <h4>Orchestration-based Saga</h4>
      <ul>
        <li>Central orchestrator manages the flow</li>
        <li>Easier to understand and debug</li>
        <li>Single point of failure risk</li>
      </ul>
    `
  },
  {
    id: "scalability-patterns",
    title: "Scalability and Performance Patterns",
    description: "Learn how to design systems that scale to millions of users",
    duration: "25 min",
    difficulty: "Advanced",
    topics: ["Horizontal Scaling", "Caching Strategies", "Database Sharding", "CDN"],
    content: `
      <h3>Scaling Strategies</h3>
      
      <h4>Vertical Scaling (Scale Up)</h4>
      <ul>
        <li>Add more power to existing machines</li>
        <li>Easier to implement</li>
        <li>Limited by hardware constraints</li>
        <li>Single point of failure</li>
      </ul>
      
      <h4>Horizontal Scaling (Scale Out)</h4>
      <ul>
        <li>Add more machines to the resource pool</li>
        <li>Better fault tolerance</li>
        <li>More complex to implement</li>
        <li>Virtually unlimited scaling potential</li>
      </ul>
      
      <h3>Caching Strategies</h3>
      
      <h4>Cache-Aside (Lazy Loading)</h4>
      <ul>
        <li>Application manages cache</li>
        <li>Data loaded on demand</li>
        <li>Cache miss results in database query</li>
      </ul>
      
      <h4>Write-Through</h4>
      <ul>
        <li>Data written to cache and database simultaneously</li>
        <li>Ensures data consistency</li>
        <li>Higher write latency</li>
      </ul>
      
      <h4>Write-Behind (Write-Back)</h4>
      <ul>
        <li>Data written to cache first</li>
        <li>Database updated asynchronously</li>
        <li>Better write performance</li>
        <li>Risk of data loss</li>
      </ul>
      
      <h3>Database Scaling</h3>
      
      <h4>Read Replicas</h4>
      <ul>
        <li>Distribute read queries across multiple replicas</li>
        <li>Master handles writes</li>
        <li>Eventual consistency</li>
      </ul>
      
      <h4>Database Sharding</h4>
      <ul>
        <li>Partition data across multiple databases</li>
        <li>Each shard handles a subset of data</li>
        <li>Complex query routing</li>
        <li>Rebalancing challenges</li>
      </ul>
      
      <h3>Content Delivery Networks (CDN)</h3>
      
      <h4>Benefits</h4>
      <ul>
        <li>Reduced latency through geographic distribution</li>
        <li>Reduced server load</li>
        <li>Better availability</li>
        <li>DDoS protection</li>
      </ul>
      
      <h4>Cache Invalidation Strategies</h4>
      <ul>
        <li><strong>TTL (Time To Live):</strong> Cache expires after specified time</li>
        <li><strong>Manual Invalidation:</strong> Explicitly clear cache entries</li>
        <li><strong>Event-Based:</strong> Invalidate based on data changes</li>
      </ul>
    `
  }
];

export default function Tutorial() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: progress } = useQuery({
    queryKey: ["/api/tutorial/progress"],
    enabled: isAuthenticated,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ stepId, completed }: { stepId: string; completed: boolean }) => {
      return await fetch("/api/tutorial/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId, completed }),
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tutorial/progress"] });
    },
  });

  const completedSteps = new Set(Array.isArray(progress) ? progress.filter((p: any) => p.completed).map((p: any) => p.stepId) : []);
  const progressPercentage = (completedSteps.size / tutorialSteps.length) * 100;

  const handleStartStep = (stepId: string) => {
    if (isAuthenticated) {
      updateProgressMutation.mutate({ stepId, completed: true });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Architecture Academy
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Master system design through comprehensive tutorials and hands-on practice
        </p>
        
        {isAuthenticated && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Your Progress</h3>
              <span className="text-sm text-gray-600">{completedSteps.size} of {tutorialSteps.length} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Learn by Doing</h3>
                  <p className="text-sm text-green-700">Interactive tutorials with real scenarios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Progressive Learning</h3>
                  <p className="text-sm text-blue-700">From basics to advanced patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900">Expert Guidance</h3>
                  <p className="text-sm text-purple-700">Industry best practices and patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900">Community</h3>
                  <p className="text-sm text-orange-700">Learn with thousands of developers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6">
            {tutorialSteps.map((step, index) => {
              const isCompleted = completedSteps.has(step.id);
              return (
                <Card key={step.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {isCompleted ? <CheckCircle className="h-6 w-6" /> : (index + 1)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                          <CardDescription className="text-base mb-3">
                            {step.description}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {step.duration}
                            </span>
                            <Badge variant={
                              step.difficulty === 'Beginner' ? 'default' :
                              step.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                            }>
                              {step.difficulty}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {step.topics.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant={isCompleted ? "secondary" : "default"}
                        className="flex-shrink-0"
                        onClick={() => handleStartStep(step.id)}
                        disabled={updateProgressMutation.isPending}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          {tutorialSteps.map((step) => {
            const isCompleted = completedSteps.has(step.id);
            return (
              <Card key={step.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {step.title}
                    </CardTitle>
                    <Badge variant={
                      step.difficulty === 'Beginner' ? 'default' :
                      step.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                    }>
                      {step.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: step.content }}
                  />
                  <div className="mt-6 pt-4 border-t">
                    <Button 
                      onClick={() => handleStartStep(step.id)}
                      disabled={updateProgressMutation.isPending}
                      className="w-full"
                    >
                      {isCompleted ? "Review Tutorial" : "Start Tutorial"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recommended Reading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">Books</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Designing Data-Intensive Applications</li>
                    <li>• System Design Interview</li>
                    <li>• Building Microservices</li>
                    <li>• Clean Architecture</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Papers</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• CAP Theorem</li>
                    <li>• MapReduce</li>
                    <li>• Dynamo</li>
                    <li>• Raft Consensus Algorithm</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Industry Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">Case Studies</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Netflix Microservices Architecture</li>
                    <li>• WhatsApp Messaging System</li>
                    <li>• Uber Real-time Architecture</li>
                    <li>• Instagram Photo Storage</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Engineering Blogs</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• High Scalability</li>
                    <li>• AWS Architecture Center</li>
                    <li>• Google Cloud Architecture</li>
                    <li>• Microsoft Azure Well-Architected</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}