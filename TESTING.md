Backend:
- Controllers
  - Venues
    - it comes with predefined venues
    - when hitting the /venues endpoint it returns all venues currently in db
  - Users
    - it creates a new user
    (- it returns an error when submitted info is missing or invalid)
    - it returns the new user from the /users and /user/:id endpoints
    - it returns all users currently in db from /users endpoint
    - it allows existing user to login
    - it doesn't allow non-existing user to login
    - it doesn't allow existing user with wrong password to login
  - Games
    - it creates a new game
    (- it returns an error when submitted info is missing or invalid)
    - it attaches the selected venue to the new game
    - it returns the new game from the /games and /game/:id endpoints
    - it returns all games currently in db from /games endpoint
    - it adds an existing user to an existing game
    - it returns an error if the user doesn't exist
    - it returns an error if the game doesn't exist
    (- it doesn't add a player twice to one game)

Frontend:
- App
  - it stores test data from getVenues() and getGames() in context
- LoginPage
  - it calls loginUser() with test credentials when form is submitted
  - it calls setUser() after form was successfully submitted
  - it doesn't allow form to submit if credentials are incomplete
- RegisterForm
  - it calls registerUser() with test data when form is submitted
  - it calls setUser() after form was successfully submitted
  - it doesn't allow form to submit if data is incomplete
- HostGameForm
  - it calls createGame() with test data when form is submitted
  - it doesn't allow form to submit if data is incomplete
- AvailableGames
  - it has the same number of .availableGame as test data provided via useContext(GameContext)
  - it doesn't render .availableGame for test data with date in the past
  - it shows game with the earliest date as the first .availableGame in the document
  - it passes only games with the correct venue to setFilteredGames() after selecting a venue
  - it passes only games with the correct game type to setFilteredGames() after selecting game type
  - it passes only games with the correct date to setFilteredGames() after selecting date
  - it shows .notAvailableGames if empty array is passed via useContext(GameContext)
- GameDetails
  - it calls getGame() with the game id passed through props
  - it calls joinGame() with with game id passed through props and username passed into input when form is submitted
  - it shows correct number of .playerSpot and .freeSpot according to game info received from getGame()
- GamesPerVenue
  - it calls setVenue() with venue that has the id passed through props (venues provided via useContext(VenuesContext))
  - it calls setFilteredGames() only with games that have the correct venue (games provided via useContext(GamesContext))
  - +plus all tests for AvailableGames apply here too
- NavBar
  - it only has .userName if a user is provided via useContext(UserContext)
  - it calls handleLogout() if button inside .userName is clicked