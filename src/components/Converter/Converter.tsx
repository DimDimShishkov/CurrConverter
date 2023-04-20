import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Converter.module.scss';
import { ConverterInput, ConverterOutput, CurrencyDesc, CurrencyType } from '../../shared/index';
import { getAllCurrency } from 'src/api/api';
import { handleCurrency } from 'src/utils/hooks';
import { langContext } from 'src/utils/langContext';

export const Converter = () => {
  const lang = useContext(langContext);
  const converterTextInput = ConverterInput[lang];
  const converterTextOutput = ConverterOutput[lang];
  const [currencyIn, setCurrencyIn] = useState('AMD');
  const [currencyOut, setCurrencyOut] = useState('AMD');
  const [selectedCurrIn, setSelectedCurrIn] = useState('RUB');
  const [selectedCurrOut, setSelectedCurrOut] = useState('USD');
  const [inputCurrIn, setInputCurrIn] = useState<number>(0);
  const [inputCurrOut, setInputCurrOut] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currList, setCurrList] = useState<CurrencyType>([]);
  const impCurrency = ['RUB', 'USD', 'EUR'];

  const handleCurrencyValues = (value: string) => {
    setIsLoading(true);
    getAllCurrency(value)
      .then((res) => setCurrList(Object.entries(res.conversion_rates) as CurrencyType))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    let currValue = handleCurrency(lang);
    impCurrency.includes(currValue) ? setCurrencyIn('AMD') : setCurrencyIn(currValue);
    handleCurrencyValues(currValue);
  }, [lang]);

  const onChangeCurrency = (id: string, value: string) => {
    if (id === 'entrance') {
      setSelectedCurrIn(value);
      !impCurrency.includes(value) && setCurrencyIn(value);
      handleCurrencyValues(value);
      setInputCurrIn(0);
      setInputCurrOut(0);
    } else {
      setSelectedCurrOut(value);
      !impCurrency.includes(value) && setCurrencyOut(value);
      setInputCurrIn(0);
      setInputCurrOut(0);
    }
  };

  const onChangeSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    onChangeCurrency(id, value);
  };

  const handleFindCurrency = (curr: string) => {
    const result = currList.find((item) => item[0] === curr);
    return result ? +Number(result[1]).toFixed(4) : 1;
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'currIn') {
      setInputCurrIn(+value);
      setInputCurrOut(+(handleFindCurrency(selectedCurrOut) * +value).toFixed(2));
    } else {
      setInputCurrOut(+value);
      setInputCurrIn(+((1 / handleFindCurrency(selectedCurrOut)) * +value).toFixed(2));
    }
  };

  const handleChangeConverse = () => {
    const leftInput = inputCurrIn;
    const leftCurrency = selectedCurrIn;
    handleCurrencyValues(selectedCurrOut);
    setSelectedCurrIn(() => selectedCurrOut);
    setSelectedCurrOut(() => leftCurrency);
    setInputCurrIn(() => inputCurrOut);
    setInputCurrOut(() => leftInput);
  };

  return (
    <section className={styles.section}>
      <div className={styles.containers}>
        <div className={styles.container}>
          <div className={styles.heading}>{converterTextInput}</div>
          <div className={styles.currencies}>
            <div
              className={cn(styles.currency, selectedCurrIn === 'RUB' && styles.active)}
              onClick={() => onChangeCurrency('entrance', 'RUB')}
            >
              RUB
            </div>
            <div
              className={cn(styles.currency, selectedCurrIn === 'USD' && styles.active)}
              onClick={() => onChangeCurrency('entrance', 'USD')}
            >
              USD
            </div>
            <div
              className={cn(styles.currency, selectedCurrIn === 'EUR' && styles.active)}
              onClick={() => onChangeCurrency('entrance', 'EUR')}
            >
              EUR
            </div>
            <div
              className={cn(styles.currency, selectedCurrIn === currencyIn && styles.active)}
              onClick={() => onChangeCurrency('entrance', `${currencyIn}`)}
            >
              {currencyIn}
            </div>
            <select className={styles.currency} onChange={onChangeSelector} id="entrance">
              {currList.length &&
                currList.map(
                  ([key]) =>
                    CurrencyDesc[key] && (
                      <option value={key} key={key} className={styles.option}>
                        {CurrencyDesc[key]} ({key})
                      </option>
                    ),
                )}
            </select>
          </div>

          <div className={styles.input_box}>
            <input className={styles.input} type="number" value={inputCurrIn} id="currIn" onChange={onChangeInput} />
            {isLoading ? (
              <p className={styles.rate}>loading...</p>
            ) : (
              <p className={styles.rate}>
                1 {selectedCurrIn} = {handleFindCurrency(selectedCurrOut).toFixed(3)} {selectedCurrOut}
              </p>
            )}
          </div>
        </div>

        <span className={styles.arrow} onClick={() => handleChangeConverse()}></span>

        <div className={styles.container}>
          <div className={styles.heading}>{converterTextOutput}</div>
          <div className={styles.currencies}>
            <div
              className={cn(styles.currency, selectedCurrOut === 'RUB' && styles.active)}
              onClick={() => onChangeCurrency('output', 'RUB')}
            >
              RUB
            </div>
            <div
              className={cn(styles.currency, selectedCurrOut === 'USD' && styles.active)}
              onClick={() => onChangeCurrency('output', 'USD')}
            >
              USD
            </div>
            <div
              className={cn(styles.currency, selectedCurrOut === 'EUR' && styles.active)}
              onClick={() => onChangeCurrency('output', 'EUR')}
            >
              EUR
            </div>
            <div
              className={cn(styles.currency, selectedCurrOut === currencyOut && styles.active)}
              onClick={() => onChangeCurrency('output', `${currencyOut}`)}
            >
              {currencyOut}
            </div>
            <select className={styles.currency} onChange={(e) => onChangeSelector(e)} id="output">
              {currList.length &&
                currList.map(
                  ([key]) =>
                    CurrencyDesc[key] && (
                      <option value={key} key={key} className={styles.option}>
                        {CurrencyDesc[key]} ({key})
                      </option>
                    ),
                )}
            </select>
          </div>

          <div className={styles.input_box}>
            <input className={styles.input} type="number" value={inputCurrOut} id="currOut" onChange={onChangeInput} />
            {isLoading ? (
              <p className={styles.rate}>loading...</p>
            ) : (
              <p className={styles.rate}>
                1 {selectedCurrOut} = {(1 / handleFindCurrency(selectedCurrOut)).toFixed(3)} {selectedCurrIn}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
