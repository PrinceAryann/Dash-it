import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-bg-base relative">
      <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <h1 className="text-display-xl text-text-primary mb-8 max-w-[800px]">
          We engineer <span className="font-secondary italic text-gradient gradient-aurora-blue pr-2">digital experiences</span> that solve real problems.
        </h1>
        <p className="text-body-lg text-text-secondary max-w-[640px] mb-16">
          From robust web applications to comprehensive brand identities. We build products that are clean, fast, secure, and designed around the people who use them.
        </p>

        {/* Trust Strip / Timeline */}
        <div className="mt-16 pt-16 border-t border-glass-border">
          <div className="relative">
            {/* Horizontal Line connecting nodes */}
            <div className="hidden lg:block absolute top-[11px] left-6 right-[20%] h-[2px] bg-gradient-to-r from-glass-border-strong via-glass-border to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {[
                { title: "Design & Development", desc: "Everything built from scratch." },
                { title: "Security First", desc: "Security isn't an afterthought." },
                { title: "Client Involvement", desc: "You're part of the development journey." },
                { title: "Post-Launch Support", desc: "2 months of maintenance included." }
              ].map((item, index) => (
                <div key={item.title} className="flex flex-col gap-4 relative z-10 group">
                  <div className="w-6 h-6 rounded-full glass-2 flex items-center justify-center mb-1">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-accent-cyan shadow-glow-primary scale-125' : 'bg-text-secondary/50 group-hover:bg-primary-400 group-hover:scale-110'}`} />
                  </div>
                  <h4 className="text-caption text-text-primary uppercase tracking-widest">{item.title}</h4>
                  <p className="text-body-sm text-text-secondary max-w-[200px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Cards */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Service 1 */}
          <Card level={2} className="p-10 md:p-12 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-aurora-blue opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 group-hover:opacity-10 transition-opacity" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-primary" />
              <span className="text-caption text-text-secondary uppercase tracking-widest">Primary Service</span>
            </div>
            <div>
              <h3 className="text-h3 text-text-primary mb-2">Web Application Development</h3>
              <p className="text-caption text-accent-cyan uppercase tracking-widest mb-6">Startups • Dashboards • Business Tools</p>
              <p className="text-body-md text-text-secondary">We build custom web applications that solve real business problems—from internal dashboards to customer-facing platforms.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-body-md text-text-primary font-medium mb-4">What we build</h4>
                <ul className="flex flex-col gap-3 text-body-sm text-text-secondary">
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Startup MVPs</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Business dashboards</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Booking & management systems</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Admin panels</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Custom web portals</li>
                </ul>
              </div>
              <div>
                <h4 className="text-body-md text-text-primary font-medium mb-4">Included</h4>
                <ul className="flex flex-col gap-3 text-body-sm text-text-secondary">
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Authentication</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Database</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> API Integration</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Responsive Design</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Deployment</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Service 2 */}
          <Card level={1} className="p-10 md:p-12 flex flex-col gap-6">
            <div className="mt-8">
              <h3 className="text-h3 text-text-primary mb-2">Website Design & Development</h3>
              <p className="text-caption text-text-secondary uppercase tracking-widest mb-6">Businesses • Portfolios • Landing Pages</p>
              <p className="text-body-md text-text-secondary">A website is often the first impression of your business. We make sure it's one worth remembering.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              <div>
                <h4 className="text-body-md text-text-primary font-medium mb-4">Perfect for</h4>
                <ul className="flex flex-col gap-3 text-body-sm text-text-secondary">
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Local businesses</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Restaurants & cafés</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Personal portfolios</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Events & organizations</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Startup landing pages</li>
                </ul>
              </div>
              <div>
                <h4 className="text-body-md text-text-primary font-medium mb-4">Every website includes</h4>
                <ul className="flex flex-col gap-3 text-body-sm text-text-secondary">
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Mobile Responsive</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> SEO Basics</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Performance Optimization</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Accessibility</li>
                  <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Analytics Setup</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Service 3 */}
          <Card level={1} className="p-10 md:p-12 flex flex-col gap-6">
            <div className="mt-8">
              <h3 className="text-h3 text-text-primary mb-2">Brand Identity & UI/UX Design</h3>
              <p className="text-caption text-text-secondary uppercase tracking-widest mb-6">Logos • Design Systems • User Experience</p>
              <p className="text-body-md text-text-secondary">Good branding helps people recognize you. Good UI helps them trust you.</p>
            </div>

            <div className="mt-6">
              <h4 className="text-body-md text-text-primary font-medium mb-4">What you'll receive</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm text-text-secondary">
                <div className="flex items-center gap-2"><span className="text-primary-400">✓</span> Logo Design</div>
                <div className="flex items-center gap-2"><span className="text-primary-400">✓</span> Color Palette & Typography</div>
                <div className="flex items-center gap-2"><span className="text-primary-400">✓</span> Brand Guidelines</div>
                <div className="flex items-center gap-2"><span className="text-primary-400">✓</span> Wireframes</div>
                <div className="flex items-center gap-2"><span className="text-primary-400">✓</span> High-Fidelity UI Designs</div>
                <div className="flex items-center gap-2"><span className="text-primary-400">✓</span> Interactive Prototypes</div>
              </div>
            </div>
          </Card>

          {/* Service 4 */}
          <Card level={2} className="p-10 md:p-12 flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gravity-pink opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 group-hover:opacity-10 transition-opacity" />
            <div className="mt-8 relative z-10">
              <h3 className="text-h3 text-text-primary mb-2">AI & Intelligent Products</h3>
              <p className="text-caption text-accent-cyan uppercase tracking-widest mb-6">Expanding Dash-it</p>
              <p className="text-body-md text-text-secondary">Dash-it is growing beyond websites. We're building AI-powered products that automate workflows and add intelligence where it actually helps.</p>
            </div>

            <div className="mt-6 relative z-10">
              <h4 className="text-body-md text-text-primary font-medium mb-4">Coming to Dash-it</h4>
              <ul className="flex flex-col gap-3 text-body-sm text-text-secondary mb-6">
                <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> AI Chatbots</li>
                <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Machine Learning Integrations</li>
                <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Business Automation</li>
                <li className="flex items-center gap-2"><span className="text-primary-400">✓</span> Custom AI Features for Web Apps</li>
              </ul>
              <div className="inline-block px-3 py-1 glass-1 rounded-sm text-caption text-primary-400">
                This is an active expansion area for Dash-it.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <h2 className="text-h2 text-text-primary mb-12 text-center">Every Dash-it project includes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Project Walkthroughs", desc: "Regular updates so you always know what's being built." },
            { title: "2 Months Maintenance", desc: "Bug fixes, minor improvements, and technical support after launch." },
            { title: "Hosting & Deployment", desc: "We'll deploy your project and make sure it's running correctly." },
            { title: "Domain Setup", desc: "Connecting your custom domain and configuring DNS." },
            { title: "Performance Optimization", desc: "Speed, responsiveness, and optimization before delivery." },
            { title: "Basic Documentation", desc: "A walkthrough of your project so you're never left guessing." }
          ].map((feature) => (
            <div key={feature.title} className="p-8 glass-1 rounded-2xl flex flex-col gap-3 border border-glass-border">
              <h4 className="text-body-md text-text-primary font-medium">{feature.title}</h4>
              <p className="text-body-sm text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <Card level={1} className="p-12 md:p-16 rounded-[3rem]">
          <h2 className="text-h2 text-text-primary mb-12">How we work together</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Discovery", desc: "We understand your goals, audience, timeline, and requirements." },
              { num: "02", title: "Design", desc: "We create layouts, branding, and prototypes before development begins." },
              { num: "03", title: "Development", desc: "You receive regular updates and can review progress throughout the project." },
              { num: "04", title: "Testing & Launch", desc: "We optimize performance, fix issues, deploy the project, and hand everything over properly." }
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-4 relative">
                <span className="text-h3 font-secondary text-text-secondary opacity-50 mb-2">{step.num}</span>
                <h4 className="text-h5 text-text-primary">{step.title}</h4>
                <p className="text-body-sm text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* AI Philosophy */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <div className="w-full bg-bg-elevated-1 rounded-3xl p-12 md:p-16 relative overflow-hidden border border-glass-border">
          <span className="text-mono-tag text-accent-cyan uppercase mb-6 block">Our Approach to AI</span>
          <h2 className="text-h2 text-text-primary mb-8 max-w-[600px]">
            We use AI responsibly.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <p className="text-body-lg text-text-secondary">
                AI is part of our workflow—not a shortcut for delivering unfinished work.
              </p>
              <p className="text-body-lg text-text-secondary">
                We use AI for research, automation, testing, and speeding up repetitive development tasks. Every design, code review, architecture decision, and final user experience is created and verified by our team.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 glass-2 p-8 rounded-2xl">
              <p className="text-body-md text-text-primary font-medium flex items-center gap-3">
                <span className="text-primary-400">✓</span> AI helps us move faster.
              </p>
              <p className="text-body-md text-text-primary font-medium flex items-center gap-3">
                <span className="text-primary-400">✓</span> People make the final decisions.
              </p>
              <p className="text-body-md text-text-primary font-medium flex items-center gap-3 mt-4 text-accent-cyan">
                We don't ship AI-generated garbage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
        <h2 className="text-h2 text-text-primary mb-4 text-center">Technologies we work with</h2>
        <p className="text-body-lg text-text-secondary text-center max-w-[600px] mx-auto mb-16">
          We choose technologies based on your project's requirements—not because they're trendy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card level={2} className="p-10 flex flex-col gap-6 items-center text-center">
            <h4 className="text-h6 text-text-primary uppercase tracking-widest">Frontend</h4>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"].map(tech => (
                <span key={tech} className="px-4 py-2 glass-1 rounded-pill text-body-sm text-text-secondary">{tech}</span>
              ))}
            </div>
          </Card>

          <Card level={2} className="p-10 flex flex-col gap-6 items-center text-center">
            <h4 className="text-h6 text-text-primary uppercase tracking-widest">Backend</h4>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["Node.js", "Express", "Supabase", "Firebase", "PostgreSQL", "MongoDB"].map(tech => (
                <span key={tech} className="px-4 py-2 glass-1 rounded-pill text-body-sm text-text-secondary">{tech}</span>
              ))}
            </div>
          </Card>

          <Card level={2} className="p-10 flex flex-col gap-6 items-center text-center">
            <h4 className="text-h6 text-text-primary uppercase tracking-widest">AI / ML</h4>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["Python", "PyTorch", "TensorFlow", "OpenAI APIs"].map(tech => (
                <span key={tech} className="px-4 py-2 glass-1 rounded-pill text-body-sm text-text-secondary">{tech}</span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-5 max-w-[1200px] mx-auto z-10 relative mb-32">
        <Card level={3} className="w-full rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-electric-violet opacity-10 transition-opacity duration-500 group-hover:opacity-15" />
          <div className="w-3 h-3 rounded-full bg-accent-cyan mb-8 shadow-glow-primary group-hover:scale-150 transition-transform duration-500" />
          <span className="text-mono-tag text-accent-cyan uppercase mb-4 block relative z-10">Ready to build?</span>
          <h2 className="text-display-xl text-text-primary mb-6 relative z-10">Bring the idea. We'll build the product.</h2>
          <p className="text-body-lg text-text-secondary max-w-[600px] mb-12 relative z-10">
            From the first sketch to deployment and maintenance, Dash-it stays with you through the entire journey. No disappearing after delivery, no black-box development, and no generic templates.
            <br /><br />
            <span className="text-text-primary font-medium">Modern. Secure. Transparent.</span>
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
