import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const date = new Date();
  const rocYear = date.getFullYear() - 1911;
  const todayStr = `中華民國${rocYear}年${date.getMonth() + 1}月${date.getDate()}日`;

  return (
    <header className={styles.wrapper}>
      <div className={styles.topBar}>
        <span>v1.0.0</span>
        <span>{todayStr}</span>
        <span>新竹發行</span>
      </div>

      <div className={styles.mainArea}>
        <div className={styles.earBox}>
          <span className={styles.label}>今日天氣</span>
          <span className={styles.value}>晴時多雲</span>
        </div>
        <div className={styles.titleSection}>
          <h1 className={styles.mainTitle}>開發者日報</h1>
          <p className={styles.subTitle}>The Developer Evening News</p>
        </div>
        <Link href="/resume" className={`${styles.earBox} ${styles.link}`}>
          <span className={styles.cvCircle}>~~</span>
          <span className={`${styles.sub} font-bold`}>查看簡歷</span>
        </Link>
      </div>
    </header>
  );
}