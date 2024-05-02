import React from 'react';
import { render, screen } from '@testing-library/react';
import ListCard from './ListCard';

test('ListCard renders correctly', () => {
  const mockData = {
    photo: 'test.jpg',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
  };

  render(<ListCard data={mockData} />);

  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/30/i)).toBeInTheDocument();
  expect(screen.getByAltText('Placeholder Image')).toHaveAttribute('src', 'test.jpg');
});