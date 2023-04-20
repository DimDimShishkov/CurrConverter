import React from 'react';
import styles from './Loader.module.scss';

function Loader() {
  return (
    <section className={styles.preloader}>
      <span className={styles.loader}></span>
    </section>
  );
}

export default Loader;
