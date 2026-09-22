import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/animations/PageTransition';
import { CuteLion } from '@/components/animations/CuteLion';
import { Button } from '@/components/ui/Button';

export const ServerError: React.FC = () => {
  const navigate = useNavigate();

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
            <Button onClick={() => window.location.reload()} variant="primary" className="bg-gradient-aurora-blue">
              Wake it up (Retry)
            </Button>
            <Button onClick={() => navigate('/')} variant="ghost">
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
