import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../Header/Header';
import { Home } from '../Home/Home';
import { Converter } from '../Converter/Converter';
import { LanguagePrefix } from '@shared/index';
import { apiKey, apiURl } from 'src/utils/constants';
import { handleLanguage } from 'src/utils/hooks';
import NoPage from '../NoPage/NoPage';
import { langContext } from 'src/utils/langContext';

function App() {
  const [lang, setLang] = useState<LanguagePrefix>('ru');

  // проверка страны из которой идет запрос для вывода валюты и языка
  const handleGeoCheck = async () => {
    const res = await axios.get(`${apiURl}/?api_key=${apiKey}`);
    setLang(handleLanguage(res.data.country));
  };

  useEffect(() => {
    handleGeoCheck();
  }, []);

  return (
    <BrowserRouter>
      <langContext.Provider value={lang}>
        <Header />
        <Switch>
          <Route exact path="/CurrConverter/" component={Home}></Route>
          <Route path="/CurrConverter/converter" component={Converter}></Route>
          <Route path="/CurrConverter/*" component={NoPage} />
        </Switch>
      </langContext.Provider>
    </BrowserRouter>
  );
}

export default App;
