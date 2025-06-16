import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Architecture Arena",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">What is System Design?</h3>
          <p className="text-gray-300">
            System design is like being an architect for computer systems. Instead of designing buildings, 
            you design how different parts of a software system work together to handle millions of users.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-pink-500 mb-2">Real-World Example:</h4>
            <p className="text-gray-300">
              When you watch a video on YouTube, the system needs to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
              <li>Store billions of videos somewhere safe</li>
              <li>Deliver videos quickly to users worldwide</li>
              <li>Handle millions of people watching at the same time</li>
              <li>Recommend new videos you might like</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Understanding Components",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">Building Blocks of Systems</h3>
          <p className="text-gray-300">
            Think of system components like LEGO blocks. Each piece has a special job, 
            and you connect them to build something amazing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">🗄️ Database</h4>
              <p className="text-gray-300 text-sm">
                Like a digital filing cabinet that stores all your data (user profiles, posts, videos, etc.)
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">⚖️ Load Balancer</h4>
              <p className="text-gray-300 text-sm">
                Like a traffic director that spreads incoming requests across multiple servers
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">🚀 CDN</h4>
              <p className="text-gray-300 text-sm">
                Like having copies of your content in cities worldwide for faster delivery
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">💾 Cache</h4>
              <p className="text-gray-300 text-sm">
                Like keeping frequently used items on your desk instead of walking to the storage room
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How to Use the Canvas",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">Building Your First Architecture</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-cyan-400">Choose Components</h4>
                <p className="text-gray-300">Look at the left sidebar - it has all the components you need. Each category (Compute, Storage, etc.) contains related components.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-pink-500">Drag & Drop</h4>
                <p className="text-gray-300">Click and hold any component, then drag it onto the main canvas (the big white area). Release to place it.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-green-400">Connect Components</h4>
                <p className="text-gray-300">Click and drag from one component to another to create connections. This shows how data flows between them.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-yellow-400">Test Your Design</h4>
                <p className="text-gray-300">Click "Run Simulation" to see how your system performs. Watch the metrics change in real-time!</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Battle vs Practice Mode",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">Choose Your Learning Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-900/20 to-red-700/20 p-6 rounded-lg border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center">
                ⚔️ Battle Mode
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Timed challenges (usually 30-45 minutes)</li>
                <li>• Earn XP and climb the leaderboard</li>
                <li>• Compete with other students</li>
                <li>• Can't see solutions until you submit</li>
                <li>• Great for testing your skills</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 p-6 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                📚 Practice Mode
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• No time pressure - take as long as you need</li>
                <li>• Access hints and tips while working</li>
                <li>• View solutions anytime</li>
                <li>• No scoring or competition</li>
                <li>• Perfect for learning new concepts</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Understanding Metrics",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">How to Read System Performance</h3>
          <p className="text-gray-300">
            When you run a simulation, you'll see three key metrics. Here's what they mean in simple terms:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">⚡ Latency (Response Time)</h4>
              <p className="text-gray-300 text-sm mb-2">
                How long it takes for your system to respond to a request.
              </p>
              <div className="text-xs text-gray-400">
                <strong>Think of it like:</strong> Ordering food at a restaurant - latency is how long you wait for your meal.
              </div>
              <div className="mt-2 text-xs">
                <span className="text-green-400">Good:</span> Under 100ms | 
                <span className="text-yellow-400"> OK:</span> 100-500ms | 
                <span className="text-red-400"> Bad:</span> Over 1000ms
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-400 mb-2">🚀 Throughput (Requests per Second)</h4>
              <p className="text-gray-300 text-sm mb-2">
                How many requests your system can handle at the same time.
              </p>
              <div className="text-xs text-gray-400">
                <strong>Think of it like:</strong> How many customers a restaurant can serve per hour.
              </div>
              <div className="mt-2 text-xs">
                <span className="text-green-400">Good:</span> 1000+ req/s | 
                <span className="text-yellow-400"> OK:</span> 100-1000 req/s | 
                <span className="text-red-400"> Bad:</span> Under 100 req/s
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-500 mb-2">💰 Cost per Hour</h4>
              <p className="text-gray-300 text-sm mb-2">
                How much money it costs to run your system for one hour.
              </p>
              <div className="text-xs text-gray-400">
                <strong>Think of it like:</strong> Your monthly phone bill - you want good service but not too expensive.
              </div>
              <div className="mt-2 text-xs">
                <span className="text-green-400">Good:</span> Under $50/hour | 
                <span className="text-yellow-400"> OK:</span> $50-200/hour | 
                <span className="text-red-400"> Expensive:</span> Over $200/hour
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your First Challenge",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400">Ready to Start Building!</h3>
          <p className="text-gray-300">
            Now you're ready to tackle your first system design challenge. Here's what to do:
          </p>
          <div className="bg-gradient-to-r from-cyan-900/20 to-pink-900/20 p-6 rounded-lg border border-cyan-400/30">
            <h4 className="font-semibold text-cyan-400 mb-4">Recommended First Steps:</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Start with <strong>Practice Mode</strong> on the "URL Shortener" challenge - it's the easiest!</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Read the challenge description carefully</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Start simple - drag a web server and database onto the canvas</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Connect them with a line</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">5.</span>
                <span>Run the simulation to see how it performs</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">6.</span>
                <span>Add more components to improve performance</span>
              </li>
            </ol>
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              className="btn-cyber"
              onClick={() => window.location.href = '/challenge/1?mode=practice'}
            >
              Start Practice Challenge
            </Button>
            <Button 
              variant="outline"
              className="glassmorphism"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </Button>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="cyber-gradient bg-clip-text text-transparent">
                System Design Tutorial
              </span>
            </h1>
            <p className="text-gray-400">
              Learn system design step-by-step - designed for beginners
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                Step {currentStep + 1} of {tutorialSteps.length}
              </Badge>
              <div className="flex space-x-1">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tutorial Content */}
          <Card className="card-cyber min-h-[500px]">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {tutorialSteps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tutorialSteps[currentStep].content}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="glassmorphism"
            >
              Previous
            </Button>
            
            <span className="text-gray-400">
              {currentStep + 1} / {tutorialSteps.length}
            </span>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === tutorialSteps.length - 1}
              className="btn-cyber"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}