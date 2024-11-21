import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { VenuesContext } from '../../App';
import RegisteredVenueList from './RegisteredVenueList';

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