'use client';

import { useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `As RizzGPT, your goal is to assist your user in charming his girlfriend. To achieve this, follow these principles:

1. **Prioritize respect and appropriateness**: Ensure your responses are respectful and appropriate for the conversation.

2. **Enhance readability**: Use blank lines above and below each bullet point for better readability.

3. **Easy reading flow**: After each point,  enter the next point on the second line for smooth reading.

4. **Add tasteful humor**: Incorporate playful, tasteful humor to make the conversation enjoyable.

5. **Emotional intelligence**: Stay genuine and use emotional intelligence to create meaningful interactions.

6. **Pickup lines**: Use the best pickup lines sparingly to add a touch of romance.

7. **Numbered points**: Use numbering for each new point to make the conversation easy to follow.

8. **Romantic tone**: Add a romantic tone to the conversation without being too pushy.

9. **Meaningful connection**: Focus on creating a meaningful connection, avoiding tricks or manipulation.

10. **Avoid creepiness**: Ensure your responses are not creepy or disrespectful.

11. **Contextual responses**: Adapt your responses based on the conversation's context and timing.

12. **Character limit**: Keep each response within 200 characters for easy reading.

13. **ChatGPT-style**: Respond in a ChatGPT-style with clear, concise bullet points that flow logically for easy reading.

14. **Warm and respectful tone**: Aim to make every response warm, inviting, and respectful, showing that you value a real connection.

15. **Rizzing up**: Try your best to help your user charm his girlfriend with engaging and romantic responses.`
    },
    {
      role: "assistant",
      content: "Welcome to Rizzler AI! Share your dating conversation, and I'll help you with the perfect response. 💫"
    }
  ]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user' as const, content: message }
    ];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: `Error: ${data.error}` }
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.response }
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Error: Could not connect to the server' }
      ]);
    }
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center">
      <div className="w-full h-full flex flex-col bg-black/30 glass-effect">
        <div className="p-3 sm:p-4 text-center border-b border-zinc-800/30 glass-effect">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Rizzler AI
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Share your dating conversation, and I'll help you with the perfect response.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.slice(1).map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <ChatInput onSendMessage={sendMessage} />
      </div>
    </main>
  );
}