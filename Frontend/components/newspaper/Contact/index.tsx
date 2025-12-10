'use client';

import { useState } from 'react';
import styles from './Contact.module.css';
import { contactService } from '@/services/contactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await contactService.sendMessage(formData);
      setStatus('success');
      alert('投書成功！感謝您的回饋。');
      setFormData({ name: '', email: '', message: '' });
      setStatus('idle');
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
      alert('投遞失敗，請稍後再試。');
    }
  };

  return (
    <section id="contact-section" className={styles.section}>
      <div className={styles.card}>
        <div className={styles.cutLine}></div>
        <div className={styles.cutText}>✁ 沿虛線剪下寄回</div>
        <div className={styles.layout}>
          <div className={styles.textCol}>
            <h3 className={styles.title}>讀者投書</h3>
            <p className={styles.sub}>意見回饋</p>
            <p className={styles.desc}>
              您的意見對本站至關重要。無論是技術交流或是單純的打招呼，都歡迎填寫右側表單投遞。
            </p>
            <div className={styles.stamp}>
              <div className={styles.circle}>
                <span className={styles.circleText}>回函<br />免費</span>
              </div>
            </div>
          </div>
          <div className={styles.formCol}>
            <form onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label htmlFor="name" className={styles.label}>大名 / Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={styles.input}
                    placeholder="請填寫..."
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="email" className={styles.label}>信箱 / Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={styles.input}
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>
              <div className={styles.group}>
                <label htmlFor="message" className={styles.label}>內容 / Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={styles.textarea}
                  placeholder="對本站的建議..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                ></textarea>
              </div>

              <button
                type="submit"
                className={styles.btn}
                disabled={status === 'submitting'}
                style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                {status === 'submitting' ? '投 遞 中' : '投 遞 信 件'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}