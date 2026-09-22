import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { useEffect } from "react";

export default function Terms() {
   const lenis = useSmoothScroll();

   useEffect(() => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: "instant" as any });
   }, [lenis]);

   return (
      <main className="min-h-screen bg-bg-base relative">
         <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
         <Navbar />
         
         <section className="pt-40 pb-16 px-5 md:px-10 lg:px-24 max-w-[800px] mx-auto min-h-[70vh]">
            <span className="text-mono-tag text-accent-cyan uppercase mb-6 block">Legal Information</span>
            <h1 className="text-display-md text-text-primary mb-12">Terms and Conditions</h1>
            
            <div className="flex flex-col gap-8 text-text-secondary text-body-md">
               <div>
                  <h3 className="text-h4 text-text-primary mb-3">1. Agreement to Terms</h3>
                  <p>
                     These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Dash-it ("Company", "we", "us", or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                  </p>
               </div>
               
               <div>
                  <h3 className="text-h4 text-text-primary mb-3">2. Intellectual Property Rights</h3>
                  <p>
                     Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
                  </p>
               </div>

               <div>
                  <h3 className="text-h4 text-text-primary mb-3">3. User Representations</h3>
                  <p>
                     By using the Site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete; you will maintain the accuracy of such information and promptly update such registration information as necessary.
                  </p>
               </div>

               <div>
                  <h3 className="text-h4 text-text-primary mb-3">4. Governing Law</h3>
                  <p>
                     These conditions are governed by and interpreted following the laws of India, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded.
                  </p>
               </div>

               <div>
                  <h3 className="text-h4 text-text-primary mb-3">5. Contact Us</h3>
                  <p>
                     In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at contact@dash-it.example.com.
                  </p>
               </div>
            </div>
         </section>

         <Footer />
      </main>
   );
}
