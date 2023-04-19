import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.module.scss';
import Header from '../Header/Header';
import { Home } from '../Home/Home';
import { Converter } from '../Converter/Converter';
import { LanguagePrefix } from '@shared/index';
import axios from 'axios';
import { apiKey, apiURl } from 'src/utils/constants';
import { handleLanguage } from 'src/utils/hooks';
import NoPage from '../NoPage/NoPage';

function App() {
  const [lang, setLang] = useState<LanguagePrefix>('ru');

  // проверка страны из которой идет запрос для вывода валюты и языка
  const handleGeoCheck = async () => {
    const res = await axios.get(`${apiURl}/?api_key=${apiKey}`);
    setLang(handleLanguage(res.data.country));
  };

  // useEffect(() => {
  //   handleGeoCheck();
  // }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header lang={lang} />
        <Switch>
          <Route exact path="/">
            <Home lang={lang} />
          </Route>
          <Route path="/converter">
            <Converter lang={lang} />
          </Route>
          <Route path="*" component={NoPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
