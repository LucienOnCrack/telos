'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import TypewriterText from './components/TypewriterText';
import RingingText from './components/RingingText';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'doorOpening' | 'phone' | 'calling' | 'switchboard' | 'partyLine' | 'confirmation'>('intro');
  const [showOptions, setShowOptions] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Reset showOptions when entering switchboard screen
  useEffect(() => {
    if (currentScreen === 'switchboard') {
      setShowOptions(false);
    }
  }, [currentScreen]);

  // Confirmation screen
  if (currentScreen === 'confirmation') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <TypewriterText 
          text="expect a call at 4pm"
          speed={150}
          jitter={40}
          className="text-white text-xl text-center"
        />
      </div>
    );
  }

  // Party line screen with phone number input
  if (currentScreen === 'partyLine') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-8 max-w-2xl w-full">
          <Image 
            src="/images/phone-removebg-preview.png" 
            alt="Phone"
            width={150}
            height={150}
            priority
          />
          <TypewriterText 
            text="alright, let's get you on the list. what's your digits?"
            speed={150}
            jitter={40}
            className="text-white text-xl text-center"
          />
          <div className="flex items-center gap-2 w-full max-w-md">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="enter phone number"
              className="bg-black border border-white text-white px-6 py-4 text-center focus:outline-none focus:bg-white focus:text-black transition-colors flex-1"
            />
            {phoneNumber.length > 0 && (
              <button
                onClick={() => setCurrentScreen('confirmation')}
                className="text-white text-2xl hover:opacity-70 transition-opacity cursor-pointer"
              >
                →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Switchboard screen with options
  if (currentScreen === 'switchboard') {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-8 max-w-2xl w-full">
          <Image 
            src="/images/phone-removebg-preview.png" 
            alt="Phone"
            width={150}
            height={150}
            priority
          />
          <TypewriterText 
            text="welcome to the telos house switchboard, how can i help you today"
            speed={150}
            jitter={40}
            className="text-white text-xl text-center"
            onDone={() => {
              setTimeout(() => setShowOptions(true), 800);
            }}
          />
          {showOptions && (
            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="border border-white text-white px-6 py-4 hover:bg-white hover:text-black transition-colors cursor-pointer">
                What is telos house?
              </button>
              <button className="border border-white text-white px-6 py-4 hover:bg-white hover:text-black transition-colors cursor-pointer">
                Who are you?
              </button>
              <button className="border border-white text-white px-6 py-4 hover:bg-white hover:text-black transition-colors cursor-pointer">
                ?
              </button>
              <button 
                onClick={() => setCurrentScreen('partyLine')}
                className="border border-white text-white px-6 py-4 hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                I want to party
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Door opening screen
  if (currentScreen === 'doorOpening') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <TypewriterText 
          text="[ *door opens* ]"
          speed={150}
          jitter={40}
          className="text-white text-xl"
          onDone={() => {
            setTimeout(() => {
              setCurrentScreen('phone');
            }, 1500);
          }}
        />
      </div>
    );
  }

  // Calling screen with ringing sound
  if (currentScreen === 'calling') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <Image 
            src="/images/phone-removebg-preview.png" 
            alt="Phone"
            width={150}
            height={150}
            priority
          />
          <RingingText onDone={() => setCurrentScreen('switchboard')} />
        </div>
      </div>
    );
  }

  // Phone screen with call button
  if (currentScreen === 'phone') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <Image 
            src="/images/phone-removebg-preview.png" 
            alt="Phone"
            width={150}
            height={150}
            priority
          />
          <button 
            onClick={() => setCurrentScreen('calling')}
            className="border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            call
          </button>
        </div>
      </div>
    );
  }

  // Initial screen with red phone box
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Image 
          src="/images/telephone.png" 
          alt="Telephone"
          width={150}
          height={150}
          priority
        />
        <button 
          onClick={() => setCurrentScreen('doorOpening')}
          className="border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          enter
        </button>
      </div>
    </div>
  );
}
