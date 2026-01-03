import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getGeminiChatResponse } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

interface Message {
    id: string;
    role: "user" | "bot";
    text: string;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", text: "Hello! I'm your GlobeTrotter AI assistant. Ask me anything about your trip!" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Keep track of simple history for the API
    const historyRef = useRef<{ role: "user" | "model"; parts: { text: string }[] }[]>([]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userText = input;
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            text: userText,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            // Get response from Gemini
            const responseText = await getGeminiChatResponse(userText, historyRef.current);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: responseText,
            };

            setMessages((prev) => [...prev, botMsg]);

            // Update history
            historyRef.current.push(
                { role: "user", parts: [{ text: userText }] },
                { role: "model", parts: [{ text: responseText }] }
            );
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: "Sorry, I encountered an error. Please try again.",
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 animate-bounce-subtle"
                    size="icon"
                >
                    <MessageCircle size={28} />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className={cn(
                    "w-[500px] md:w-[600px] h-[700px] max-h-[85vh] flex flex-col shadow-2xl border-primary/20 glass animate-in slide-in-from-bottom-10 fade-in duration-300",
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                )}>
                    <CardHeader className="p-4 border-b border-white/10 bg-primary/10 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
                        <div className="flex items-center gap-2">
                            <div className="bg-background/20 p-1.5 rounded-lg">
                                <Bot size={20} className="text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Travel Assistant</h3>
                                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full p-4">
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex w-max max-w-[90%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm",
                                            msg.role === "user"
                                                ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-muted/90 text-foreground rounded-bl-none border border-primary/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "prose prose-sm dark:prose-invert max-w-none break-words",
                                            msg.role === "user" ? "text-primary-foreground prose-p:text-primary-foreground prose-headings:text-primary-foreground prose-strong:text-primary-foreground" : ""
                                        )}>
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="bg-muted/50 w-max rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-3 bg-background/60 border-t border-white/10 backdrop-blur-md">
                        <form
                            className="flex w-full items-end gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                        >
                            <Textarea
                                placeholder="Ask me about India..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                className="flex-1 bg-background/80 focus-visible:ring-primary/50 min-h-[44px] max-h-32 resize-none py-3"
                            />
                            <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={!input.trim() || isTyping}>
                                <Send size={18} />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
