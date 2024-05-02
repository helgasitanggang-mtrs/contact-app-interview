import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import  Button  from './Button';

test('Button click updates the state', () => {
  const handleClick = jest.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByText('Click me'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});