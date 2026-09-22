import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { useEffect } from "react";

export default function Privacy() {
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
            <h1 className="text-display-md text-text-primary mb-12">Privacy Policy</h1>
            
            <div className="flex flex-col gap-8 text-text-secondary text-body-md">
               <div>
                  <h3 className="text-h4 text-text-primary mb-3">1. Information We Collect</h3>
                  <p>
                     We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                  </p>
               </div>
               
               <div>
                  <h3 className="text-h4 text-text-primary mb-3">2. How We Use Your Information</h3>
                  <p>
                     We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                  </p>
               </div>

               <div>
                  <h3 className="text-h4 text-text-primary mb-3">3. Will Your Information Be Shared with Anyone?</h3>
                  <p>
                     We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                  </p>
               </div>

               <div>
                  <h3 className="text-h4 text-text-primary mb-3">4. Cookies and Similar Technologies</h3>
                  <p>
                     We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                  </p>
               </div>

               <div>
                  <h3 className="text-h4 text-text-primary mb-3">5. Contact Us</h3>
                  <p>
                     If you have questions or comments about this notice, you may email us at contact@dash-it.example.com.
                  </p>
               </div>
            </div>
         </section>

         <Footer />
      </main>
   );
}
