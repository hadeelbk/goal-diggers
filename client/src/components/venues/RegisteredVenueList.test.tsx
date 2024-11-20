import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GamesContext, VenuesContext } from '../../App';
import { describe, it, expect, vi } from 'vitest';
import RegisteredVenueList from './RegisteredVenueList';

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    BrowserRouter: original.BrowserRouter
  };
});

describe('RegisteredVenueList', () => {
  const mockVenues = [
    { _id: '1', name: 'Stadium', address: '1234 Main St', image: 'https://example.com/image.jpg', games: ['game1'], capacity: 10 },
  ];

  it('renders correctly with venues', () => {
    render(
      <MemoryRouter>
        <VenuesContext.Provider value={{ venues: mockVenues }}>
          <RegisteredVenueList />
        </VenuesContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Stadium')).toBeInTheDocument();
    expect(screen.getByText('1234 Main St')).toBeInTheDocument();
  });
});