'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { projectService } from '@/services/projectService';
import styles from './Projects.module.css';
import { Project } from '@/types/admin';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        console.error('無法載入專案:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>所有專案作品</h1>
          <p className={styles.subtitle}>
            這裡收錄了我過去開發的各種專案，包含全端開發、系統設計與實驗性的小作品。
          </p>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={project.images[0] || 'https://placehold.co/600x400/png?text=No+Image'}
                  alt={project.title}
                  className={styles.image}
                />
              </div>

              <div className={styles.content}>
                <h2 className={styles.cardTitle}>
                  {project.title}
                </h2>
                <p className={styles.description}>
                  {project.description}
                </p>

                <div className={styles.footer}>
                  <div className={styles.tags}>
                    <span className={styles.tag}>{project.category}</span>
                    {project.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.btn} ${styles.demoBtn}`}
                      >
                        Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.btn} ${styles.repoBtn}`}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.backLinkWrapper}>
          <Link href="/" className={styles.backLink}>
            <span>＜</span> 返回首頁
          </Link>
        </div>
      </div>
    </main>
  );
}