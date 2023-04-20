import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { apiKey, apiURl } from 'src/utils/constants';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Конвертер валют/i);
  expect(linkElement).toBeInTheDocument();
});

test('parse data and return it as JSON', async () => {
  const res = await axios.get(`${apiURl}/?api_key=${apiKey}`);
  expect(res.data.city_geoname_id).toBeGreaterThan(0);
});
