import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotN8n = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour, je suis votre assistante immobilière ! 👋',
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Vous recherchez un bien ? Souhaitez vendre un bien ?\nOu simplement des questions sur nos services ?\nN\'hésitez pas à nous dire ce dont vous avez besoin pour que nous puissions vous assister.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('📤 Envoi du message vers n8n:', {
        message: userMessage.text,
        timestamp: userMessage.timestamp.toISOString(),
      });

      const response = await fetch('https://n8n.srv933307.hstgr.cloud/webhook/c6342350-0f1b-4f96-8c89-00d49d76c8ef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          timestamp: userMessage.timestamp.toISOString(),
        }),
      });

      console.log('📥 Réponse n8n status:', response.status);
      console.log('📥 Réponse n8n headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur réponse n8n:', errorText);
        throw new Error(`Erreur de réseau: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      console.log('📥 Content-Type:', contentType);

      let data;
      const responseText = await response.text();
      console.log('📥 Réponse brute:', responseText);

      try {
        data = JSON.parse(responseText);
        console.log('📥 Données JSON parsées:', data);
      } catch (e) {
        console.error('❌ Erreur parsing JSON:', e);
        throw new Error('Réponse invalide du serveur');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || data.message || data.output || responseText || 'Désolé, je n\'ai pas pu traiter votre demande.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Erreur complète:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Erreur de connexion au serveur.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 z-50",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "hover:scale-110 active:scale-95",
          isOpen && "rotate-180"
        )}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chatbot Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-96 h-[500px] transition-all duration-300 z-40",
          "transform origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <Card className="h-full flex flex-col shadow-2xl border-border bg-card">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Racim Promotion</h3>
                <p className="text-xs opacity-90">Dites-nous tout. Nous sommes là pour vous assister 24 sur 7.</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs opacity-90">En ligne</span>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex animate-in slide-in-from-bottom-2 duration-300",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      "transition-all duration-200 hover:scale-[1.02]",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>En train d'écrire...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                disabled={isLoading}
                className="flex-1 focus:ring-2 focus:ring-primary transition-all duration-200"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChatbotN8n;