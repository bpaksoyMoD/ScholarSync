import { useState, useRef, useEffect } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
}

export default function Coach() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'agent', content: 'Hello! I am your personal essay coach. Paste your essay draft here, or ask me for brainstorming tips!' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "That's a strong start! However, try to be more specific about *why* you want to study this major.",
                "Your introduction is catchy. Have you considered connecting it to your extracurriculars?",
                "I see you mentioned leadership. Can you give a concrete example of a time you led a team?",
                "This paragraph feels a bit disconnected. Let's try to bridge the gap between your hobby and your academic goals."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const agentMsg: Message = { id: (Date.now() + 1).toString(), role: 'agent', content: randomResponse };
            setMessages(prev => [...prev, agentMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                    Essay Coach
                </h1>
            </div>

            <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-4 max-w-[80%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                msg.role === 'agent' ? "bg-blue-600" : "bg-purple-600"
                            )}>
                                {msg.role === 'agent' ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
                            </div>
                            <div className={cn(
                                "p-4 rounded-2xl text-sm leading-relaxed",
                                msg.role === 'agent' ? "bg-white/10 text-white rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4 max-w-[80%]">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div className="bg-white/10 text-white rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-75" />
                                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white/5 border-t border-white/10">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your essay draft or question..."
                            className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 placeholder:text-white/30"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
