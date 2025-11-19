/**
 * TypewriterText Component - Usage Examples
 * 
 * This file shows various ways to use the TypewriterText component.
 * You can delete this file - it's just for reference.
 */

import TypewriterText from './TypewriterText';

// Example 1: Basic usage
export function Example1() {
  return (
    <TypewriterText 
      text="Hello, World!" 
      className="text-white text-2xl"
    />
  );
}

// Example 2: Slower typing with more jitter (more human-like)
export function Example2() {
  return (
    <TypewriterText 
      text="This types slower and feels more natural..."
      speed={100}
      jitter={50}
      className="text-white text-xl"
    />
  );
}

// Example 3: Fast typing with no jitter (robotic)
export function Example3() {
  return (
    <TypewriterText 
      text="This types very fast!"
      speed={30}
      jitter={0}
      className="text-white text-lg"
    />
  );
}

// Example 4: Multi-line text
export function Example4() {
  return (
    <TypewriterText 
      text="First line of text\nSecond line of text\nThird line"
      speed={60}
      className="text-white text-base"
    />
  );
}

// Example 5: With start delay
export function Example5() {
  return (
    <TypewriterText 
      text="This starts after 2 seconds"
      startDelay={2000}
      className="text-white text-xl"
    />
  );
}

// Example 6: Looping text
export function Example6() {
  return (
    <TypewriterText 
      text="This text loops forever!"
      speed={70}
      loop={true}
      className="text-white text-xl"
    />
  );
}

// Example 7: With completion callback
export function Example7() {
  return (
    <TypewriterText 
      text="Done typing!"
      speed={60}
      onDone={() => console.log('Typing completed!')}
      className="text-white text-xl"
    />
  );
}

// Example 8: Hero section use case
export function HeroExample() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <TypewriterText 
          text="Welcome to Our Website"
          speed={80}
          jitter={30}
          startDelay={500}
          className="text-white text-6xl font-bold mb-4"
        />
      </div>
    </div>
  );
}

