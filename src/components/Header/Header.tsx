import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { LanguagePrefix, NavigationConverter, NavigationHome } from '../../shared/index';

interface IProps {
  lang: LanguagePrefix;
}

const Header: FC<IProps> = ({ lang }) => {
  const toHomeLinkText = NavigationHome[lang];
  const toConverterLinkText = NavigationConverter[lang];

  return (
    <header className={styles.header}>
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
    </header>
  );
};

export default Header;
