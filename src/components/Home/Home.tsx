import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { CurrencyDesc, CurrencyType } from './../../shared/index';
import { handleCurrency } from 'src/utils/hooks';
import { getAllCurrency } from 'src/api/api';
import Loader from '../Loader/Loader';
import { langContext } from 'src/utils/langContext';

export const Home = () => {
  const lang = useContext(langContext);
  const [currency, setCurrency] = useState('RUB');
  const [isLoading, setIsLoading] = useState(true);
  const [currList, setCurrList] = useState<CurrencyType>([]);

  const handleCurrencyValues = (value: string) => {
    setIsLoading(true);
    getAllCurrency(value)
      .then((res) => setCurrList(Object.entries(res.conversion_rates) as CurrencyType))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let currValue = handleCurrency(lang);
    setCurrency(currValue);
    handleCurrencyValues(currValue);
    const timer = setTimeout(() => {
      handleCurrencyValues(currValue);
    }, 60000);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>Конвертер валют</h1>
        <button className={styles.button} onClick={() => handleCurrencyValues(currency)}></button>
      </div>

      <p className={styles.subtitle}>
        Если у вас есть 1{' '}
        <select
          value={currList.length ? currList[0][0] : currency}
          onChange={(e) => handleCurrencyValues(e.target.value)}
          className={styles.select}
        >
          {currList.length &&
            currList.map(
              ([key]) =>
                CurrencyDesc[key] && (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ),
            )}
        </select>
        , вы можете обменять его на:
      </p>
      <div className={styles.container}>
        <p className={styles.heading}>Курс</p>
        <p className={styles.heading}>Название</p>
        <p className={styles.heading}>Код</p>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {currList.length &&
            currList.map(
              ([key, value]) =>
                CurrencyDesc[key] && (
                  <div key={key} className={styles.container}>
                    <p className={styles.subheading}>{value}</p>
                    <p className={styles.subheading}>{CurrencyDesc[key]}</p>
                    <p className={styles.subheading}>({key})</p>
                  </div>
                ),
            )}
        </>
      )}
    </section>
  );
};
