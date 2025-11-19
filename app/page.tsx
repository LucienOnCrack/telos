'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from '@formspree/react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import TypewriterText from './components/TypewriterText';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'phone' | 'switchboard' | 'partyLine' | 'confirmation'>('intro');
  const [showOptions, setShowOptions] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [submitError, setSubmitError] = useState('');
  const [state, handleSubmit] = useForm('xanvjzwn');

  // Reset showOptions when entering switchboard screen
  useEffect(() => {
    if (currentScreen === 'switchboard') {
      setShowOptions(false);
    }
  }, [currentScreen]);

  // Auto-navigate to confirmation if submission succeeded
  useEffect(() => {
    if (state.succeeded && currentScreen === 'partyLine') {
      setCurrentScreen('confirmation');
    }
  }, [state.succeeded, currentScreen]);

  // Confirmation screen
  if (currentScreen === 'confirmation') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <TypewriterText 
          text="expect a call at 4pm"
          speed={50}
          jitter={20}
          className="text-white text-xl text-center"
        />
      </div>
    );
  }

  // Party line screen with phone number input
  if (currentScreen === 'partyLine') {
    const handlePhoneSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError('');
      
      try {
        // Submit to Formspree
        const formData = new FormData();
        formData.append('phone', phoneNumber || '');
        formData.append('timestamp', new Date().toISOString());
        
        const result = await handleSubmit(formData as any);
        
        // Check if submission was successful
        if (state.succeeded) {
          // Navigate to confirmation
          setCurrentScreen('confirmation');
        } else if (state.errors) {
          setSubmitError('failed to submit. please try again.');
        }
      } catch (error) {
        setSubmitError('something went wrong. please try again.');
      }
    };

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
            speed={50}
            jitter={20}
            className="text-white text-xl text-center"
          />
          <form onSubmit={handlePhoneSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter phone number"
                  className="phone-input"
                  name="phone"
                />
              </div>
              {phoneNumber && phoneNumber.length > 0 && (
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="text-white text-2xl hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-30"
                >
                  {state.submitting ? '...' : '→'}
                </button>
              )}
            </div>
            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
            {state.errors && !submitError && (
              <p className="text-red-500 text-sm">error submitting form. please try again.</p>
            )}
          </form>
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
            speed={50}
            jitter={20}
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
            onClick={() => setCurrentScreen('switchboard')}
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
          onClick={() => setCurrentScreen('phone')}
          className="border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          enter
        </button>
      </div>
    </div>
  );
}
