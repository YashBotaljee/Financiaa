import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  AI_SUGGESTED_QUESTIONS,
  CANNED_AI_RESPONSES,
  ChatMessage,
} from '../../data/mock/aiInsights';

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Good day! I am Financiaa AI Assistant. I have analyzed your ledger, workforce attendance, client invoices, and current operating burn rate. Select a query below or ask any business question.',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: questionText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate responsive AI analysis
    setTimeout(() => {
      const canned =
        CANNED_AI_RESPONSES[questionText] ||
        CANNED_AI_RESPONSES['What changed compared with last month?'];

      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: canned.text,
        timestamp: 'Just now',
        metrics: canned.metrics,
        breakdown: canned.breakdown,
        actionRecommendation: canned.actionRecommendation,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: 'Good day! I am Financiaa AI Assistant. I have analyzed your ledger, workforce attendance, client invoices, and current operating burn rate. Select a query below or ask any business question.',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Business Intelligence
            </h1>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              Prototype AI
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understand your business with intelligent insights.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleReset}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Reset Session
        </Button>
      </div>

      {/* Suggested Questions Grid */}
      <div className="bg-gradient-to-r from-indigo-50/70 via-white to-sky-50/70 p-4 rounded-xl border border-indigo-100 shadow-2xs">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-900">
          <Lightbulb className="w-4 h-4 text-indigo-600" />
          <span>Suggested queries based on current ledger:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {AI_SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="text-xs font-medium text-slate-700 hover:text-indigo-700 bg-white hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Console */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Interactive Business Assistant</span>
          </div>
        }
        subtitle="Simulated natural language reasoning over mock company datasets"
        bodyClassName="p-4 sm:p-6"
      >
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-indigo-600 text-white ring-2 ring-indigo-100'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line text-xs font-normal">{msg.text}</p>

                {/* Optional Metric Cards Pill */}
                {msg.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    {msg.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs"
                      >
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold text-slate-900 font-sans mt-0.5 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Item Breakdown */}
                {msg.breakdown && (
                  <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Ledger Attribution
                    </span>
                    {msg.breakdown.map((b, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px] py-0.5 border-b border-slate-100 last:border-0">
                        <span className="text-slate-700">{b.item}</span>
                        <div className="text-right">
                          <span className="font-bold text-slate-900 font-sans mr-2">{b.amount}</span>
                          {b.share && <span className="text-slate-400 text-[10px]">({b.share})</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Action Recommendation */}
                {msg.actionRecommendation && (
                  <div className="bg-indigo-50/80 border border-indigo-100 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-indigo-900">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Recommended Decision: </span>
                      {msg.actionRecommendation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-11">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>Financiaa AI is synthesizing enterprise ledger records...</span>
            </div>
          )}
        </div>

        {/* Input prompt bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about your business..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={!inputValue.trim()}
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Ask
            </Button>
          </form>
          <span className="text-[10px] text-slate-400 block mt-2 text-center">
            UI Prototype Demo: Demonstrates simulated LLM reasoning over financial and organizational data.
          </span>
        </div>
      </Card>
    </div>
  );
};
