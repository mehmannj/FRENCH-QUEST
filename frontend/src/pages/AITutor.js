import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Loader2, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AITutor = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      role: 'assistant',
      content: `Bonjour ${user?.name || 'there'}! 👋 I'm your AI French tutor. I'm here to help you with:\n\n• Grammar questions\n• Vocabulary explanations\n• Pronunciation guidance\n• Practice conversations\n• Writing corrections\n\nWhat would you like to learn today?`
    }]);
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/tutor/chat`,
        { message: userMessage, session_id: sessionId },
        { withCredentials: true }
      );

      setSessionId(response.data.session_id);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.response 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Je suis désolé, I'm having trouble connecting. Please try again!" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = () => {
    setSessionId(null);
    setMessages([{
      role: 'assistant',
      content: `Fresh start! 🎉 What would you like to learn about French today?`
    }]);
  };

  const quickPrompts = [
    "How do I conjugate 'être'?",
    "What's the difference between 'tu' and 'vous'?",
    "Practice greetings with me",
    "Explain French articles",
    "Help me with pronunciation"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="ai-tutor-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              AI French Tutor
            </h1>
            <p className="text-slate-600 mt-1">Ask me anything about French!</p>
          </div>
          <Button
            variant="outline"
            onClick={startNewSession}
            className="rounded-full"
            data-testid="new-session-btn"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Quick Prompts */}
        <div className="mb-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
              data-testid={`quick-prompt-${i}`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4" data-testid="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-800 rounded-bl-md'
                  }`}
                  data-testid={`chat-message-${msg.role}`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            <form onSubmit={sendMessage} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about French..."
                className="flex-1 h-12 rounded-xl"
                disabled={loading}
                data-testid="chat-input"
              />
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-12 px-6 rounded-xl bg-blue-500 hover:bg-blue-600"
                data-testid="send-message-btn"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Grammar Help', desc: 'Ask about verb conjugations, tenses, and rules' },
            { title: 'Vocabulary', desc: 'Learn new words and their usage' },
            { title: 'Conversation', desc: 'Practice French dialogue with me' }
          ].map((tip, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
              <h4 className="font-medium text-slate-900 mb-1">{tip.title}</h4>
              <p className="text-sm text-slate-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITutor;
