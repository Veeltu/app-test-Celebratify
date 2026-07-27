import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Venue, FilterState } from '../../../types';
import { Bot, Send, Sparkles, User, MapPin, ChevronRight, Scale } from 'lucide-react';

interface Props {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onApplyFilters: (filters: Partial<FilterState>) => void;
}

export const MobileAIChatView: React.FC<Props> = ({ venues, onSelectVenue, onApplyFilters }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm0',
      sender: 'assistant',
      text: 'Cześć! Jestem Twoim Asystentem Imprezowym PartySpot AI. 🤖✨\n\nOpisz, czego szukasz własnymi słowami — np.: „Szukam kameralnej sali w Lesznie dla 20 osób” lub kliknij jedną z szybkich opcji poniżej!',
      timestamp: 'Teraz'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Kameralna sala w Lesznie dla 20 osób',
    'Szukam sali na 80 osób pod Krakowem w sierpniu',
    'Chrzciny dla 30 osób Gdańsk z ogródkiem'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI logic simulation
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedCity = 'Wszystkie';
      if (lower.includes('krakow') || lower.includes('krakowem')) matchedCity = 'Kraków';
      else if (lower.includes('warszaw') || lower.includes('stolic')) matchedCity = 'Warszawa';
      else if (lower.includes('gdańsk') || lower.includes('morzem') || lower.includes('trojmiast')) matchedCity = 'Gdańsk';
      else if (lower.includes('wrocław')) matchedCity = 'Wrocław';
      else if (lower.includes('leszn')) matchedCity = 'Leszno';

      let matchedGuests = 0;
      const guestMatch = lower.match(/(\d+)\s*(osób|osob|gości|gosci)/);
      if (guestMatch) {
        matchedGuests = parseInt(guestMatch[1]);
      }

      let matchedPrice = 0;
      const priceMatch = lower.match(/(\d+)\s*(zł|zl)/);
      if (priceMatch) {
        matchedPrice = parseInt(priceMatch[1]);
      }

      // Filter venues
      const matches = venues.filter(v => {
        if (matchedCity !== 'Wszystkie' && v.city !== matchedCity) return false;
        if (matchedGuests > 0 && v.maxGuests < matchedGuests) return false;
        if (matchedPrice > 0 && v.priceFrom > matchedPrice + 50) return false;
        return true;
      });

      const recommendedIds = matches.map(m => m.id);

      let replyText = `Przeanalizowałem Twoje zapytanie! `;
      if (matches.length > 0) {
        replyText += `Oto najlepsze lokale pasujące do Twoich kryteriów (${matchedCity !== 'Wszystkie' ? `Lokalizacja: ${matchedCity}, ` : ''}${matchedGuests > 0 ? `Goście: ~${matchedGuests}, ` : ''}${matchedPrice > 0 ? `Budżet: do ${matchedPrice} zł/os.` : ''}):`;
      } else {
        replyText += `Nie znalazłem idealnego dopasowania przy ścisłych parametrach, ale sprawdź nasze najbardziej polecane sale na ten rodzaj wydarzenia:`;
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedVenueIds: recommendedIds.length > 0 ? recommendedIds : [venues[0].id, venues[1].id],
        appliedFilters: {
          city: matchedCity,
          guests: matchedGuests,
          maxPricePerGuest: matchedPrice
        }
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-md mx-auto bg-slate-50">
      {/* Header */}
      <div className="px-4 py-3 bg-white/90 border-b border-slate-200 flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-brand-500 flex items-center justify-center text-white shadow-md">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            Asystent AI PartySpot
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">Przekształca opis w konkretne dopasowane oferty</p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';
          const recVenues = msg.recommendedVenueIds
            ? venues.filter(v => msg.recommendedVenueIds?.includes(v.id))
            : [];

          return (
            <div key={msg.id} className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}>
              {isBot && (
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 text-xs shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${isBot ? 'text-left' : 'text-right'}`}>
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isBot
                    ? 'bg-white border border-slate-200 text-slate-700'
                    : 'bg-brand-600 text-white font-medium rounded-br-none shadow-md shadow-brand-500/20'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Recommended Venues Cards inside Chat */}
                {recVenues.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {recVenues.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => onSelectVenue(rec)}
                        className="bg-white border border-brand-200 hover:border-brand-500 rounded-xl p-2.5 flex items-center gap-3 cursor-pointer shadow-md active:scale-98 transition-transform"
                      >
                        <img
                          src={rec.images[0]}
                          alt={rec.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{rec.name}</h4>
                          <p className="text-[10px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-brand-600" /> {rec.city}
                          </p>
                          <span className="text-xs font-extrabold text-brand-600 mt-0.5 block">
                            od {rec.priceFrom} zł / os.
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-slate-400 px-1 block font-medium">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 w-fit shadow-sm">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span className="font-medium">AI analizuje ofertę i wolne terminy...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] px-3 py-1.5 rounded-full border border-slate-200 whitespace-nowrap font-medium transition-colors"
          >
            💬 {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <input
          type="text"
          placeholder="Napisz np. Wesele 100 osób Kraków w sierpniu..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 rounded-xl px-3.5 py-2.5 border border-slate-200 outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-600/20 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
