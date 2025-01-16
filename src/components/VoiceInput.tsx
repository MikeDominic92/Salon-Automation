import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  onTranscriptionComplete: (text: string) => void;
}

export default function VoiceInput({ onTranscriptionComplete }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setError(null);
      
      setTimeout(() => {
        const demoTranscript = "I'd like to book a gel manicure with Sophie next Tuesday at 2 PM";
        setTranscript(demoTranscript);
        setIsRecording(false);
        onTranscriptionComplete(demoTranscript);
      }, 3000);
    } catch (err) {
      setError('Failed to start recording');
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className={`relative p-6 rounded-2xl ${
            isRecording 
              ? 'bg-red-500' 
              : 'bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600'
          } text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-8 h-8" />
              <Loader2 className="w-12 h-12 absolute -top-2 -left-2 animate-spin opacity-50" />
            </>
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </button>
        <div>
          <p className="text-gray-900 font-medium mb-1">
            Book with Voice Command
          </p>
          <p className="text-sm text-gray-600">
            Example: "Book a gel manicure with Sophie next Tuesday at 2 PM"
          </p>
        </div>
      </div>
      
      {isRecording && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <p className="font-medium">Listening to your request...</p>
        </div>
      )}
      
      {transcript && !isRecording && (
        <div className="w-full bg-violet-50 p-4 rounded-xl border border-violet-100">
          <p className="text-violet-700 font-medium mb-1">Transcribed request:</p>
          <p className="text-gray-900">{transcript}</p>
        </div>
      )}
      
      {error && (
        <div className="w-full bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}