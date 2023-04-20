import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NoPage.module.scss';

function NoPage() {
  return (
    <section className={styles.section}>
      <p className={styles.heading}>Страница не найдена</p>
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </section>
  );
}

export default NoPage;
