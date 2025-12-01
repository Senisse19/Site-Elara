import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import elaraLogo from "@/assets/elara-logo-white.png";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
    timestamp: Date;
    isTyping?: boolean;
}

// Typewriter message component
const TypewriterMessage = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 30);

            return () => clearTimeout(timer);
        } else if (onComplete && currentIndex === text.length) {
            onComplete();
        }
    }, [currentIndex, text, onComplete]);

    return <span>{displayedText}</span>;
};

const InteractiveChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Olá! Bem-vindo à Clínica Vida & Saúde 👋 Sou a Elara, assistente virtual da clínica. Como posso ajudar você hoje?",
            sender: "bot",
            timestamp: new Date(),
            isTyping: false
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
    const [userInput, setUserInput] = useState("");
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const MAX_MESSAGES = 3;

    const scrollToBottom = () => {
        if (messagesEndRef.current && messagesContainerRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);

        return () => clearTimeout(timer);
    }, [messages, isTyping]);

    const sendMessageToAI = async (userMessage: string) => {
        if (messageCount >= MAX_MESSAGES) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: userMessage,
            sender: "user",
            timestamp: new Date(),
            isTyping: false
        };
        setMessages(prev => [...prev, userMsg]);
        setUserInput("");
        setMessageCount(prev => prev + 1);
        setIsTyping(true);

        try {
            // Prepare conversation history for API
            const conversationHistory = [...messages, userMsg].map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text
            }));

            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data = await response.json();
            setIsTyping(false);

            const botMsgId = (Date.now() + 1).toString();
            const botMsg: Message = {
                id: botMsgId,
                text: data.message,
                sender: "bot",
                timestamp: new Date(),
                isTyping: true
            };

            setMessages(prev => [...prev, botMsg]);
            setTypingMessageId(botMsgId);

        } catch (error) {
            console.error('Error sending message:', error);
            setIsTyping(false);

            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
                sender: "bot",
                timestamp: new Date(),
                isTyping: false
            };
            setMessages(prev => [...prev, errorMsg]);
        }
    };

    const handleTypingComplete = (messageId: string) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId ? { ...msg, isTyping: false } : msg
            )
        );
        setTypingMessageId(null);
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (userInput.trim() && messageCount < MAX_MESSAGES) {
            sendMessageToAI(userInput.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const isInputDisabled = messageCount >= MAX_MESSAGES || isTyping || typingMessageId !== null;

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl animate-pulse"></div>

            {/* Chat container with SpotlightCard */}
            <SpotlightCard
                className="relative rounded-3xl"
                spotlightColor="rgba(56, 133, 242, 0.1)"
            >
                <div className="relative glassmorphism rounded-3xl border border-primary/30 shadow-2xl overflow-hidden flex flex-col h-[500px] bg-noise">
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-primary/10 bg-card/50 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center p-1.5 ring-2 ring-primary/20">
                            <img src={elaraLogo} alt="Elara" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground text-sm">Clínica Vida & Saúde</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-xs text-muted-foreground">Atendente IA • Online</p>
                            </div>
                        </div>
                        {messageCount > 0 && (
                            <div className="text-xs text-muted-foreground">
                                {messageCount}/{MAX_MESSAGES}
                            </div>
                        )}
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent scroll-smooth"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                            >
                                {msg.sender === "bot" && (
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                                        <img src={elaraLogo} alt="Elara" className="w-5 h-5 object-contain opacity-80" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                            : "bg-card border border-primary/10 text-foreground rounded-tl-sm"
                                        }`}
                                >
                                    {msg.sender === "bot" && msg.isTyping ? (
                                        <TypewriterMessage
                                            text={msg.text}
                                            onComplete={() => handleTypingComplete(msg.id)}
                                        />
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-2 items-center animate-in fade-in duration-300">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                                    <img src={elaraLogo} alt="Elara" className="w-5 h-5 object-contain opacity-80" />
                                </div>
                                <div className="bg-card border border-primary/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-primary/10 bg-card/30 backdrop-blur-sm">
                        <form onSubmit={handleSendMessage} className="relative">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isInputDisabled}
                                placeholder={
                                    messageCount >= MAX_MESSAGES
                                        ? ""
                                        : isTyping || typingMessageId
                                            ? "Elara está digitando..."
                                            : "Digite sua mensagem..."
                                }
                                className="w-full bg-background/50 border border-primary/10 rounded-full px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all"
                            />
                            {messageCount < MAX_MESSAGES && (
                                <button
                                    type="submit"
                                    disabled={!userInput.trim() || isInputDisabled}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4 text-primary" />
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
};

export default InteractiveChat;
