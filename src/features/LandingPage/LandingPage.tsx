import React from 'react';
import styles from './LandingPage.module.css';

export function LandingPage() {
  return (
    <div className={styles['landing-page-bg']}>
      <div className={styles['landing-page-content']}>
        <h1>Hi and welcome to the LMS</h1>
        <section className={styles['landing-page-section']}>
          <h2>Current News</h2>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Morbi euismod, urna eu tincidunt consectetur, nisi erat facilisis erat.</li>
            <li>Aliquam erat volutpat. Suspendisse potenti.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
