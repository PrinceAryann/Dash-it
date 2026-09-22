import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-bg-base relative">
      <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <span className="text-mono-tag text-accent-cyan uppercase mb-6 block">Who We Are</span>
        <h1 className="text-display-xl text-text-primary mb-8 max-w-[800px]">
          Why <span className="font-secondary italic text-gradient gradient-aurora-blue pr-2">Dash-it?</span>
        </h1>
        <div className="flex flex-col gap-6 max-w-[640px] mb-16">
          <p className="text-body-lg text-text-secondary">
            We started Dash-it after seeing too many websites built from the same templates, overloaded with unnecessary effects, outdated layouts, and poor user experience.
          </p>
          <p className="text-body-lg text-text-secondary">
            We wanted to build something different: products that are clean, fast, secure, and designed around the people who use them—not around trends.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto flex flex-col items-center">
        <span className="text-caption text-text-secondary uppercase tracking-widest mb-8">— Our Philosophy</span>
        <h2 className="text-h2 font-secondary italic text-gradient gradient-aurora-blue text-center max-w-[680px] mb-8">
          "Good design isn't decoration. It's communication."
        </h2>
        <p className="text-body-lg text-text-secondary text-center max-w-[560px]">
          Every pixel should have a purpose. Every interaction should feel natural. Every feature should solve a real problem.
        </p>
      </section>

      {/* Principles Section */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <span className="text-mono-tag text-accent-cyan uppercase mb-8 block">The Dash-it Approach</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Modern by Default",
              desc: "We build interfaces that feel current without chasing short-lived trends. Clean layouts, thoughtful typography, and responsive design come first."
            },
            {
              num: "02",
              title: "Aesthetics + Security",
              desc: "A beautiful website means very little if it isn't secure. We treat design and security as equal priorities throughout development."
            },
            {
              num: "03",
              title: "Clients Stay in the Loop",
              desc: "We don't disappear after the first meeting. You'll see progress, give feedback, and understand what's being built at every stage of the project."
            }
          ].map((principle) => (
            <div key={principle.num} className="flex flex-col gap-4">
              <span className="text-h3 font-secondary text-text-secondary opacity-50">{principle.num}</span>
              <h3 className="text-h4 text-text-primary">{principle.title}</h3>
              <p className="text-body-md text-text-secondary">{principle.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <Card level={2} className="p-12 md:p-16 rounded-[3rem]">
          <span className="text-mono-tag text-accent-cyan uppercase mb-6 block">How Dash-it Works</span>
          <h2 className="text-h2 text-text-primary mb-6">Our Process</h2>
          <p className="text-body-lg text-text-secondary mb-16 max-w-[600px]">
            Transparent from the first conversation to the final launch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Discover", desc: "Understand your idea, audience, goals, and budget." },
              { title: "Design", desc: "Create layouts and prototypes with your feedback at every milestone." },
              { title: "Develop", desc: "Build a fast, responsive, and secure product with modern technologies." },
              { title: "Launch", desc: "Deploy, optimize, and help you understand everything we've built." }
            ].map((step, index) => (
              <div key={step.title} className="flex flex-col gap-4 relative">
                <div className="w-12 h-12 rounded-full glass-2 flex items-center justify-center text-primary-400 mb-2">
                  <span className="font-mono text-sm">0{index + 1}</span>
                </div>
                <h4 className="text-h5 text-text-primary">{step.title}</h4>
                <p className="text-body-sm text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* AI Section */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <span className="text-mono-tag text-accent-cyan uppercase mb-6 block">How We Use AI</span>
          <h2 className="text-h2 text-text-primary mb-6">AI is part of our toolkit — not our replacement for thinking.</h2>
          <p className="text-body-lg text-text-secondary mb-8">
            We use AI where it genuinely adds value: research, prototyping, automation, testing, and speeding up repetitive development tasks.
          </p>
          <div className="flex flex-col gap-4">
            <h4 className="text-h6 text-text-primary">What we don't do:</h4>
            <p className="text-body-md text-text-secondary">Copy-paste AI-generated websites and ship generic products.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 glass-1 p-8 rounded-2xl">
          <p className="text-body-md text-text-secondary">
            Every design decision, architecture choice, animation, and user experience is reviewed and refined by our team before it reaches a client.
          </p>
          <div className="border-t border-glass-border pt-6 flex flex-col gap-3">
            <p className="text-body-md text-text-primary font-medium">✓ AI helps us build faster.</p>
            <p className="text-body-md text-text-primary font-medium">✓ Humans make the final decisions.</p>
            <p className="text-body-md text-text-primary font-medium">✓ Quality comes before speed.</p>
          </div>
        </div>
      </section>

      {/* Join Dash-it Section */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-gravity-pink opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <span className="text-mono-tag text-accent-cyan uppercase mb-6 block relative z-10">Join Dash-it</span>
        <h2 className="text-h2 text-text-primary mb-6 relative z-10 max-w-[600px]">
          We're building more than projects. We're building a team.
        </h2>
        <div className="flex flex-col md:flex-row gap-12 relative z-10">
          <p className="text-body-lg text-text-secondary max-w-[480px]">
            Dash-it is actively looking for talented developers, designers, and creators who care about building quality products and learning together.
          </p>
          <div className="flex flex-col gap-6 max-w-[400px]">
            <p className="text-body-md text-text-secondary">
              If you're passionate about web development, UI/UX, AI/ML, or mobile apps, we'd love to hear from you.
            </p>
            <Button variant="ghost" className="w-fit p-0 hover:bg-transparent hover:text-primary-400 text-text-primary">
              View open roles →
            </Button>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        <span className="text-mono-tag text-accent-cyan uppercase mb-6 block">Where We're Heading</span>
        <h2 className="text-h2 text-text-primary mb-6 max-w-[700px]">
          Today's websites. Tomorrow's intelligent products.
        </h2>
        <p className="text-body-lg text-text-secondary max-w-[640px] mb-8">
          Dash-it began with web applications, but that's only the first chapter. We're expanding into mobile app development, AI-powered products, machine learning solutions, automation tools, and scalable digital platforms for businesses and startups.
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-5 max-w-[1200px] mx-auto z-10 relative mb-32">
        <Card level={3} className="w-full rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-electric-violet opacity-10 transition-opacity duration-500 group-hover:opacity-15" />
          <div className="w-3 h-3 rounded-full bg-accent-cyan mb-8 shadow-glow-primary group-hover:scale-150 transition-transform duration-500" />
          <span className="text-mono-tag text-accent-cyan uppercase mb-4 block relative z-10">Let's Build Together</span>
          <h2 className="text-display-xl text-text-primary mb-6 relative z-10">Have an idea? Let's turn it into something real.</h2>
          <p className="text-body-lg text-text-secondary max-w-[600px] mb-12 relative z-10">
            Whether you're launching a startup, growing a local business, or building your next product, Dash-it is ready to design, develop, and launch it with you. Bring the vision. We'll build it—with clarity, transparency, and craftsmanship.
          </p>
          <Button onClick={() => navigate("/contact")} variant="primary" size="lg" className="bg-gradient-aurora-blue group relative z-10">
            Start Your Project
            <span className="inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 text-xl"></span>
          </Button>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
