'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isAdmin', 'true');
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        router.push('/admin/dashboard');
      } else {
        alert(data.message || '帳號或密碼錯誤');
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('無法連線到伺服器，請檢查後端是否已啟動');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>CMS 管理系統</h1>
          <p className={styles.subtitle}>請輸入管理員帳號密碼以繼續</p>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>帳號 Account</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="輸入您的帳號"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>密碼 Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? '驗證中' : '登入系統'}
          </button>
        </form>
        <div className={styles.footer}>
          <Link href="/" className={styles.homeLink}>
            ＜ 返回前台首頁
          </Link>
        </div>

      </div>
    </div>
  );
}