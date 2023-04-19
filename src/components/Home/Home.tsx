import React, { FC, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { LanguagePrefix, CurrencyDesc, CurrencyType } from './../../shared/index';
import { handleCurrency } from 'src/utils/hooks';
import { getAllCurrency } from 'src/api/api';

interface IProps {
  lang: LanguagePrefix;
}

export const Home: FC<IProps> = ({ lang }) => {
  const [currency, setCurrency] = useState('RUB');
  const [isLoading, setIsLoading] = useState(true);
  const [currList, setCurrList] = useState<CurrencyType>([]);

  useEffect(() => {
    setIsLoading(true);
    let currValue = handleCurrency(lang);
    setCurrency(currValue);
    getAllCurrency(currValue)
      .then((res) => setCurrList(Object.entries(res.conversion_rates) as CurrencyType))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [lang]);

  useEffect(() => {
    // console.log(currList[0][0]);
  }, [currList]);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    getAllCurrency(e.target.value)
      .then((res) => setCurrList(Object.entries(res.conversion_rates) as CurrencyType))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={styles.section}>
      <h1>Конвертер валют</h1>
      <p>
        Если у вас есть 1{' '}
        <select value={currList.length ? currList[0][0] : currency} onChange={(e) => handleChangeSelect(e)}>
          {currList.length &&
            currList.map(
              ([key]) =>
                CurrencyDesc[key] && (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ),
            )}
        </select>{' '}
        , вы можете обменять его на:
      </p>
      {isLoading ? (
        <p>Идёт загрузка</p>
      ) : (
        <>
          {currList.length &&
            currList.map(
              ([key, value]) =>
                CurrencyDesc[key] && (
                  <div key={key} className={styles.container}>
                    <p>{value}</p>
                    <p>
                      {CurrencyDesc[key]} ({key})
                    </p>
                  </div>
                ),
            )}
        </>
      )}
    </section>
  );
};
