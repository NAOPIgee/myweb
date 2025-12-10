'use client';

import { useState, useEffect } from 'react';

import { projectService } from '@/services/projectService';
import { adminService } from '@/services/adminService';
import { Project, UserProfile } from '@/types/admin';

import Header from '@/components/newspaper/Header';
import Bio from '@/components/newspaper/Bio';
import ProjectList from '@/components/newspaper/ProjectList';
import Contact from '@/components/newspaper/Contact';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, profileData] = await Promise.all([
          projectService.getAll(),
          adminService.getProfile(true)
        ]);

        setProjects(projectsData);
        setProfile(profileData);
      } catch (error) {
        console.error('資料載入失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <div className="text-2xl font-black tracking-widest animate-pulse font-serif text-ink">
        Loading...
      </div>
    </div>
  );

  return (
    <main>
      <div className="bg-texture"></div>
      <div className="paper-container">
        <Header />
        <div className="space-y-12 mb-12">
          <Bio profile={profile} />
          <ProjectList projects={projects} />
        </div>
        <Contact />
        <footer className="mt-8 pt-8 border-t border-ink text-center pb-8">
          <p className="font-bold text-sm tracking-widest mb-2 text-ink">
            聯絡方式 信箱:NAOPIgeeYT@gmail.com
          </p>
        </footer>
      </div>
    </main>
  );
}