'use client';

import { useState, useEffect, useRef } from 'react';

type RingingTextProps = {
  onDone?: () => void;
};

export default function RingingText({ onDone }: RingingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);
  const hasCalledDoneRef = useRef(false);
  
  const fullText = '[ *ring*... *ring*... *ring*... *ring* ]';
  const typingSpeed = 150;
  const jitter = 40;
  const ringPauseIndices = [13, 27, 41]; // Indices where we pause between rings

  useEffect(() => {
    const typeChar = () => {
      if (currentIndexRef.current < fullText.length) {
        const char = fullText[currentIndexRef.current];
        setDisplayedText(prev => prev + char);
        currentIndexRef.current++;
        
        // Check if we should pause (after a ring)
        const shouldPause = ringPauseIndices.includes(currentIndexRef.current);
        const delay = shouldPause ? 1000 : typingSpeed + Math.random() * jitter;
        
        timeoutRef.current = setTimeout(typeChar, delay);
      } else {
        // All done - call onDone callback
        if (onDone && !hasCalledDoneRef.current) {
          hasCalledDoneRef.current = true;
          timeoutRef.current = setTimeout(() => {
            onDone();
          }, 2000);
        }
      }
    };

    // Start typing
    typeChar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="text-white text-xl">
      {displayedText}
      {currentIndexRef.current < fullText.length && <span className="animate-pulse">|</span>}
    </div>
  );
}
