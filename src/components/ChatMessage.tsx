type ChatMessageProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  const formatContent = (content: string) => {
    if (message.role === 'assistant') {
      const paragraphs = content.split('\n');
      
      return paragraphs.map((paragraph, index) => {
        if (paragraph.match(/^\d+\./)) {
          const [numberPart, ...rest] = paragraph.split(/\*\*(.*?)\*\*/);
          const headingAndDescription = rest.join('');
          
          const [heading, ...description] = headingAndDescription.split(':');
          
          return (
            <div key={index} className="mb-4">
              <div className="mb-1">
                <span className="text-lg">{numberPart}</span>
                <span className="font-bold text-lg">{heading}</span>
                {description.length > 0 && ':'}
              </div>
              {description.length > 0 && (
                <div className="pl-4 text-base font-normal">
                  {description.join(':')}
                </div>
              )}
            </div>
          );
        }
        return <p key={index} className="mb-2 leading-relaxed">{paragraph}</p>;
      });
    }
    return content;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-appear`}>
      <div
        className={`max-w-[85%] p-4 rounded-2xl message-bubble ${
          isUser
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white neon-border'
            : 'glass-effect text-white'
        }`}
      >
        <div className="message-text">
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
}