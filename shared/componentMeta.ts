export interface ComponentMeta {
  label: string;
  icon: string;
  color: string;
}

export const componentMeta: Record<string, ComponentMeta> = {
  "api-gateway": { label: "API Gateway", icon: "🚪", color: "border-cyan-400" },
  "database": { label: "Database", icon: "🗃️", color: "border-pink-500" },
  "load-balancer": { label: "Load Balancer", icon: "⚖️", color: "border-green-400" },
  "cache": { label: "Cache", icon: "⚡", color: "border-yellow-400" },
  "cdn": { label: "CDN", icon: "☁️", color: "border-blue-400" },
  "message-queue": { label: "Message Queue", icon: "📬", color: "border-purple-400" },
  "queue": { label: "Message Queue", icon: "📬", color: "border-purple-400" },
  "microservice": { label: "Microservice", icon: "🔧", color: "border-orange-400" },
  "ml-model": { label: "ML Model", icon: "🧠", color: "border-pink-400" },
  "sql-db": { label: "SQL Database", icon: "🗄️", color: "border-blue-500" },
  "nosql-db": { label: "NoSQL Database", icon: "📊", color: "border-green-500" },
  "file-storage": { label: "File Storage", icon: "📁", color: "border-yellow-500" },
  "data-warehouse": { label: "Data Warehouse", icon: "🏗️", color: "border-purple-500" },
  "monitoring": { label: "Monitoring", icon: "📈", color: "border-indigo-400" }
};
