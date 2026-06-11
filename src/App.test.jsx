import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bakery nav logo', () => {
  render(<App />);
  const logo = screen.getByRole('link', { name: /La Pâtisserie/i });
  expect(logo).toBeDefined();
});

test('renders hero section', () => {
  render(<App />);
  const hero = screen.getByText(/Where Every Crumb/i);
  expect(hero).toBeDefined();
});

test('renders contact info', () => {
  render(<App />);
  const phones = screen.getAllByText(/\+33 1 42 36 58 90/i);
  expect(phones.length).toBeGreaterThanOrEqual(1);
});

test('renders menu section', () => {
  render(<App />);
  const menu = screen.getByText(/Viennoiseries/i);
  expect(menu).toBeDefined();
});

test('renders opening hours', () => {
  render(<App />);
  const hours = screen.getByText(/7h00 – 19h30/i);
  expect(hours).toBeDefined();
});
