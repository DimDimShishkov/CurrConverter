import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { NavigationConverter, NavigationHome } from '../../shared/index';
import { langContext } from 'src/utils/langContext';

export const Header = () => {
  const lang = useContext(langContext);
  const toHomeLinkText = NavigationHome[lang];
  const toConverterLinkText = NavigationConverter[lang];

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}></Link>
        <nav className={styles.header__nav}>
          <ul className={styles.header__items}>
            <li>
              <Link to="/" className={styles.header__item}>
                {toHomeLinkText}
              </Link>
            </li>
            <li>
              <Link to="/converter" className={styles.header__item}>
                {toConverterLinkText}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
