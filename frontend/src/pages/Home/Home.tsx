import { useState, useEffect } from "react";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Button } from "@/components/ui";
import { Card } from "@/components/ui";
import { HeroProfile } from "@/components/three";
import { useNavigate } from "react-router-dom";
import { Fingerprint, MonitorSmartphone, PenTool, Sparkles } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({ next_free_timeline: "Available for new projects — Q1 2027", is_hiring: false });
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/site-settings/').then(res => res.json()).then(data => setSettings(data)).catch(console.error);
    fetch('/api/projects/').then(res => res.json()).then(data => setProjects(data.filter((p: any) => p.is_featured))).catch(console.error);
    
    // Record unique visitor
    fetch('/api/analytics/visit', { method: 'POST' }).catch(console.error);
  }, []);
  
  return (
    <main className="min-h-screen bg-bg-base relative">
      <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col pt-40 pb-12 px-5 overflow-hidden">
        {/* Ambient background blur blobs - removed based on feedback */}

        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <div className="flex flex-col items-start gap-8">
            <div className="glass-2 rounded-pill px-4 py-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
              <span className="text-caption text-text-primary uppercase tracking-widest">
                {settings.next_free_timeline || "Available for new projects — Q1 2027"}
              </span>
            </div>

            <h1 
              className="text-display-hero text-text-primary max-w-[700px] whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: settings.hero_title || "We build websites <br /><span class='font-secondary italic text-gradient gradient-aurora-blue pr-4'> people  </span> remember." }}
            />

            <p className="text-body-lg text-text-secondary max-w-[560px]">
              {settings.hero_subtitle || "You bring the idea. We turn it into a fast, modern website that looks good, works smoothly, and grows with your business."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto bg-gradient-aurora-blue">
                See Our Work
              </Button>
              <Button onClick={() => navigate("/contact")} variant="ghost" size="lg" className="w-full sm:w-auto">
                Start Your Project
              </Button>
            </div>
          </div>

          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[800px] flex items-center justify-center">
            <HeroProfile developerName={settings.developer_name} />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto z-10 relative">
        <div className="flex items-end justify-between mb-24">
          <h2 className="text-h2 text-text-primary">Selected Work</h2>
          <Button variant="ghost" className="hidden sm:flex">View all →</Button>
        </div>

        <div className="flex flex-row md:flex-col gap-6 md:gap-24 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          {projects.length > 0 ? projects.map((item, i) => (
            <Card key={item.id} level={2} className="min-w-[85vw] md:min-w-full w-full h-[60vh] md:h-[70vh] flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden group snap-center">
              {/* Image Side */}
              <div className={`w-full md:w-[60%] h-1/2 md:h-full relative overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <div className="absolute inset-0 bg-bg-elevated-2 transition-transform duration-700 group-hover:scale-[1.04]" />
                )}
              </div>

              {/* Info Side */}
              <div className="w-full md:w-[40%] h-1/2 md:h-full p-6 md:p-10 lg:p-16 flex flex-col justify-center md:justify-end bg-bg-elevated-1/50 backdrop-blur-md">
                <span className="text-mono-tag text-accent-cyan uppercase mb-2 md:mb-4">Featured Work</span>
                <h3 className="text-h2 text-text-primary mb-2 md:mb-4">{item.title}</h3>
                <p className="text-body-md text-text-secondary mb-4 md:mb-8 max-w-[360px] line-clamp-2 md:line-clamp-none">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-6 md:mb-12">
                  {item.features?.slice(0, 3).map((f: string) => (
                     <span key={f} className="px-3 py-1 glass-1 rounded-pill text-caption text-text-secondary">{f}</span>
                  ))}
                </div>
                <Button variant="ghost" onClick={() => navigate(`/projects/${item.slug}`)} className="w-fit -ml-4 mt-auto md:mt-0">View case study →</Button>
              </div>
            </Card>
          )) : (
            <div className="text-center text-text-secondary py-12 w-full">No featured projects yet.</div>
          )}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto z-10 relative">
        <h2 className="text-h2 text-text-primary mb-16">What we do</h2>
        <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          {[
            { title: "Brand Identity", desc: "Logos, colors, and visual systems that give your brand a clear personality.", icon: Fingerprint },
            { title: "Web Design", desc: "Responsive websites that load fast, look premium, and are easy to use on every device.", icon: MonitorSmartphone },
            { title: "UI/UX Design", desc: "Interfaces that help users find what they need without thinking twice.", icon: PenTool },
            { title: "Motion & Prototyping", desc: "Interactive animations and prototypes that make ideas feel real before development begins.", icon: Sparkles }
          ].map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} level={1} hoverable className="min-w-[80vw] md:min-w-0 snap-center p-8 flex flex-col gap-6 group">
                <div className="w-14 h-14 rounded-full glass-2 flex items-center justify-center text-primary-400 mb-2 transition-colors duration-300 group-hover:bg-primary-500/10">
                  <Icon className="w-6 h-6 stroke-[1.5px]" />
                </div>
                <h4 className="text-h4 text-text-primary">{service.title}</h4>
                <p className="text-body-sm text-text-secondary">{service.desc}</p>
                <Button variant="ghost" className="w-fit p-0 hover:bg-transparent hover:text-text-primary -ml-2 text-primary-400 mt-auto">Learn more →</Button>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-5 max-w-[1200px] mx-auto z-10 relative">
        <Card level={3} className="w-full rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-electric-violet opacity-10" />
          <div className="w-3 h-3 rounded-full bg-accent-cyan mb-8 shadow-glow-primary" />
          <h2 className="text-display-xl text-text-primary mb-6">Have an idea? Let's build it right.</h2>
          <p className="text-body-lg text-text-secondary max-w-[500px] mb-12">
            Tell us what you're planning. We'll help shape the design, choose the right approach, and build something you'll be proud to launch.
          </p>
          <Button onClick={() => navigate("/contact")} variant="primary" size="lg" className="bg-gradient-aurora-blue">
            Start Your Project
          </Button>
        </Card>
      </section>

      <Footer />
    </main >
  );
}
