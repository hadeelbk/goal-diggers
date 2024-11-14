const baseUrl = "http://localhost:3000"

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

export const getUsers = () => {
  return fetchData("/users")
}

export const loginUser = (body) => {
  return fetchData("/login", "POST", body)
}

export const registerUser = (body) => {
  return fetchData("/users", "POST", body)
}


function fetchData (endpoint, method, body) {
  const headers = new Headers()
  headers.append("Content-type", "application/json")
  return fetch(baseUrl + endpoint, {
    method: method ? method : "GET",
    body: body ? JSON.stringify(body) : null,
    headers: headers
  })
  .then(result => result.status <= 400 ? result : Promise.reject(result))
  .then(result => result.headers.get("content-type").match("application/json") ? result.json() : Promise.reject(result))
  .catch(error => error)
}