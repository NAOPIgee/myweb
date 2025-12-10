import Link from 'next/link';
import styles from './ProjectList.module.css';
import { Project } from '@/app/data';

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>專案實績</h2>
        <span className={styles.line}></span>
      </div>

      <div>
        {projects.map((project, index) => (
          <div key={project.id}>
            <article className={styles.card}>
              <div className={styles.imageArea}>
                <Link href={`/projects/${project.id}`}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={project.images[0] || 'https://via.placeholder.com/800x600'}
                      alt={project.title}
                      className={styles.projectImg}
                    />
                    <div className={styles.figCaption}>{index + 1}</div>
                  </div>
                </Link>
              </div>

              <div className={styles.infoArea}>
                <div className={styles.tags}>
                  <span className={styles.tag}>{project.category}</span>
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                  ))}
                </div>

                <h3 className={styles.projectTitle}>
                  <Link href={`/projects/${project.id}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className={styles.desc}>{project.description}</p>

                <Link href={`/projects/${project.id}`} className={styles.btnDetail}>
                  查看詳情
                </Link>
              </div>
            </article>

            {index !== projects.length - 1 && <div className={styles.divider}></div>}
          </div>
        ))}

        {projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed var(--ink)', opacity: 0.6 }}>
            目前尚無專案報導，請至後台新增。
          </div>
        )}
      </div>

      <div className={styles.archiveArea}>
        <Link href="/projects" className={styles.btnArchive}>
          查閱完整專案庫
        </Link>
      </div>
    </section>
  );
}