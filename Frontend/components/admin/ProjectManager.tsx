'use client';

import { useState, useEffect, useRef } from 'react';
import { adminService } from '@/services/adminService';
import { Project } from '@/types/admin';
import styles from './ProjectManager.module.css';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '', category: '', description: '', content: '', images: '', techStack: ''
  });

  const imageList = form.images
    ? form.images.split(',').map(s => s.trim()).filter(s => s !== '')
    : [];

  const fetchProjects = async () => {
    try {
      const data = await adminService.getProjects();
      setProjects(data);
    } catch (error) { console.error("讀取失敗", error); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('確定要刪除此專案嗎？')) return;
    try { await adminService.deleteProject(id); fetchProjects(); } catch { alert('刪除失敗'); }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await adminService.uploadImage(file);

      setForm(prev => {
        const currentImages = prev.images ? prev.images.trim() : '';
        const newImages = currentImages.length > 0 ? `${currentImages}, ${url}` : url;
        return { ...prev, images: newImages };
      });

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      alert('圖片上傳失敗');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newList = imageList.filter((_, index) => index !== indexToRemove);
    setForm({ ...form, images: newList.join(', ') });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.createProject({
        ...form,
        images: imageList,
        techStack: form.techStack.split(',').map(s => s.trim()).filter(s => s !== ''),
        imageUrl: ''
      });
      alert('專案發布成功！');
      setIsEditing(false);
      setForm({ title: '', category: '', description: '', content: '', images: '', techStack: '' });
      fetchProjects();
    } catch (e) { alert('發布失敗'); }
    finally { setLoading(false); }
  };

  if (!isEditing) return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.title}>現有專案 ({projects.length})</h3>
        <button onClick={() => setIsEditing(true)} className={styles.btnAdd}>+ 新增專案</button>
      </div>
      <div className={styles.listGrid}>
        {projects.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.thumb}><img src={p.images[0] || '/placeholder.png'} alt={p.title} /></div>
              <div><div className={styles.projectTitle}>{p.title}</div><span className={styles.category}>{p.category}</span></div>
            </div>
            <button onClick={() => handleDelete(p.id)} className={styles.btnDelete}>刪除</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h3 className={styles.title}>新增專案</h3>
        <button type="button" onClick={() => setIsEditing(false)} className={styles.btnCancel}>取消</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.fullCol}><label className={styles.label}>專案標題</label><input className={styles.input} required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
        <div><label className={styles.label}>分類</label><input className={styles.input} required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
        <div><label className={styles.label}>技術棧</label><input className={styles.input} required value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} /></div>

        <div className={styles.fullCol}>
          <label className={styles.label}>專案圖片</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} id="upload-btn" />
            <label htmlFor="upload-btn" style={{ padding: '0.5rem 1rem', backgroundColor: '#e5e7eb', cursor: uploading ? 'wait' : 'pointer', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 'bold', color: '#374151', transition: '0.2s' }}>
              {uploading ? '上傳中' : '上傳圖片'}
            </label>
            <span style={{ fontSize: '0.75rem', color: '#888' }}>支援 JPG, PNG</span>
          </div>

          {imageList.length > 0 && (
            <div className={styles.fileList}>
              {imageList.map((url, index) => (
                <div key={index} className={styles.fileRow}>
                  <div className={styles.fileInfo}>
                    <img src={url} alt="preview" className={styles.fileThumb} />
                    <a href={url} target="_blank" className={styles.fileName} rel="noreferrer">{url}</a>
                  </div>
                  <button type="button" onClick={() => handleRemoveImage(index)} className={styles.btnRemoveFile} title="移除此圖片">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            className={styles.input}
            style={{ display: imageList.length === 0 ? 'block' : 'none' }}
            placeholder="或直接貼上圖片網址http://"
            value={form.images}
            onChange={e => setForm({ ...form, images: e.target.value })}
          />
        </div>

        <div className={styles.fullCol}><label className={styles.label}>簡述</label><textarea className={styles.textarea} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        <div className={styles.fullCol}><label className={styles.label}>詳細內容</label><textarea className={styles.textarea} style={{ height: '150px' }} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
      </form>

      <button onClick={handleSubmit} disabled={loading || uploading} className={`${styles.btnSubmit} ${styles.fullCol}`}>
        {loading ? '處理中' : '確認發布專案'}
      </button>
    </div>
  );
}