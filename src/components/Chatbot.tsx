import React, { useState, useRef, useEffect } from "react";

const N8N_ENDPOINT = "http://localhost:5678/webhook-test/rag-agent"; // URL locale de l'agent RAG

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(N8N_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const botMessage: Message = {
        sender: "bot",
        text: data?.answer || "Aucune réponse reçue.",
      };
      setMessages((msgs) => [...msgs, botMessage]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Erreur lors de la communication avec le bot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      width: 340,
      maxWidth: "90vw",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      zIndex: 1000,
      fontFamily: 'inherit',
    }}>
      <div style={{ padding: 16, borderBottom: "1px solid #eee", fontWeight: 600 }}>Chatbot</div>
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        minHeight: 200,
        maxHeight: 320,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#e0e7ff" : "#f3f4f6",
              color: "#222",
              borderRadius: 16,
              padding: "8px 14px",
              maxWidth: "80%",
              fontSize: 15,
              boxShadow: msg.sender === "user" ? "0 1px 4px #a5b4fc33" : "0 1px 4px #d1d5db33",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #eee", padding: 8, gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question..."
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 15,
            outline: "none",
          }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 15,
          }}
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 