// /app/superadmin/module/components/AiAssistant.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, User, Zap, Brain,
  ChevronDown, Check, Plus, X, Copy,
  Mic, MicOff, Paperclip, Image, FileSpreadsheet,
  RotateCcw, ThumbsUp, ThumbsDown,
  Shield, Clipboard, ClipboardCheck,
  History, Bookmark, MoreHorizontal, FileText
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  model?: string;
  attachments?: Attachment[];
  copied?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'spreadsheet';
  size: string;
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
  model: string;
  saved?: boolean;
}

interface AIModel {
  id: string;
  name: string;
  version: string;
  description: string;
  performance: string;
  speed: string;
  icon: any;
  color: string;
  badge?: string;
}

const aiModels: AIModel[] = [
  {
    id: 'remi',
    name: 'Remi',
    version: '4.0',
    description: 'Most advanced model',
    performance: '★★★★★',
    speed: 'Balanced',
    icon: Brain,
    color: 'from-violet-600 to-purple-600',
    badge: 'MOST CAPABLE'
  },
  {
    id: 'jb',
    name: 'JB',
    version: '3.5',
    description: 'Great for most tasks',
    performance: '★★★★☆',
    speed: 'Fast',
    icon: Shield,
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'robert',
    name: 'Robert',
    version: '2.1',
    description: 'Quick responses',
    performance: '★★★☆☆',
    speed: 'Very Fast',
    icon: Zap,
    color: 'from-green-600 to-emerald-600'
  }
];

// Mock user data
const currentUser = {
  name: 'Dr. Sarah Johnson',
  firstName: 'Sarah'
};

// Mock recent chats
const recentChats: Chat[] = [
  {
    id: '1',
    title: 'Patient Case Analysis',
    lastMessage: 'Based on the symptoms presented...',
    timestamp: new Date(Date.now() - 3600000),
    model: 'Remi 4.0',
    messages: [],
    saved: true
  },
  {
    id: '2', 
    title: 'Drug Interaction Check',
    lastMessage: 'The combination of these medications...',
    timestamp: new Date(Date.now() - 7200000),
    model: 'JB 3.5',
    messages: []
  },
  {
    id: '3',
    title: 'Lab Results Interpretation',
    lastMessage: 'The blood work shows elevated...',
    timestamp: new Date(Date.now() - 86400000),
    model: 'Remi 4.0',
    messages: []
  }
];

