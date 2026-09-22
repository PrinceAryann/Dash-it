import { useState, useEffect } from "react";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";

export default function Work() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("API did not return an array:", data);
          setProjects([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-bg-base relative flex flex-col">
      <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
      <Navbar />

      <section className="pt-56 pb-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto w-full">
        <div className="flex items-end gap-6 mb-8">
           <h1 className="text-display-xl text-text-primary">Selected Work</h1>
           <span className="text-body-md text-text-secondary mb-2">{projects.length} {projects.length === 1 ? 'Project' : 'Projects'}</span>
        </div>
        <p className="text-body-lg text-text-secondary max-w-[560px] mb-12">
           A collection of interfaces, brands, and digital experiences engineered for calm and clarity.
        </p>

        {/* Filters */}
        {projects.length > 0 && (
          <div className="flex flex-row items-center gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0">
             {["All", "Branding", "Product Design", "Web Design", "Motion"].map((filter, i) => (
                <button 
                   key={filter} 
                   className={`shrink-0 snap-start px-4 py-2 rounded-pill text-caption transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.97] ${i === 0 ? "bg-primary-500 text-white shadow-soft-sm" : "glass-1 text-text-secondary hover:text-text-primary"}`}
                >
                   {filter}
                </button>
             ))}
          </div>
        )}
      </section>

      <section className="pb-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto w-full flex-1">
         {isLoading ? (
            <div className="flex justify-center items-center h-64">
               <span className="text-text-secondary text-body-lg">Loading...</span>
            </div>
         ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
               <h3 className="text-h3 text-text-primary mb-2">Work will be uploaded soon</h3>
               <p className="text-text-secondary">We are currently curating our best projects for display.</p>
            </div>
         ) : (
            <>
               <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {projects.map((item, i) => (
                     <Card key={item.id || i} level={2} className="w-full break-inside-avoid overflow-hidden group">
                       <div className={`w-full relative overflow-hidden bg-bg-elevated-1 ${i % 3 === 0 ? 'aspect-[4/5]' : i % 2 === 0 ? 'aspect-square' : 'aspect-video'}`}>
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 bg-bg-elevated-2" />
                          )}
                          
                          {/* Metadata Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 z-10">
                             <span className="text-mono-tag text-accent-cyan uppercase mb-2">{item.features?.[0] || "Web Design"}</span>
                             <h3 className="text-h3 text-text-primary">{item.title}</h3>
                          </div>
                       </div>
                     </Card>
                  ))}
               </div>
               
               {projects.length > 6 && (
                 <div className="mt-24 flex justify-center">
                    <Button variant="ghost">Load more work</Button>
                 </div>
               )}
            </>
         )}
      </section>

      <Footer />
    </main>
  );
}
