import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../App';
import NavBar from './NavBar';
import { User } from '../../@types/user';

describe('NavBar', () => {
  it('should display the correct links when user is not logged in', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: vi.fn() }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Games')).toBeInTheDocument();
    expect(screen.getByText('Host')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should display user information and logout button when user is logged in', () => {
    const setUserMock = vi.fn();
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: { userName: 'John Doe' } as User, setUser: setUserMock }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Logout'));
    expect(setUserMock).toHaveBeenCalledWith(null);
  });

  it('should logout user when logout button is clicked', () => {
    const setUserMock = vi.fn();
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: { userName: 'John Doe' } as User, setUser: setUserMock }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(setUserMock).toHaveBeenCalledWith(null);
  });
});