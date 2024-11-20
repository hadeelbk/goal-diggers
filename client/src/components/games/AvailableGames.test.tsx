import { describe, expect, it} from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom";
import { Game } from "../../@types/game";
import { Venue } from "../../@types/venue";
import { GamesContext, VenuesContext } from "../../App";
import AvailableGames from "./AvailableGames";
import { timeDisplay } from "../../utilities/date-time-display";

const mockVenues: Venue[] = [
    {
    _id: "1",
    name: "Stadium",
    address: "1234 Main St",
    capacity: 10,
    image: "https://example.com/image.jpg"
  },
  {
    _id: "2",
    name: "Arena",
    address: "1 Arena St",
    capacity: 20,
    image: "https://example.com/image.jpg"
  }
]

const pastDate = new Date(Date.now()-100000).toISOString();
const nearFutureDate = new Date(Date.now()+100000).toISOString();
const farFutureDate = new Date(Date.now()+10000000).toISOString();

const mockGames: Game[] = [
  {
    _id: "1",
    venue: mockVenues[0],
    date: pastDate,
    number_of_players_needed: 1,
    players: [],
    game_type: "5-a-side",
    duration: 90,
    price_per_head: 5,
    contact_details: "123456789"
  },
  {
    _id: "2",
    venue: mockVenues[0],
    date: nearFutureDate,
    number_of_players_needed: 1,
    players: [],
    game_type: "8-a-side",
    duration: 90,
    price_per_head: 5,
    contact_details: "123456789"
  },
  {
    _id: "3",
    venue: mockVenues[1],
    date: farFutureDate,
    number_of_players_needed: 1,
    players: [],
    game_type: "11-a-side",
    duration: 90,
    price_per_head: 5,
    contact_details: "123456789"
  }
]

describe("AvailableGames", () => {

  it("has the same number of .availableGame as games provided", async () => {
    const { container } = render(
      <MemoryRouter>
        <GamesContext.Provider value={{games: [...mockGames.slice(1)], setGames: ()=>{}}}>
          <AvailableGames />
        </GamesContext.Provider>
      </MemoryRouter>
    )

    const numOfGames = container.querySelectorAll(".availableGame").length
    expect(numOfGames).toBe(2)
  })

  it("it doesn't render .availableGame for games in the past", async () => {
    const { container } = render(
      <MemoryRouter>
        <GamesContext.Provider value={{games: [...mockGames.slice(0,1)], setGames: ()=>{}}}>
          <AvailableGames />
        </GamesContext.Provider>
      </MemoryRouter>
    )

    const numOfGames = container.querySelectorAll(".availableGame").length
    expect(numOfGames).toBe(0)
  })

  it("it shows game with the earliest date as the first .availableGame", async () => {
    const { container } = render(
      <MemoryRouter>
        <GamesContext.Provider value={{games: mockGames, setGames: ()=>{}}}>
          <AvailableGames />
        </GamesContext.Provider>
      </MemoryRouter>
    )

    const firstGame = container.querySelector(".availableGame")
    expect(firstGame).toContainHTML(timeDisplay(nearFutureDate))
  })

  it("it shows .notAvailableGames placeholder if no future games exist", async () => {
    const { container } = render(
      <MemoryRouter>
        <GamesContext.Provider value={{games: [...mockGames.slice(0,1)], setGames: ()=>{}}}>
          <AvailableGames />
        </GamesContext.Provider>
      </MemoryRouter>
    )

    const placeholder = container.querySelector(".notAvailableGames")
    expect(placeholder).toBeTruthy()
  })

  it("it shows only games with the correct venue when filter is active", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MemoryRouter>
      <VenuesContext.Provider value={{venues: mockVenues}}>
        <GamesContext.Provider value={{games: mockGames, setGames: ()=>{}}}>
          <AvailableGames />
        </GamesContext.Provider>
      </VenuesContext.Provider>
      </MemoryRouter>
    )

    const venueSelect = screen.getByDisplayValue("Select a venue");
    await user.selectOptions(venueSelect, mockVenues[0].name);
    const numOfGames = container.querySelectorAll(".availableGame").length
    expect(numOfGames).toBe(1)
    const firstGame = container.querySelector(".availableGame")
    expect(firstGame).toContainHTML(mockVenues[0].name)
  })

})