export default function AiAssistant() {
  const [activeChat, setActiveChat] = useState<string>('new');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Welcome message for new chat
    if (activeChat === 'new' && messages.length === 0) {
      setMessages([{
        id: '1',
        content: `Hello ${currentUser.firstName}! I'm ${selectedModel.name}, your medical AI assistant. I'm here to help with clinical decisions, patient analysis, research insights, and healthcare management. What can I help you with today?`,
        sender: 'ai',
        timestamp: new Date(),
        model: `${selectedModel.name} ${selectedModel.version}`
      }]);
    }
  }, [activeChat, selectedModel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputMessage]);

  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputMessage(prev => prev + text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type.includes('image') ? 'image' : 
              file.type.includes('sheet') || file.name.endsWith('.csv') ? 'spreadsheet' : 'document',
        size: `${(file.size / 1024).toFixed(1)}KB`
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const simulateTyping = async (message: string, messageId: string) => {
    setIsTyping(true);
    const words = message.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      const updatedText = currentText;
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content: updatedText } : msg
      ));
      
      await new Promise(resolve => setTimeout(resolve, 40));
    }
    
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      attachments: [...attachments]
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setAttachments([]);
    setIsLoading(true);

    // Different responses based on selected model
    const aiResponses = {
      remi: `I've analyzed your query using advanced medical reasoning. ${attachments.length > 0 ? `I've also processed the ${attachments.length} file(s) you uploaded. ` : ''}Based on current medical literature and clinical guidelines, here's my comprehensive assessment...`,
      jb: `I understand your question. ${attachments.length > 0 ? `I've reviewed your attached files. ` : ''}Let me provide you with a clear, actionable response based on established medical protocols...`,
      robert: `Quick analysis complete. ${attachments.length > 0 ? `Files processed. ` : ''}Here's what you need to know...`
    };

    const response = aiResponses[selectedModel.id as keyof typeof aiResponses];

    setTimeout(async () => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        sender: 'ai',
        timestamp: new Date(),
        model: `${selectedModel.name} ${selectedModel.version}`
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      await simulateTyping(response, aiMessage.id);
    }, 1500);
  };

  const startNewChat = () => {
    setActiveChat('new');
    setMessages([]);
    setShowChatHistory(false);
  };

  const suggestedPrompts = [
    'Analyze patient symptoms and suggest differential diagnosis',
    'Review medication interactions for complex cases',
    'Generate clinical report from lab results',
    'Explain latest treatment guidelines'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Model selector */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${selectedModel.color} flex items-center justify-center`}>
                  <selectedModel.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900">{selectedModel.name} {selectedModel.version}</span>
                {selectedModel.badge && (
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {selectedModel.badge}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* Model dropdown */}
              {showModelSelector && (
                <div className="absolute top-14 left-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-3">
                    {aiModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelSelector(false);
                        }}
                        className={`w-full p-3 rounded-lg mb-2 text-left transition-all ${
                          selectedModel.id === model.id
                            ? 'bg-gray-100 border border-gray-300'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${model.color} flex items-center justify-center`}>
                              <model.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{model.name} {model.version}</span>
                                {model.badge && (
                                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                                    {model.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                <span>{model.description}</span>
                                <span className="mx-1">•</span>
                                <span>{model.speed}</span>
                              </div>
                            </div>
                          </div>
                          {selectedModel.id === model.id && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Center - New chat button */}
            <button
              onClick={startNewChat}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New chat</span>
            </button>

            {/* Right side - Chat history */}
            <div className="relative">
              <button
                onClick={() => setShowChatHistory(!showChatHistory)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <History className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-700">Recent</span>
              </button>

              {/* Chat history dropdown */}
              {showChatHistory && (
                <div className="absolute top-12 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 px-2">Recent Chats</h3>
                    {recentChats.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => {
                          setActiveChat(chat.id);
                          setShowChatHistory(false);
                        }}
                        className="w-full p-3 rounded-lg hover:bg-gray-50 text-left mb-2 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{chat.title}</span>
                              {chat.saved && <Bookmark className="w-3 h-3 text-yellow-500" />}
                            </div>
                            <p className="text-sm text-gray-500 truncate mt-0.5">{chat.lastMessage}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-400">{chat.model}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400">
                                {chat.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {messages.length === 1 && (
            <div className="mb-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  How can I help you today?
                </h1>
                <p className="text-gray-600">
                  Ask me anything about healthcare, medicine, or patient care
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(prompt)}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-left text-sm text-gray-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`mb-6 ${message.sender === 'user' ? 'flex justify-end' : ''}`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] items-start`}>
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-gray-800' 
                      : `bg-gradient-to-r ${selectedModel.color}`
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <selectedModel.icon className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {message.sender === 'user' ? 'You' : message.model}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {message.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs">
                          {attachment.type === 'image' && <Image className="w-3 h-3" />}
                          {attachment.type === 'document' && <FileText className="w-3 h-3" />}
                          {attachment.type === 'spreadsheet' && <FileSpreadsheet className="w-3 h-3" />}
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={`prose prose-sm max-w-none ${
                    message.sender === 'user' ? 'text-gray-800' : 'text-gray-900'
                  }`}>
                    {message.content}
                    {isTyping && message.sender === 'ai' && index === messages.length - 1 && (
                      <span className="inline-block w-1 h-4 bg-blue-500 animate-pulse ml-0.5"></span>
                    )}
                  </div>
                  
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-1 mt-2">
                      <button 
                        onClick={() => handleCopyMessage(message.id, message.content)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors group"
                      >
                        {copiedMessageId === message.id ? (
                          <ClipboardCheck className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                        )}
                      </button>
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                      </button>
                      {index === messages.length - 1 && (
                        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                          <RotateCcw className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && !isTyping && (
            <div className="flex max-w-[85%]">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedModel.color} flex items-center justify-center mr-3`}>
                <selectedModel.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{selectedModel.name}</span>
                  <span className="text-xs text-gray-500">is thinking...</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        {attachments.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 pt-3 pb-2">
            <div className="flex flex-wrap gap-2">
              {attachments.map(attachment => (
                <div key={attachment.id} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                  {attachment.type === 'image' && <Image className="w-4 h-4 text-gray-600" />}
                  {attachment.type === 'document' && <FileText className="w-4 h-4 text-gray-600" />}
                  {attachment.type === 'spreadsheet' && <FileSpreadsheet className="w-4 h-4 text-gray-600" />}
                  <span className="text-sm text-gray-700">{attachment.name}</span>
                  <button 
                    onClick={() => setAttachments(attachments.filter(a => a.id !== attachment.id))}
                    className="p-0.5 rounded hover:bg-gray-200"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-end space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2.5 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-100 hover:bg-red-200' 
                  : 'hover:bg-gray-100'
              }`}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5 text-red-600" />
              ) : (
                <Mic className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            <button 
              onClick={handlePaste}
              className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Paste from clipboard"
            >
              <Clipboard className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                onPaste={(e) => {
                  // Allow native paste to work alongside our paste button
                  e.stopPropagation();
                }}
                placeholder={`Message ${selectedModel.name}...`}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || (!inputMessage.trim() && attachments.length === 0)}
                className={`absolute bottom-2.5 right-2.5 p-2 rounded-lg transition-all ${
                  (inputMessage.trim() || attachments.length > 0) && !isLoading
                    ? 'bg-gray-800 text-white hover:bg-gray-900'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            {selectedModel.name} can make mistakes. Consider checking important info.
          </p>
        </div>
      </div>
    </div>
  );
}