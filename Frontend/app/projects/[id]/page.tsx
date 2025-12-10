'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Project } from '@/types/admin';
import { projectService } from '@/services/projectService';
import ImageSlider from '@/components/ui/ImageSlider';
import styles from './project.module.css';

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const rawId = params?.id;
        if (!rawId) return;
        const id = Number(rawId);
        if (isNaN(id)) {
          setErrorMsg('無效的專案 ID');
          return;
        }
        const data = await projectService.getById(id);
        setProject(data);
      } catch (err: any) {
        console.error("錯誤:", err);
        setErrorMsg('讀取失敗或查無此專案');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params]);

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading...
      </div>
    );
  }

  if (errorMsg || !project) {
    return (
      <div className={styles.errorState}>
        <h1 className={styles.errorTitle}>查無資料</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>{errorMsg}</p>
        <Link href="/" className={styles.btnBack}>
          ＜ 返回 首頁
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.bgTexture}></div>

      <div className={styles.wrapper}>

        <nav className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            <span className={styles.arrow}>＜</span>
            <span className={styles.backText}>返回 首頁</span>
          </Link>
          <div className={styles.navMeta}>
            專案報導 / {project.category} 版
          </div>
        </nav>

        <div className={styles.mainGrid}>

          <div>
            <div className={styles.imageFrame}>
              <div className={styles.stamp}>獨家照片</div>

              {project.images && project.images.length > 0 ? (
                <ImageSlider images={project.images} />
              ) : (
                <div className={styles.emptyImage}>暫無影像資料</div>
              )}
            </div>
            <p className={styles.caption}>
              ▲ 專案實際運行畫面 (資料照)
            </p>
          </div>

          <div className={styles.infoCol}>
            <div className={styles.metaRow}>
              <span className={styles.categoryTag}>{project.category}</span>
              <span className={styles.dateText}>
                — {new Date(project.createdAt).toLocaleDateString()} 刊登
              </span>
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.techSection}>
              <h3 className={styles.techHeader}>
                開發規格書 (Tech Stack)
              </h3>
              <div className={styles.techTags}>
                {project.techStack.map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.description}>
              {project.description}
            </p>
            <div className={styles.btnGroup}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" className={`${styles.btn} ${styles.btnRed}`}>
                  參觀網站 (Demo) -&gt;
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" className={styles.btn}>
                  檢視原始碼 (GitHub)
                </a>
              )}
            </div>
          </div>
        </div>
        <article className={styles.articleSection}>
          <div className={styles.articleHeader}>
            <h3 className={styles.articleTitle}>深度報導</h3>
            <span className={styles.articleLine}></span>
          </div>
          <div className={styles.articleContent}>
            <p>
              <span className={styles.dropCap}>
                {project.content.charAt(0)}
              </span>
              {project.content.slice(1)}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}