import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { apiKey, apiURl } from 'src/utils/constants';

test('render header', () => {
  render(<App />);
  const linkElement = screen.getByText(/На главную/i);
  expect(linkElement).toBeInTheDocument();
});

test('parse data and return it as JSON', async () => {
  const res = await axios.get(`${apiURl}/?api_key=${apiKey}`);
  expect(res.data.city_geoname_id).toBeGreaterThan(0);
});
