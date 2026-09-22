import { useState } from "react";
import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/layout";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { submitContact } from "@/services/api/contact";

export default function Contact() {
   const lenis = useSmoothScroll();
   const settings = useSiteSettings();
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      company: "",
      projectType: "website",
      message: ""
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

   const scrollToTop = () => {
      if (lenis) lenis.scrollTo(0, { immediate: false });
      else window.scrollTo({ top: 0, behavior: "smooth" });
   };
   return (
      <main className="min-h-screen bg-bg-base relative">
         <div className="fixed inset-0 z-[-1] bg-gradient-midnight-aurora opacity-25" />
         <Navbar />

         <section className="pt-40 pb-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div className="flex flex-col">
               <div className="glass-2 rounded-pill px-4 py-2 flex items-center gap-3 w-fit mb-8 border border-glass-border">
                  <span className="w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(163,230,53,0.8)] animate-pulse" />
                  <span className="text-caption text-text-primary uppercase tracking-widest">
                     Available for new projects • Remote across India
                  </span>
               </div>

               <h1 className="text-display-xl text-text-primary mb-6">Tell us what you're <span className="font-secondary italic text-gradient gradient-aurora-blue pr-2">building</span>.</h1>
               <p className="text-body-lg text-text-secondary max-w-[500px] mb-4">
                  Whether it's a startup idea, a business website, a custom web application, or a complete brand identity, Dash-it is ready to build it with you.
               </p>
               <p className="text-body-sm text-text-secondary opacity-70 mb-12">
                  We personally read every project inquiry and usually respond within 24 hours.
               </p>

               <div className="flex flex-col gap-6">
                  <Card level={1} className="p-6">
                     <h4 className="text-caption text-text-secondary uppercase tracking-widest mb-4">Contact</h4>
                     <div className="flex flex-col gap-3 mb-4">
                        <a href={settings.contact_email ? `mailto:${settings.contact_email}` : '#'} className="text-body-md text-text-primary hover:text-accent-cyan transition-colors">
                           Email: {settings.contact_email}
                        </a>
                        <a href="#" className="text-body-md text-text-primary hover:text-accent-cyan transition-colors">
                           WhatsApp: @its_meh_Prince
                        </a>
                     </div>
                     <p className="text-caption text-text-secondary">Quickest way to discuss a project or ask questions.</p>
                  </Card>

                  <Card level={1} className="p-6">
                     <h4 className="text-caption text-text-secondary uppercase tracking-widest mb-4">Location</h4>
                     <p className="text-body-md text-text-primary mb-2">Remote • India</p>
                     <p className="text-caption text-text-secondary">Working with clients across India.</p>
                  </Card>

                  <Card level={1} className="p-6 flex flex-col items-start gap-4">
                     <h4 className="text-caption text-text-secondary uppercase tracking-widest">Discovery Call</h4>
                     <Button onClick={scrollToTop} variant="ghost" className="border border-glass-border">
                        Book a Discovery Call
                     </Button>
                  </Card>
               </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:mt-[68px]">
               <Card level={2} className="p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-aurora-blue opacity-[0.03] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity" />

                  <form onSubmit={async (e) => {
                     e.preventDefault();
                     setIsSubmitting(true);
                     try {
                        await submitContact(formData);
                        setSubmitStatus("success");
                        setFormData({ name: "", email: "", company: "", projectType: "website", message: "" });
                     } catch (err) {
                        setSubmitStatus("error");
                     } finally {
                        setIsSubmitting(false);
                     }
                  }} className="flex flex-col gap-6 relative z-10">
                     {submitStatus === "success" && (
                        <div className="p-4 rounded-lg bg-accent-lime/10 border border-accent-lime text-accent-lime">
                           Thanks for reaching out! We'll get back to you soon.
                        </div>
                     )}
                     {submitStatus === "error" && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500 text-red-500">
                           Something went wrong. Please try again or email us directly.
                        </div>
                     )}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                           <label htmlFor="contact-name" className="text-caption text-text-secondary uppercase tracking-widest">Full Name</label>
                           <input
                              id="contact-name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              value={formData.name}
                              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                              required
                              aria-required="true"
                              placeholder="John Doe"
                              className="w-full glass-1 rounded-lg px-4 py-3 text-[16px] md:text-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan placeholder:text-text-secondary/50"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label htmlFor="contact-email" className="text-caption text-text-secondary uppercase tracking-widest">Email Address</label>
                           <input
                              id="contact-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={formData.email}
                              onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                              required
                              aria-required="true"
                              placeholder="john@example.com"
                              className="w-full glass-1 rounded-lg px-4 py-3 text-[16px] md:text-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan placeholder:text-text-secondary/50"
                           />
                        </div>
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="contact-company" className="text-caption text-text-secondary uppercase tracking-widest">Company or Brand (optional)</label>
                        <input
                           id="contact-company"
                           name="company"
                           type="text"
                           autoComplete="organization"
                           value={formData.company}
                           onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                           placeholder="Acme Corp"
                           className="w-full glass-1 rounded-lg px-4 py-3 text-[16px] md:text-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan placeholder:text-text-secondary/50"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="contact-project-type" className="text-caption text-text-secondary uppercase tracking-widest">Project Type</label>
                        <select 
                           id="contact-project-type"
                           name="projectType"
                           value={formData.projectType}
                           onChange={(e) => setFormData(p => ({ ...p, projectType: e.target.value }))}
                           className="w-full glass-1 rounded-lg px-4 py-3 text-[16px] md:text-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan appearance-none cursor-pointer"
                        >
                           <option className="bg-bg-elevated-2 text-text-primary" value="website">Website Design & Development</option>
                           <option className="bg-bg-elevated-2 text-text-primary" value="webapp">Web Application</option>
                           <option className="bg-bg-elevated-2 text-text-primary" value="brand">Brand Identity & Logo</option>
                           <option className="bg-bg-elevated-2 text-text-primary" value="uiux">UI/UX Design</option>
                           <option className="bg-bg-elevated-2 text-text-primary" value="ai">AI / Automation Project</option>
                           <option className="bg-bg-elevated-2 text-text-primary" value="other">Something Else</option>
                        </select>
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="contact-message" className="text-caption text-text-secondary uppercase tracking-widest">Project Details</label>
                        <textarea
                           id="contact-message"
                           name="message"
                           rows={5}
                           value={formData.message}
                           onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                           required
                           aria-required="true"
                           placeholder="Tell us about your idea, your audience, the features you need, and anything that inspired this project."
                           className="w-full glass-1 rounded-lg px-4 py-3 text-[16px] md:text-body-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan placeholder:text-text-secondary/50 resize-none"
                        />
                     </div>

                     <div className="pt-4 flex flex-col gap-4 sticky bottom-[max(1rem,var(--safe-bottom))] z-30 bg-bg-elevated-1/90 md:bg-transparent md:static p-4 -mx-4 md:mx-0 md:p-0 backdrop-blur-xl md:backdrop-blur-none rounded-2xl md:rounded-none shadow-float md:shadow-none border border-glass-border md:border-none">
                        <Button type="submit" disabled={isSubmitting} variant="primary" size="lg" className="w-full bg-gradient-aurora-blue">
                           {isSubmitting ? "Sending..." : "Start the Conversation"}
                        </Button>
                        <p className="text-caption text-text-secondary text-center">
                           No spam. No automated replies. You'll hear directly from the Dash-it team.
                        </p>
                     </div>
                  </form>
               </Card>
            </div>
         </section>

         {/* What Happens Next Section */}
         <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
            <h2 className="text-h2 text-text-primary mb-12 text-center">What Happens Next?</h2>
            <div className="relative pt-6">
               <div className="hidden md:block absolute top-[40px] left-4 w-[calc(66.66%+21px)] h-[2px] bg-gradient-to-r from-glass-border-strong to-glass-border" />

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { num: "01", title: "Tell us about your project", desc: "Share your idea, business, or startup vision." },
                     { num: "02", title: "We discuss the plan", desc: "We'll understand your goals and suggest the right approach before development starts." },
                     { num: "03", title: "We build together", desc: "You'll receive regular walkthroughs and updates throughout the project until launch." }
                  ].map((step, i) => (
                     <div key={step.num} className="flex flex-col gap-4 relative z-10 group">
                        <div className="w-8 h-8 rounded-full glass-2 flex items-center justify-center mb-2">
                           <div className={`w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-accent-cyan shadow-glow-primary scale-110' : 'bg-text-secondary/50 group-hover:bg-primary-400 group-hover:scale-110'}`} />
                        </div>
                        <h4 className="text-body-md text-text-primary font-medium">{step.num} — {step.title}</h4>
                        <p className="text-body-sm text-text-secondary max-w-[300px]">{step.desc}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Why Clients Choose Dash-it */}
         <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto">
            <h2 className="text-h2 text-text-primary mb-12 text-center">Why Clients Choose Dash-it</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card level={1} className="p-8 flex flex-col gap-4">
                  <h4 className="text-body-md text-text-primary font-medium">Modern First</h4>
                  <p className="text-body-sm text-text-secondary">Clean, responsive websites without outdated layouts or unnecessary clutter.</p>
               </Card>
               <Card level={1} className="p-8 flex flex-col gap-4">
                  <h4 className="text-body-md text-text-primary font-medium">Security by Design</h4>
                  <p className="text-body-sm text-text-secondary">Security is considered from the first line of code, not added after launch.</p>
               </Card>
               <Card level={1} className="p-8 flex flex-col gap-4">
                  <h4 className="text-body-md text-text-primary font-medium">Transparent Development</h4>
                  <p className="text-body-sm text-text-secondary">Clients stay involved with regular walkthroughs, progress updates, and feedback sessions.</p>
               </Card>
               <Card level={1} className="p-8 flex flex-col gap-4">
                  <h4 className="text-body-md text-text-primary font-medium">2 Months of Support</h4>
                  <p className="text-body-sm text-text-secondary">Every completed project includes maintenance, deployment support, domain setup, and performance optimization for two months.</p>
               </Card>
            </div>
         </section>

         {/* Social Section */}
         <section className="py-16 px-5 md:px-10 lg:px-24 max-w-[1440px] mx-auto flex flex-col items-center">
            <h3 className="text-caption text-text-secondary uppercase tracking-widest mb-8">Find Dash-it Online</h3>
            <div className="flex flex-wrap justify-center gap-4">
               <Button onClick={() => window.open(settings.github_url, '_blank')} variant="ghost" className="px-6 py-3 border border-glass-border rounded-full group hover:border-glass-border-strong hover:bg-text-primary/5 transition-all hover:pl-5 hover:pr-10 relative overflow-hidden">
                  <span className="relative z-10">Github</span>
                  <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan group-hover:translate-x-1 duration-300">↗</span>
               </Button>
               <Button onClick={() => window.open(settings.linkedin_url, '_blank')} variant="ghost" className="px-6 py-3 border border-glass-border rounded-full group hover:border-glass-border-strong hover:bg-text-primary/5 transition-all hover:pl-5 hover:pr-10 relative overflow-hidden">
                  <span className="relative z-10">LinkedIn</span>
                  <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan group-hover:translate-x-1 duration-300">↗</span>
               </Button>
               <Button onClick={() => window.open(settings.instagram_url, '_blank')} variant="ghost" className="px-6 py-3 border border-glass-border rounded-full group hover:border-glass-border-strong hover:bg-text-primary/5 transition-all hover:pl-5 hover:pr-10 relative overflow-hidden">
                  <span className="relative z-10">Instagram</span>
                  <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan group-hover:translate-x-1 duration-300">↗</span>
               </Button>
            </div>
         </section>

         {/* Final CTA Banner */}
         <section className="py-16 px-5 max-w-[1200px] mx-auto z-10 relative mb-32">
            <Card level={3} className="w-full rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-gravity-pink opacity-5 transition-opacity duration-500 group-hover:opacity-15" />
               <div className="w-3 h-3 rounded-full bg-accent-cyan mb-8 shadow-glow-primary group-hover:scale-150 transition-transform duration-500" />
               <h2 className="text-display-lg text-text-primary mb-6 relative z-10">Bring the vision. We'll build it.</h2>
               <p className="text-body-lg text-text-secondary max-w-[600px] mb-12 relative z-10">
                  Every great product starts with a conversation. From the first idea to deployment and post-launch support, Dash-it builds digital products with transparency, security, and attention to detail.
               </p>
               <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                  <Button onClick={scrollToTop} variant="primary" size="lg" className="bg-gradient-aurora-blue group relative w-full sm:w-auto">
                     Let's Start Your Project
                     <span className="inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 text-xl ml-1"></span>
                  </Button>
                  <Button onClick={scrollToTop} variant="ghost" size="lg" className="w-full sm:w-auto border border-glass-border">
                     Book a Discovery Call
                  </Button>
               </div>
            </Card>
         </section>

         <Footer />
      </main>
   );
}
