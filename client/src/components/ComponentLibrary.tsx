import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const componentCategories = [
  {
    title: "Core Services",
    color: "text-cyan-400",
    components: [
      { id: "api-gateway", name: "API Gateway", icon: "🚪", color: "border-cyan-400" },
      { id: "database", name: "Database", icon: "🗃️", color: "border-pink-500" },
      { id: "load-balancer", name: "Load Balancer", icon: "⚖️", color: "border-green-400" },
      { id: "cache", name: "Cache", icon: "⚡", color: "border-yellow-400" },
    ]
  },
  {
    title: "Infrastructure",
    color: "text-pink-500",
    components: [
      { id: "cdn", name: "CDN", icon: "☁️", color: "border-blue-400" },
      { id: "message-queue", name: "Message Queue", icon: "📬", color: "border-purple-400" },
      { id: "microservice", name: "Microservice", icon: "🔧", color: "border-orange-400" },
      { id: "ml-model", name: "ML Model", icon: "🧠", color: "border-pink-400" },
    ]
  },
  {
    title: "Storage",
    color: "text-green-400",
    components: [
      { id: "sql-db", name: "SQL Database", icon: "🗄️", color: "border-blue-500" },
      { id: "nosql-db", name: "NoSQL Database", icon: "📊", color: "border-green-500" },
      { id: "file-storage", name: "File Storage", icon: "📁", color: "border-yellow-500" },
      { id: "data-warehouse", name: "Data Warehouse", icon: "🏗️", color: "border-purple-500" },
    ]
  }
];

export default function ComponentLibrary() {
  const handleComponentDrag = (componentId: string, componentName: string) => {
    // This would integrate with React Flow's drag functionality
    console.log("Dragging component:", componentId, componentName);
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <div className="sticky top-0 bg-gray-800/90 p-2 rounded-lg backdrop-blur-sm z-10">
        <h3 className="text-lg font-semibold flex items-center">
          <svg className="w-5 h-5 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          Component Library
        </h3>
      </div>

      {componentCategories.map((category) => (
        <Card key={category.title} className="glassmorphism">
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm ${category.color}`}>
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {category.components.map((component) => (
                <Button
                  key={component.id}
                  variant="outline"
                  className={`h-16 flex flex-col items-center justify-center text-xs glassmorphism hover:neon-glow transition-all cursor-grab active:cursor-grabbing ${component.color} hover:${component.color.replace('border', 'bg')}/10`}
                  onMouseDown={() => handleComponentDrag(component.id, component.name)}
                  draggable
                >
                  <span className="text-lg mb-1">{component.icon}</span>
                  <span className="text-center leading-tight">{component.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* AI Assistant Panel */}
      <Card className="glassmorphism border-cyan-400/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center text-cyan-400">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            AI Co-Designer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-800 rounded p-3 mb-3 text-xs">
            <p className="text-gray-300">
              💡 Consider adding a Redis cache between your API Gateway and database for better performance.
            </p>
          </div>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full glassmorphism hover:neon-glow text-xs"
            >
              Explain My Diagram
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full glassmorphism hover:neon-glow text-xs"
            >
              Suggest Improvements
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full glassmorphism hover:neon-glow text-xs"
            >
              Generate Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Panel */}
      <Card className="glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center text-yellow-400">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Components</span>
              <span className="text-cyan-400 font-mono">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Connections</span>
              <span className="text-pink-400 font-mono">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Est. Cost</span>
              <span className="text-yellow-400 font-mono">$12.34/hr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Complexity</span>
              <span className="text-green-400 font-mono">Low</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
