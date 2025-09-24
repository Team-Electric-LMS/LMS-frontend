import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../auth/hooks';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.logo}>LMS</span>
        <div className={styles.links}>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {/* additional links here */}
        </div>
        {user ? (
          <div className={styles.userSection}>
            <span className={styles.username}>{user.username}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <button className={styles.logoutBtn}>Register</button> // TODO: Placeholder for register button
        )}
      </nav>
    </header>
  );
};
