"use client";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AI_CANNED_REPLIES, type AIMessage } from "@/backend/mock-data";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/PageHeader";

function getReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("diverg")) return AI_CANNED_REPLIES.diverge;
  if (q.includes("turbulen") || q.includes("k-") || q.includes("model")) return AI_CANNED_REPLIES.turbulence;
  if (q.includes("navier") || q.includes("equation")) return AI_CANNED_REPLIES.navier;
  return AI_CANNED_REPLIES.default;
}

const SUGGESTIONS = [
  "Why is my simulation diverging?",
  "Which turbulence model should I use?",
  "Explain the Navier–Stokes equations",
  "Best practices for boundary layer meshing",
];

export default function TutorPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: "assistant", content: "Hi! I'm your AI CFD tutor. Ask me anything about meshing, solvers, turbulence models, or post-processing. I can also help debug a stuck run." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: getReply(text) }]);
      setThinking(false);
    }, 700);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col text-left">
        <PageHeader
          icon={Bot}
          title="AI CFD Tutor"
          subtitle="Powered by domain-tuned models · Always available"
        />

        <Card className="flex-1 flex flex-col border-border overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "assistant" && (
                  <div className="size-8 rounded-lg gradient-cyan grid place-items-center shrink-0">
                    <Bot className="size-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
                </div>
                {m.role === "user" && (
                  <div className="size-8 rounded-lg bg-secondary grid place-items-center shrink-0">
                    <User className="size-4" />
                  </div>
                )}
              </motion.div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="size-8 rounded-lg gradient-cyan grid place-items-center"><Bot className="size-4 text-primary" /></div>
                <div className="bg-muted rounded-2xl px-4 py-3 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" />
                    <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-6 pb-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                <Sparkles className="size-3" /> Try asking
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            className="border-t border-border p-3 flex gap-2"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <Input
              value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about meshing, solvers, turbulence…"
              className="h-11"
            />
            <Button type="submit" disabled={!input.trim() || thinking} className="h-11 gradient-cyan text-primary-foreground border-0">
              <Send className="size-4" />
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
