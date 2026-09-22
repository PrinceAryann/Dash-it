import { useState, useEffect } from "react";
import { SOCIAL_LINKS as DEFAULT_SOCIAL } from "@/config/social";

export function useSiteSettings() {
  const [settings, setSettings] = useState({
    next_free_timeline: "Available for new projects — Q1 2027",
    is_hiring: false,
    hero_title: "We build websites <br /><span class='font-secondary italic text-gradient gradient-aurora-blue pr-4'> people  </span> remember.",
    hero_subtitle: "You bring the idea. We turn it into a fast, modern website that looks good, works smoothly, and grows with your business.",
    developer_name: "Prince Aryan",
    github_url: DEFAULT_SOCIAL.GITHUB,
    linkedin_url: DEFAULT_SOCIAL.LINKEDIN,
    instagram_url: DEFAULT_SOCIAL.INSTAGRAM,
    contact_email: DEFAULT_SOCIAL.EMAIL,
    site_title: "Prince Aryan | Portfolio",
    site_description: "Portfolio of Prince Aryan"
  });

  useEffect(() => {
    fetch('/api/site-settings/')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (settings.site_title) {
      document.title = settings.site_title;
    }
    if (settings.site_description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', settings.site_description);
    }
  }, [settings.site_title, settings.site_description]);

  return settings;
}
