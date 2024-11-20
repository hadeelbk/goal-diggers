import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { BASE_URL, fetchData, getGame, getGames, getVenues } from './apiService';

export const handlers = [
  http.get(`${BASE_URL}/venues`, () => {
    return HttpResponse.json([{ id: 1, name: "Venue 1" }]);
  }),
  http.get(`${BASE_URL}/games`, () => {
    return HttpResponse.json([{ id: 1, name: "Game 1" }]);
  }),
  http.get(`${BASE_URL}/games/1`, () => {
    return HttpResponse.json({ id: '1', name: "Game 1" });
  }),
  http.get(`${BASE_URL}/test`, () => {
    return HttpResponse.json({ id: 1, name: "Test" });
  })
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('apiService', () => {
  it('should fetch venues', async () => {
    const venues = await getVenues();
    expect(venues).toEqual([{ id: 1, name: "Venue 1" }]);
  });

  it('should fetch games', async () => {
    const games = await getGames();
    expect(games).toEqual([{ id: 1, name: "Game 1" }]);
  });

  it('should fetch a game', async () => {
    const game = await getGame('1');
    expect(game).toEqual({ id: '1', name: "Game 1" });
  });
});

describe('fetchData', () => {
  it('should fetch data from the server', async () => {
    const response = await fetchData('/test');
    expect(response).toEqual({ id: 1, name: "Test" });
  });

  it('should handle errors', async () => {
    try {
      await fetchData('/error');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('An error occurred');
      }
    }
  });
});
