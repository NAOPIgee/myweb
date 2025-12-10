'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { ResumeData } from '@/types/admin';
import styles from './ResumeEditor.module.css';

export default function ResumeEditor() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminService.getResume().then(setResume);
  }, []);

  const handleSave = async () => {
    if (!resume) return;
    setLoading(true);
    try {
      await adminService.updateResume(resume);
      alert('完整履歷更新成功！');
    } catch (e) {
      console.error(e);
      alert('更新失敗 (請檢查欄位是否填寫完整)');
    } finally {
      setLoading(false);
    }
  };

  if (!resume) return <div>載入中</div>;

  const updateProfile = (field: string, value: string) => {
    setResume({ ...resume, profile: { ...resume.profile, [field]: value } });
  };
  const updatePref = (field: string, value: string) => {
    setResume({ ...resume, preferences: { ...resume.preferences, [field]: value } });
  };

  const addSkill = () => setResume({ ...resume, skills: [...resume.skills, { category: 'New', items: [] }] });
  const removeSkill = (i: number) => setResume({ ...resume, skills: resume.skills.filter((_, idx) => idx !== i) });
  const updateSkill = (i: number, f: 'category' | 'items', v: any) => {
    const newSkills = [...resume.skills];
    if (f === 'items') newSkills[i].items = (v as string).split(',').map(s => s.trim());
    else (newSkills[i] as any)[f] = v;
    setResume({ ...resume, skills: newSkills });
  };

  const addExp = () => setResume({ ...resume, experience: [{ company: '', role: '', period: '', description: '' }, ...resume.experience] });
  const removeExp = (i: number) => setResume({ ...resume, experience: resume.experience.filter((_, idx) => idx !== i) });
  const updateExp = (i: number, f: string, v: string) => {
    const arr = [...resume.experience]; (arr[i] as any)[f] = v; setResume({ ...resume, experience: arr });
  };

  const addEdu = () => setResume({ ...resume, education: [{ school: '', degree: '', period: '' }, ...resume.education] });
  const removeEdu = (i: number) => setResume({ ...resume, education: resume.education.filter((_, idx) => idx !== i) });
  const updateEdu = (i: number, f: string, v: string) => {
    const arr = [...resume.education]; (arr[i] as any)[f] = v; setResume({ ...resume, education: arr });
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h3 className={styles.sectionTitle}>基本資料 (Profile)</h3></div>
        <div className={styles.grid}>
          <div><label className={styles.label}>姓名</label><input className={styles.input} value={resume.profile.name} onChange={e => updateProfile('name', e.target.value)} /></div>
          <div><label className={styles.label}>職稱</label><input className={styles.input} value={resume.profile.title} onChange={e => updateProfile('title', e.target.value)} /></div>
          <div><label className={styles.label}>Email</label><input className={styles.input} value={resume.profile.email} onChange={e => updateProfile('email', e.target.value)} /></div>
          <div><label className={styles.label}>地點</label><input className={styles.input} value={resume.profile.location} onChange={e => updateProfile('location', e.target.value)} /></div>

          <div className={styles.fullCol}><label className={styles.label}>大頭貼網址</label><input className={styles.input} value={resume.profile.avatar} onChange={e => updateProfile('avatar', e.target.value)} /></div>

          <div><label className={styles.label}>GitHub 連結</label><input className={styles.input} value={resume.profile.github} onChange={e => updateProfile('github', e.target.value)} /></div>
          <div><label className={styles.label}>LinkedIn 連結</label><input className={styles.input} value={resume.profile.linkedin} onChange={e => updateProfile('linkedin', e.target.value)} /></div>

          <div className={styles.fullCol}>
            <label className={styles.label}>自傳內容 (Bio)</label>
            <textarea className={styles.textarea} value={resume.profile.bioContent} onChange={e => updateProfile('bioContent', e.target.value)} />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h3 className={styles.sectionTitle}>求職偏好</h3></div>
        <div className={styles.grid}>
          <div><label className={styles.label}>期望職位</label><input className={styles.input} value={resume.preferences.role} onChange={e => updatePref('role', e.target.value)} /></div>
          <div><label className={styles.label}>期望薪資</label><input className={styles.input} value={resume.preferences.salary} onChange={e => updatePref('salary', e.target.value)} /></div>
          <div><label className={styles.label}>工作類型</label><input className={styles.input} value={resume.preferences.jobType} onChange={e => updatePref('jobType', e.target.value)} /></div>
          <div><label className={styles.label}>可上班日</label><input className={styles.input} value={resume.preferences.availability} onChange={e => updatePref('availability', e.target.value)} /></div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h3 className={styles.sectionTitle}>技能</h3><button onClick={addSkill} className={styles.btnAdd}>新增</button></div>
        <div className={styles.itemList}>
          {resume.skills.map((s, i) => (
            <div key={i} className={styles.itemCard}>
              <button onClick={() => removeSkill(i)} className={styles.btnDelete}>✕</button>
              <div className={styles.grid}>
                <div><label className={styles.label}>分類</label><input className={styles.input} value={s.category} onChange={e => updateSkill(i, 'category', e.target.value)} /></div>
                <div><label className={styles.label}>項目 (逗號隔開)</label><input className={styles.input} value={s.items.join(', ')} onChange={e => updateSkill(i, 'items', e.target.value)} /></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h3 className={styles.sectionTitle}>經歷</h3><button onClick={addExp} className={styles.btnAdd}>新增</button></div>
        <div className={styles.itemList}>
          {resume.experience.map((e, i) => (
            <div key={i} className={styles.itemCard}>
              <button onClick={() => removeExp(i)} className={styles.btnDelete}>✕</button>
              <div className={styles.grid}>
                <div><label className={styles.label}>公司</label><input className={styles.input} value={e.company} onChange={v => updateExp(i, 'company', v.target.value)} /></div>
                <div><label className={styles.label}>職稱</label><input className={styles.input} value={e.role} onChange={v => updateExp(i, 'role', v.target.value)} /></div>
                <div className={styles.fullCol}><label className={styles.label}>期間</label><input className={styles.input} value={e.period} onChange={v => updateExp(i, 'period', v.target.value)} /></div>
                <div className={styles.fullCol}><label className={styles.label}>內容</label><textarea className={styles.textarea} value={e.description} onChange={v => updateExp(i, 'description', v.target.value)} /></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h3 className={styles.sectionTitle}>學歷</h3><button onClick={addEdu} className={styles.btnAdd}>新增</button></div>
        <div className={styles.itemList}>
          {resume.education.map((e, i) => (
            <div key={i} className={styles.itemCard}>
              <button onClick={() => removeEdu(i)} className={styles.btnDelete}>✕</button>
              <div className={styles.grid}>
                <div><label className={styles.label}>學校</label><input className={styles.input} value={e.school} onChange={v => updateEdu(i, 'school', v.target.value)} /></div>
                <div><label className={styles.label}>科系</label><input className={styles.input} value={e.degree} onChange={v => updateEdu(i, 'degree', v.target.value)} /></div>
                <div className={styles.fullCol}><label className={styles.label}>期間</label><input className={styles.input} value={e.period} onChange={v => updateEdu(i, 'period', v.target.value)} /></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className={styles.footer}>
        <button onClick={handleSave} disabled={loading} className={styles.btnSave}>{loading ? '儲存中' : '儲存所有變更'}</button>
      </div>
    </div>
  );
}