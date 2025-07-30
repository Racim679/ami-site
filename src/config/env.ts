// Configuration des variables d'environnement
export const config = {
  // Configuration n8n
  n8n: {
    endpoint: import.meta.env.VITE_N8N_ENDPOINT || "http://localhost:5678/webhook-test/rag-agent",
    timeout: 10000, // 10 secondes
  },

  // Configuration Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "https://xiduvcxmtzpwgwmtsmzc.supabase.co",
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZHV2Y3htdHpwd2d3bXRzbXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTQ4NjQsImV4cCI6MjA2NDM5MDg2NH0.B08ldBYkO1NNpnAq6GinPWskUw9rreOee4S9RqPAu5I",
  },

  // Configuration de l'application
  app: {
    name: "Agence Immobilière",
    version: "1.0.0",
    environment: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },

  // Configuration des fonctionnalités
  features: {
    chatbot: true,
    favorites: true,
    mortgageCalculator: true,
    priceEstimator: true,
  }
}; 