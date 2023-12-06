import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Assuming you are using React Router
import LoginPage from './'; // Import your LoginPage component

describe('LoginPage', () => {
  test('renders login form', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Assert that essential elements are present
    expect(screen.getByText('Quiz Network')).toBeInTheDocument();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Please enter your details')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

});
