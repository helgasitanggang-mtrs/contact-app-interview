import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomizedDialogs from './ModalForm';

describe('CustomizedDialogs', () => {
  const mockHandleChange = jest.fn();
  const mockHandleClose = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockHandleSubmit = jest.fn();

  const mockData = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    imagePreview: 'test.jpg',
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <CustomizedDialogs
        data={mockData}
        handleChange={mockHandleChange}
        handleClose={mockHandleClose}
        handleDelete={mockHandleDelete}
        handleSubmit={mockHandleSubmit}
        open={true}
      />
    );
  });

  test('renders form fields correctly', () => {
    expect(screen.getByLabelText(/first name/i)).toHaveValue(mockData.firstName);
    expect(screen.getByLabelText(/last name/i)).toHaveValue(mockData.lastName);
    expect(screen.getByLabelText(/age/i)).toHaveValue(mockData.age.toString());
    expect(screen.getByTestId('image-upload')).toBeInTheDocument();
  });   

  test('handles input change', () => {
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    expect(mockHandleChange).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    expect(mockHandleChange).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '25' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  test('handles submit', () => {
    fireEvent.click(screen.getByText(/save changes/i));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});