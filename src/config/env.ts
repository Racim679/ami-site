// Configuration des variables d'environnement
export const config = {
  // Configuration n8n
  n8n: {
    endpoint: import.meta.env.VITE_N8N_ENDPOINT || "http://localhost:5678/webhook-test/rag-agent",
    timeout: 10000, // 10 secondes
  },

  // Configuration Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "https://iuuolubfhswwgrpumqtc.supabase.co",
    key: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dW9sdWJmaHN3d2dycHVtcXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjI5MjYsImV4cCI6MjA2NDU5ODkyNn0.vTP5bNpzdAFQOm4jKV0k6xNZ7JbP2OyzsLG5WE854lM",
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