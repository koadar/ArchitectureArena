import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 cyber-gradient rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Architecture Arena</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleLogin}
                className="btn-cyber"
              >
                Start Battle
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 tech-grid opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-pink-500/10"></div>
        
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="cyber-gradient bg-clip-text text-transparent">Architecture</span>
            <br />
            <span className="text-white">Arena</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The ultimate gamified playground where developers practice, simulate, and compete on real-world system design challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleLogin}
              className="btn-cyber animate-glow text-lg px-8 py-4"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Your First Battle
            </Button>
            <Button 
              variant="outline" 
              className="glassmorphism px-8 py-4 text-lg hover:neon-glow transition-all"
              onClick={() => {
                const overlay = document.createElement('div');
                overlay.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
                overlay.innerHTML = `
                  <div class="bg-gray-900 border border-cyan-400 p-8 rounded-xl max-w-4xl w-full text-white">
                    <h3 class="text-3xl font-bold mb-6 text-cyan-400">Architecture Arena Demo</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold">1</div>
                          <div>
                            <h4 class="font-semibold text-cyan-400">Choose Your Challenge</h4>
                            <p class="text-gray-300">Pick from 6 real-world system design challenges like "Design Netflix for Mars" or "Build a URL Shortener"</p>
                          </div>
                        </div>
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                          <div>
                            <h4 class="font-semibold text-pink-500">Drag & Drop Components</h4>
                            <p class="text-gray-300">Build your architecture by dragging components like Load Balancers, Databases, and CDNs onto the canvas</p>
                          </div>
                        </div>
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">3</div>
                          <div>
                            <h4 class="font-semibold text-green-400">Run Live Simulations</h4>
                            <p class="text-gray-300">Test your design with real-time metrics: latency, throughput, and cost calculations</p>
                          </div>
                        </div>
                      </div>
                      <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">4</div>
                          <div>
                            <h4 class="font-semibold text-yellow-400">Battle or Practice</h4>
                            <p class="text-gray-300">Compete against the clock in Battle Mode or learn at your own pace in Practice Mode</p>
                          </div>
                        </div>
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                          <div>
                            <h4 class="font-semibold text-purple-500">Study Solutions</h4>
                            <p class="text-gray-300">Learn from detailed answer keys with working prototypes and explanations</p>
                          </div>
                        </div>
                        <div class="flex items-start space-x-3">
                          <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
                          <div>
                            <h4 class="font-semibold text-orange-500">Track Progress</h4>
                            <p class="text-gray-300">Climb the leaderboard, view your submission history, and unlock achievements</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <button onclick="window.location.href='/api/login'" class="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition-all">Start Now</button>
                      <button onclick="window.location.href='/challenge/1'" class="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-400 transition-all">Try Demo Challenge</button>
                      <button onclick="this.closest('.fixed').remove()" class="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-500 transition-all">Close</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(overlay);
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Watch Demo
            </Button>
          </div>
        </motion.div>
        
        {/* Featured Battle Ticker */}
        <div className="absolute bottom-8 left-0 right-0">
          <Card className="glassmorphism rounded-full mx-auto max-w-4xl">
            <CardContent className="px-6 py-3">
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live: 247 architects battling now</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Weekly Boss Fight: Design Netflix for Mars</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Master System Design Through Battle</h2>
            <p className="text-gray-400">Practice with real-world scenarios and compete with developers worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="card-cyber text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 cyber-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001 1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Canvas</h3>
              <p className="text-gray-400">Build architectures with intuitive drag-and-drop components including APIs, databases, caches, and more.</p>
            </motion.div>

            <motion.div 
              className="card-cyber text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 cyber-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Simulation</h3>
              <p className="text-gray-400">Test your designs with traffic simulation, chaos engineering, and live performance metrics.</p>
            </motion.div>

            <motion.div 
              className="card-cyber text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-12 h-12 cyber-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Battle Mode</h3>
              <p className="text-gray-400">Compete in timed challenges, climb leaderboards, and earn XP as you master system design.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
