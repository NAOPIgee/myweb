import Link from 'next/link';
import styles from './Bio.module.css';
import { UserProfile } from '@/types/admin';

interface Props {
  profile: UserProfile | null;
}

export default function Bio({ profile }: Props) {
  const safeProfile = profile || {
    name: 'Loading...',
    avatarUrl: '/placeholder.png',
    newspaperTitle: '本報特稿',
    bioContent: 'Loading...',
  };

  const content = safeProfile.bioContent || '';
  const firstChar = content.charAt(0);
  const restContent = content.slice(1);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{safeProfile.newspaperTitle}</h2>
        <div className={styles.line}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.photoWrapper}>
          <div className={styles.frame}>
            <div className="relative aspect-[3/4] overflow-hidden transition-all duration-500">
              <img
                src={safeProfile.avatarUrl || '/placeholder.png'}
                alt={safeProfile.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <p className={styles.caption}>▲ {safeProfile.name} (資料照)</p>
        </div>
        <div className={styles.textBody}>

          <div className={styles.article}>
            <p className="mb-4 whitespace-pre-line">
              {firstChar && (
                <span className={styles.dropCap}>{firstChar}</span>
              )}
              {restContent}
            </p>
          </div>

          <div className={styles.footer}>
            <Link href="/resume" className={styles.link}>
              了解更多經歷 ＞
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}