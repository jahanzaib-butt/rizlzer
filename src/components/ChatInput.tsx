import { useState } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800/30 glass-effect backdrop-blur-lg">
      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-6 py-3 bg-black/20 border border-zinc-700/50 rounded-full focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white placeholder-zinc-400 transition-all"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-all font-medium shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
        >
          Send
        </button>
      </div>
    </form>
  );
}