import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GamesContext, VenuesContext } from '../../App';
import GamesPerVenue from './GamesPerVenue';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom'); // Import original module
  return {
    ...original, // Spread all original exports
    BrowserRouter: original.BrowserRouter // Ensure BrowserRouter is included
  };
});

describe('GamesPerVenue', () => {
  const mockVenues = [
    { _id: '1', name: 'Stadium', address: '1234 Main St', image: 'https://example.com/image.jpg', games: ['game1'], capacity: 10 },
  ];

  const mockGames = [
    {
      _id: 'game1',
      date: '2023-10-07T12:00:00Z',
      venue: mockVenues[0],
      game_type: '5-a-side',
      duration: 2,
      price_per_head: 20,
      players: [],
      number_of_players_needed: 10,
      contact_details: '1234567890',
    },
  ];


  it('renders correctly with games and venues', () => {
    render(
      <MemoryRouter>
        <GamesContext.Provider value={{ games: mockGames, setGames: vi.fn() }}>
          <VenuesContext.Provider value={{ venues: mockVenues }}>
            <GamesPerVenue />
          </VenuesContext.Provider>
        </GamesContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Stadium/i)).toBeInTheDocument();
    expect(screen.getByText('5-a-side')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('displays the no games message when no games are available', () => {
    render(
      <MemoryRouter>
        <GamesContext.Provider value={{ games: [], setGames: vi.fn() }}>
          <VenuesContext.Provider value={{ venues: mockVenues }}>
            <GamesPerVenue />
          </VenuesContext.Provider>
        </GamesContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Don't see any games\? Take the lead and host one of your own!/i)).toBeInTheDocument();
  });
});
