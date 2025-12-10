'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminService } from '@/services/adminService';
import { ResumeData } from '@/types/admin';
import styles from './resume.module.css';

const Icons = {
  Github: () => (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
  ),
  Linkedin: () => (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  ),
  Web: () => (
    <svg className={styles.socialIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  )
};

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    adminService.getResume().then(setResume).catch(console.error);
  }, []);

  if (!resume) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-xl font-bold tracking-widest animate-pulse font-serif text-ink">
        Loading...
        </div>
      </div>
    );
  }

  const { profile, preferences, skills, experience, education } = resume;

  return (
    <main className="min-h-screen bg-paper text-ink font-serif tracking-wide">
      <div className="bg-texture"></div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>個人檔案</h1>
          </div>
          <div className={styles.stamp}>請予面試</div>
        </header>

        <div className={styles.grid}>

          <aside className={styles.sidebar}>
            <div className={styles.photoBox}>
              <img src={profile.avatar || '/placeholder.png'} alt={profile.name} className={styles.photo} />
            </div>
            <section>
              <h2 className={styles.sideTitle}>基本資料</h2>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>姓名</span>
                  <span>{profile.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>職稱</span>
                  <span>{profile.title}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>地點</span>
                  <span>{profile.location}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>信箱</span>
                  <a href={`mailto:${profile.email}`} className="hover:underline hover:text-ink-red truncate">{profile.email}</a>
                </div>
              </div>
            </section>

            <section>
              <h2 className={styles.sideTitle}>社群傳送門</h2>
              <div className={styles.socialList}>
                {profile.github && (
                  <a href={profile.github} target="_blank" className={styles.socialSticker}>
                    <Icons.Github />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" className={styles.socialSticker}>
                    <Icons.Linkedin />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </section>

            <section>
              <h2 className={styles.sideTitle}>專業技能</h2>
              {skills.map((group, index) => (
                <div key={index} className={styles.skillGroup}>
                  <div className={styles.skillCat}>{group.category}</div>
                  <div className={styles.skillTags}>
                    {group.items.map((skill, skillIndex) => (
                      <span key={skillIndex} className={styles.tag}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

          </aside>

          <div className={styles.mainContent}>
            {profile.bioContent && (
              <section className={styles.bioSection}>
                <h2 className={styles.mainSectionTitle}>個人簡介</h2>
                <p className={styles.bioText}>{profile.bioContent}</p>
              </section>
            )}
            <section>
              <h2 className={styles.mainSectionTitle}>工作經歷</h2>
              <div>
                {experience.map((job, index) => (
                  <article key={index} className={styles.jobItem}>
                    <div className={styles.jobHeader}>
                      <div>
                        <h3 className={styles.jobRole}>{job.role}</h3>
                        <span className={styles.jobCompany}>{job.company}</span>
                      </div>
                      <span className={styles.jobPeriod}>{job.period}</span>
                    </div>
                    <p className={styles.jobDesc}>{job.description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section>
              <h2 className={styles.mainSectionTitle}>教育程度</h2>
              <div>
                {education.map((edu, index) => (
                  <article key={index} className={styles.jobItem}>
                    <div className={styles.jobHeader}>
                      <div>
                        <h3 className={styles.jobRole}>{edu.school}</h3>
                        <span className={styles.jobCompany}>{edu.degree}</span>
                      </div>
                      <span className={styles.jobPeriod}>{edu.period}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <div className={styles.footerNav}>
              <Link href="/" className={styles.backBtn}>
                ＜ 返回 首頁
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}