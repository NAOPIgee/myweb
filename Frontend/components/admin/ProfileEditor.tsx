'use client';
import { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { UserProfile } from '@/types/admin';
import styles from './ProfileEditor.module.css';

export default function ProfileEditor() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminService.getProfile().then(setProfile).catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    try {
      await adminService.updateProfile(profile);
      alert('更新成功！');
    } catch { alert('更新失敗'); } 
    finally { setLoading(false); }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSave} className={styles.form}>
      <div className={styles.grid}>
        <div>
          <label className={styles.label}>姓名</label>
          <input className={styles.input} value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
        </div>
        <div>
          <label className={styles.label}>職稱</label>
          <input className={styles.input} value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} />
        </div>
        <div className={styles.fullWidth}>
            <label className={styles.label}>自傳內容</label>
            <textarea className={styles.textarea} value={profile.bioContent} onChange={e => setProfile({...profile, bioContent: e.target.value})} />
        </div>
        <div>
          <label className={styles.label}>Avatar 網址</label>
          <input className={styles.input} value={profile.avatarUrl} onChange={e => setProfile({...profile, avatarUrl: e.target.value})} />
        </div>
        <div>
          <label className={styles.label}>地點</label>
          <input className={styles.input} value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
        </div>
      </div>
      <div className={styles.footer}>
        <button type="submit" disabled={loading} className={styles.btn}>
          {loading ? '儲存中' : '儲存變更'}
        </button>
      </div>
    </form>
  );
}