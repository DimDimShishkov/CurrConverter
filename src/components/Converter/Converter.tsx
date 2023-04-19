import React, { FC } from 'react';
import styles from './Converter.module.scss';
import { ConverterInput, ConverterOutput, LanguagePrefix } from '../../shared/index';

interface IProps {
  lang: LanguagePrefix;
}

export const Converter: FC<IProps> = ({ lang }) => {
  const converterTextInput = ConverterInput[lang];
  const converterTextOutput = ConverterOutput[lang];

  return (
    <section className={styles.section}>
      <div className={styles.containers}>
        <div className={styles.container}>
          <div className={styles.heading}>{converterTextInput}</div>
          <div className={styles.currencies}>
            <div className={`${styles.currency} ${styles.active}`}>RUR</div>
            <div className={styles.currency}>USD</div>
            <div className={styles.currency}>EUR</div>
            <div className={styles.currency}>GBP</div>
            <div className={styles.currency}></div>
          </div>

          <div className={styles.input_box}>
            <input className={styles.input} type="number" />
            <div className={styles.rate}>1 RUR = 0.0123 USD</div>
          </div>
        </div>

        <span className={styles.arrow}></span>

        <div className={styles.container}>
          <div className={styles.heading}>{converterTextOutput}</div>
          <div className={styles.currencies}>
            <div className={styles.currency}>RUR</div>
            <div className={`${styles.currency} ${styles.active}`}>USD</div>
            <div className={styles.currency}>EUR</div>
            <div className={styles.currency}>GBP</div>
            <div className={styles.currency}>↓</div>
          </div>

          <div className={styles.input_box}>
            <input className={styles.input} type="text" />
            <div className={styles.rate}>1 USD = 81.6279 RUR</div>
          </div>
        </div>
      </div>
    </section>
  );
};
