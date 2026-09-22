import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

export function NotFound() {
   const navigate = useNavigate();

   return (
      <main className="min-h-screen bg-bg-base relative flex flex-col">
         <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
         <Navbar />

         <section className="flex-1 flex flex-col items-center justify-center px-5 py-32 relative text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-cyan opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
            
            <h1 className="text-[120px] md:text-[180px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-secondary/20 font-bold mb-6">
               404
            </h1>
            
            <h2 className="text-display-md text-text-primary mb-6">
               Page not found
            </h2>
            
            <p className="text-body-lg text-text-secondary max-w-md mx-auto mb-10">
               The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Button onClick={() => navigate('/')} variant="primary" size="lg" className="bg-gradient-aurora-blue">
               Return Home
            </Button>
         </section>

         <Footer />
      </main>
   );
}
