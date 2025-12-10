'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

import ProfileEditor from '@/components/admin/ProfileEditor';
import ProjectManager from '@/components/admin/ProjectManager';
import ResumeEditor from '@/components/admin/ResumeEditor';
import MessageViewer from '@/components/admin/MessageViewer';

type Tab = 'profile' | 'projects' | 'resume' | 'messages';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const stats = { projects: 5, messages: 12, views: 1205 };

  useEffect(() => {
    const isLogin = localStorage.getItem('isAdmin');
  }, [router]);

  const Icons = {
    Home: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    Profile: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    Project: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    Resume: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Message: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Logout: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    Menu: () => <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  };

  const navItems = [
    { id: 'profile', label: '個人檔案', icon: Icons.Profile },
    { id: 'projects', label: '專案管理', icon: Icons.Project },
    { id: 'resume', label: '履歷資料', icon: Icons.Resume },
    { id: 'messages', label: '讀者投書', icon: Icons.Message },
  ];

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>CMS <span>ADMIN</span></div>
        </div>
        <nav className={styles.nav}>
          <p className={styles.navGroupTitle}>Content Management</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as Tab); setSidebarOpen(false); }}
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            >
              <item.icon />
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            onClick={() => { localStorage.removeItem('isAdmin'); router.push('/'); }}
            className={styles.logoutBtn}
          >
            <Icons.Logout />
            登出系統
          </button>
        </div>
      </aside>
      <div className={styles.mainContent}>
        <header className={styles.topHeader}>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={styles.menuBtn}>
            <Icons.Menu />
          </button>

          <div className={styles.userInfo}>
            <div className={styles.userMeta}>
              <p className={styles.userName}>Administrator</p>
              <p className={styles.userRole}>Super User</p>
            </div>
            <div className={styles.avatar}>A</div>
          </div>
        </header>
        <main className={styles.scrollArea}>
          <div className={styles.wrapper}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>
                {navItems.find(i => i.id === activeTab)?.label || '儀表板'}
              </h1>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div>
                    <p className={styles.statLabel}>總專案數</p>
                    <p className={styles.statValue}>{stats.projects}</p>
                  </div>
                  <div className={`${styles.statIconBox} ${styles.iconRed}`}>
                    <Icons.Project />
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div>
                    <p className={styles.statLabel}>未讀留言</p>
                    <p className={styles.statValue}>{stats.messages}</p>
                  </div>
                  <div className={`${styles.statIconBox} ${styles.iconGray}`}>
                    <Icons.Message />
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div>
                    <p className={styles.statLabel}>總瀏覽量</p>
                    <p className={styles.statValue}>{stats.views}</p>
                  </div>
                  <div className={`${styles.statIconBox} ${styles.iconBlack}`}>
                    <Icons.Home />
                  </div>
                </div>

              </div>
            </div>
            <div className={styles.contentCard}>
              <div className={styles.cardBody}>
                {activeTab === 'profile' && <ProfileEditor />}
                {activeTab === 'projects' && <ProjectManager />}
                {activeTab === 'resume' && <ResumeEditor />}
                {activeTab === 'messages' && <MessageViewer />}
              </div>
            </div>

          </div>
        </main>
      </div>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}