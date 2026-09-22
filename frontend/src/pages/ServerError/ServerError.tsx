import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/animations/PageTransition';
import { CuteLion } from '@/components/animations/CuteLion';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

export const ServerError: React.FC = () => {
  const [isWaking, setIsWaking] = useState(false);

  const handleWakeUp = async () => {
    setIsWaking(true);
    
    const checkServer = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          window.location.href = '/';
          return true;
        }
      } catch (e) {
        // Still sleeping or error
      }
      return false;
    };

    // Try immediately
    if (await checkServer()) return;

    // Keep trying every 3 seconds
    const interval = setInterval(async () => {
      if (await checkServer()) {
        clearInterval(interval);
      }
    }, 3000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-base relative overflow-hidden px-4">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px] -z-10" />

        <div className="text-center z-10">
          <CuteLion />
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-8 mb-4">
            *Yawn* ... Server is sleeping.
          </h1>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-10">
            Our backend servers are currently taking a sluggish little nap or are temporarily unresponsive. Please try again in a few moments once they wake up!
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={handleWakeUp} 
              disabled={isWaking}
              variant="primary" 
              className="bg-gradient-aurora-blue min-w-[180px]"
            >
              {isWaking ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                  Waking up...
                </>
              ) : (
                "Wake it up (Retry)"
              )}
            </Button>
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="ghost"
              disabled={isWaking}
            >
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
