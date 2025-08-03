import { useEffect, useRef, useState } from 'react';

interface ChatbotWidgetProps {
  title: string;
  initialMessage1: string;
  initialMessage2: string;
  webhookUrl: string;
}

export const ChatbotWidget = ({
  title,
  initialMessage1,
  initialMessage2,
  webhookUrl,
}: ChatbotWidgetProps) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: initialMessage1 },
    { from: 'bot', text: initialMessage2 },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${webhookUrl}?action=sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: userMessage,
          sessionId: 'web-session-' + Date.now(),
        }),
      });
      
      const data = await response.json();
      
      // Simuler un délai de réponse pour l'effet de frappe
      setTimeout(() => {
        const botReply = data?.output || data?.response || data?.text || "Désolé, je n'ai pas compris.";
        setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: 'bot', text: "Erreur de connexion au serveur." },
        ]);
        setIsTyping(false);
      }, 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Bouton de toggle du chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 z-50 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'rotate-180' : ''
        } bg-gradient-to-r from-chatbot-primary to-chatbot-primary hover:from-chatbot-hover hover:to-chatbot-hover text-chatbot-primary-foreground`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Fenêtre du chatbot */}
      <div className={`fixed bottom-20 right-2 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] md:w-96 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)] transition-all duration-300 z-40 transform origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-black rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-chatbot-primary/20 transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] hover:shadow-chatbot-primary/20">
          {/* Header avec gradient et glassmorphisme */}
          <div className="bg-gradient-to-r from-chatbot-primary via-chatbot-primary to-chatbot-primary text-chatbot-primary-foreground px-6 py-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold tracking-wide">{title}</h3>
              <div className="flex items-center mt-1 text-chatbot-primary-foreground/80">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-medium">En ligne</span>
              </div>
            </div>
            {/* Effet de brillance */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-chatbot-primary/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          </div>

          {/* Zone de chat */}
          <div className="h-64 md:h-96 px-3 md:px-4 py-4 md:py-6 overflow-y-auto bg-gradient-to-b from-gray-900 to-black space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-chatbot-primary scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === 'bot' ? 'justify-start' : 'justify-end'
                } animate-fade-in-up`}
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <div
                  className={`relative max-w-[240px] md:max-w-xs px-3 md:px-5 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    msg.from === 'bot'
                      ? 'bg-gradient-to-br from-white to-gray-50 text-black border border-gray-200 hover:shadow-xl hover:shadow-gray-300/50'
                      : 'bg-gradient-to-br from-chatbot-primary to-chatbot-primary text-chatbot-primary-foreground hover:from-chatbot-hover hover:to-chatbot-hover hover:shadow-chatbot-primary/50'
                  }`}
                >
                  {msg.text}
                  {/* Petite queue de bulle */}
                  <div
                    className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                      msg.from === 'bot'
                        ? 'bg-white -left-1.5 border-l border-b border-gray-200'
                        : 'bg-chatbot-primary -right-1.5'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
            
            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-gradient-to-br from-white to-gray-50 text-gray-600 px-5 py-3 rounded-2xl shadow-lg border border-gray-200 relative">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <div className="absolute top-3 w-3 h-3 transform rotate-45 bg-white -left-1.5 border-l border-b border-gray-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-chatbot-primary/30 bg-gradient-to-r from-gray-900 to-black px-4 py-4">
            <div className="flex space-x-3 items-end">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  placeholder="Tapez votre message..."
                  className="w-full bg-gray-800 border-2 border-chatbot-primary/30 rounded-2xl px-5 py-3 text-sm font-medium text-yellow-100 placeholder-white focus:outline-none focus:border-chatbot-primary focus:ring-2 focus:ring-chatbot-primary/20 transition-all duration-300 shadow-sm hover:shadow-md hover:border-chatbot-primary/50"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {/* Effet de focus lumineux */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-chatbot-primary/0 via-chatbot-primary/10 to-chatbot-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-chatbot-primary to-chatbot-primary hover:from-chatbot-hover hover:to-chatbot-hover disabled:from-gray-600 disabled:to-gray-700 text-chatbot-primary-foreground hover:text-chatbot-primary-foreground disabled:text-gray-400 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-chatbot-primary/30 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed transform active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thumb-chatbot-primary::-webkit-scrollbar-thumb {
          background-color: hsl(var(--chatbot-primary));
          border-radius: 2px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px hsl(var(--chatbot-primary) / 0.25);
        }
      `}</style>
    </>
  );
};