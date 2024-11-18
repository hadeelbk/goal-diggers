const BASE_URL = "http://localhost:3000"

export const getVenues = () => {
  return fetchData("/venues")
}

export const getGames = () => {
  return fetchData("/games")
}

export const getGame = (id) => {
  return fetchData("/games/" + id)
}

export const joinGame = (id, body) => {
  return fetchData("/games/" + id, "PUT", body)
}

export const createGame = (body) => {
  return fetchData("/games", "POST", body)
}

export const getUser = (id) => {
  return fetchData("/users/" + id)
}

export const getUsers = () => {
  return fetchData("/users")
}

export const loginUser = (body) => {
  return fetchData("/login", "POST", body)
}

export const registerUser = (body) => {
  return fetchData("/users", "POST", body)
}

async function fetchData (endpoint, method, body) {
  const headers = new Headers()
  headers.append("Content-type", "application/json")
  try {
    const result = await fetch(BASE_URL + endpoint, {
      method: method ? method : "GET",
      body: body ? JSON.stringify(body) : null,
      headers: headers
    })
    const result_1 = result.status <= 400 ? result : Promise.reject(result)
    return await (result_1.headers.get("content-type").match("application/json") ? result_1.json() : Promise.reject(result_1))
  } catch (error) {
    return error
  }
}