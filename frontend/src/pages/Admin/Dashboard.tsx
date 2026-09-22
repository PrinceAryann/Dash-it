import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PageTransition } from '@/components/animations/PageTransition';
import { Button } from '@/components/ui/Button';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({ 
    next_free_timeline: '', 
    is_hiring: false, 
    accepting_projects: true,
    hero_title: '',
    hero_subtitle: '',
    developer_name: '',
    github_url: '',
    linkedin_url: '',
    instagram_url: '',
    contact_email: '',
    site_title: '',
    site_description: ''
  });
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', slug: '', image_url: '', is_featured: false });
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, projectsRes, visitorsRes] = await Promise.all([
          fetch('/api/site-settings/'),
          fetch('/api/projects/'),
          fetch('/api/analytics/visitors/count')
        ]);
        
        if (settingsRes.ok) {
          setSettings(await settingsRes.json());
        }
        if (projectsRes.ok) {
          setProjects(await projectsRes.json());
        }
        if (visitorsRes.ok) {
          const vData = await visitorsRes.json();
          setVisitorCount(vData.count);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/site-settings/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings');
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        const created = await res.json();
        setProjects([...projects, created]);
        setNewProject({ title: '', description: '', slug: '', image_url: '', is_featured: false });
        alert('Project created!');
      } else {
        const err = await res.json();
        alert('Error: ' + JSON.stringify(err));
      }
    } catch (err) {
      console.error(err);
      alert('Error creating project');
    }
  };

  if (isLoading) return <div className="p-20 pt-32 min-h-screen text-text-primary bg-bg-base">Loading dashboard...</div>;

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-bg-base">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-display font-bold text-text-primary">Admin Dashboard</h1>
              <p className="text-text-secondary mt-2">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-text-secondary uppercase tracking-wider">Total Unique Visitors</p>
                <p className="text-3xl font-bold text-accent-cyan">{visitorCount}</p>
              </div>
              <Button variant="outline" onClick={logout}>Sign Out</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-bg-elevated p-8 rounded-2xl border border-border-base">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Site Settings</h2>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Next Free Timeline</label>
                  <input
                    type="text"
                    value={settings.next_free_timeline}
                    onChange={(e) => setSettings({ ...settings, next_free_timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-base border border-border-base rounded-lg text-text-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Is Hiring?</label>
                  <input
                    type="checkbox"
                    checked={settings.is_hiring}
                    onChange={(e) => setSettings({ ...settings, is_hiring: e.target.checked })}
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">Accepting New Projects?</label>
                  <input
                    type="checkbox"
                    checked={settings.accepting_projects}
                    onChange={(e) => setSettings({ ...settings, accepting_projects: e.target.checked })}
                    className="w-5 h-5"
                  />
                </div>
                <div className="pt-4 border-t border-border-base">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Hero Content</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Developer Name</label>
                      <input type="text" value={settings.developer_name || ''} onChange={e => setSettings({...settings, developer_name: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Hero Title</label>
                      <input type="text" value={settings.hero_title || ''} onChange={e => setSettings({...settings, hero_title: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Hero Subtitle</label>
                      <textarea value={settings.hero_subtitle || ''} onChange={e => setSettings({...settings, hero_subtitle: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary h-24" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-base">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">GitHub URL</label>
                      <input type="url" value={settings.github_url || ''} onChange={e => setSettings({...settings, github_url: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">LinkedIn URL</label>
                      <input type="url" value={settings.linkedin_url || ''} onChange={e => setSettings({...settings, linkedin_url: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Instagram URL</label>
                      <input type="url" value={settings.instagram_url || ''} onChange={e => setSettings({...settings, instagram_url: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Contact Email</label>
                      <input type="email" value={settings.contact_email || ''} onChange={e => setSettings({...settings, contact_email: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-base">
                  <h3 className="text-lg font-bold text-text-primary mb-4">SEO & Meta</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Site Title</label>
                      <input type="text" value={settings.site_title || ''} onChange={e => setSettings({...settings, site_title: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Site Description</label>
                      <textarea value={settings.site_description || ''} onChange={e => setSettings({...settings, site_description: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-8">Save Settings</Button>
              </form>
            </div>
            
            <div className="bg-bg-elevated p-8 rounded-2xl border border-border-base">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Portfolio Projects</h2>
              <form onSubmit={handleCreateProject} className="space-y-4 mb-8 pb-8 border-b border-border-base">
                <input required placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                <input required placeholder="Slug (e.g. project-alpha)" value={newProject.slug} onChange={e => setNewProject({...newProject, slug: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                <textarea required placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                <input placeholder="Image URL (e.g. GitHub raw link)" value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg text-text-primary" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={newProject.is_featured} onChange={e => setNewProject({...newProject, is_featured: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm text-text-secondary">Featured on Home Page</span>
                </div>
                <Button type="submit" variant="primary" size="sm">Add Project</Button>
              </form>

              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id} className="p-4 bg-bg-base rounded-lg border border-border-base flex justify-between items-center">
                    <div>
                      <h4 className="text-text-primary font-bold">{p.title}</h4>
                      <p className="text-text-secondary text-sm">{p.slug} {p.is_featured && '(Featured)'}</p>
                    </div>
                    {/* Minimal V1 UI just shows them, edit/delete left as simple API exercise for owner */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
