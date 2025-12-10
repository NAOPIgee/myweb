'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { ContactMessage } from '@/types/admin';
import styles from './MessageViewer.module.css';

export default function MessageViewer() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getMessages().then(setMessages).catch(() => { }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;
  if (messages.length === 0) return <div className={styles.emptyState}>📭 目前沒有任何讀者來信</div>;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr><th className={styles.th}>日期</th><th className={styles.th}>訪客資訊</th><th className={styles.th}>內容</th></tr>
        </thead>
        <tbody className={styles.tbody}>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td className={styles.td}>{new Date(msg.sentAt).toLocaleDateString()}</td>
              <td className={styles.td}><div className={styles.name}>{msg.name}</div><div className={styles.email}>{msg.email}</div></td>
              <td className={styles.td}>{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}