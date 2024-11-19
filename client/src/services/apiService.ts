import { Game } from '../@types/game'

const BASE_URL = 'http://localhost:3000'

export const getVenues = () => {
  return fetchData('/venues')
}

export const getGames = () => {
  return fetchData('/games')
}

export const getGame = (id: string) => {
  return fetchData('/games/' + id)
}

interface JoinGame {
  userName: string;
}

export const joinGame = (id: string, body: JoinGame) => {
  return fetchData('/games/' + id, 'PUT', body)
}

export interface CreateGame {
  venue: string;
  date: string;
  number_of_players_needed: number;
  game_type: string;
  duration: number;
  price_per_head: number;
  contact_details: string;
}

export const createGame = (body: CreateGame) => {
  return fetchData('/games', 'POST', body)
}

export const getUser = (id: string) => {
  return fetchData('/users/' + id)
}

export const getUsers = () => {
  return fetchData('/users')
}

interface UserLogin {
  usernameOrEmail: string;
  password: string;
}

export const loginUser = (body: UserLogin) => {
  return fetchData('/login', 'POST', body)
}

interface UserRegistration {
  userName: string;
  password: string;
  email: string;
}

export const registerUser = (body: UserRegistration) => {
  return fetchData('/users', 'POST', body)
}

async function fetchData(endpoint: string, method: string = 'GET', body?: {}) {
  const headers = new Headers()
  headers.append('Content-type', 'application/json')
  try {
    const result = await fetch(BASE_URL + endpoint, {
      method: method ? method : 'GET',
      body: body ? JSON.stringify(body) : null,
      headers: headers
    })
    if (result.status > 400) {
      return Promise.reject(result);
    }
    const contentType = result.headers.get('content-type');
    if (contentType && contentType.match('application/json')) {
      return await result.json();
    } else {
      return Promise.reject(result);
    }
  } catch (error) {
    return error
  }
}