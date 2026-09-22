import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { getProject } from "@/services/api/projects";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";

export function ProjectDetails() {
   const { slug } = useParams<{ slug: string }>();
   const navigate = useNavigate();
   const lenis = useSmoothScroll();
   const [isLoading, setIsLoading] = useState(true);
   const [project, setProject] = useState<any>(null);

   useEffect(() => {
      // Always scroll to top when page mounts
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: "instant" as any });

      const fetchProject = async () => {
         setIsLoading(true);
         try {
            const data = await getProject(slug!);
            setProject(data);
         } catch (error) {
            console.error("Failed to fetch project:", error);
         } finally {
            setIsLoading(false);
         }
      };

      if (slug) {
         fetchProject();
      }
   }, [slug, lenis]);

   if (isLoading) {
      return (
         <main className="min-h-screen bg-bg-base flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
         </main>
      );
   }

   return (
      <main className="min-h-screen bg-bg-base relative">
         <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
         <Navbar />

         <section className="pt-40 pb-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto min-h-[70vh]">
            <Button onClick={() => navigate(-1)} variant="ghost" className="mb-12 border border-glass-border">
               ← Back to Work
            </Button>
            
            {project ? (
               <div className="flex flex-col gap-8">
                  <h1 className="text-display-md text-text-primary">{project.title || slug}</h1>
                  {/* Additional project details would go here based on API data structure */}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-6">
                  <h2 className="text-h2 text-text-primary">Project Not Found</h2>
                  <p className="text-body-lg text-text-secondary">We couldn't find the project you're looking for.</p>
                  <Button onClick={() => navigate('/work')} variant="primary" className="bg-gradient-aurora-blue">
                     View All Projects
                  </Button>
               </div>
            )}
         </section>

         <Footer />
      </main>
   );
}
