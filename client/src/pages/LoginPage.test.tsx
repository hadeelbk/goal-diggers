import { vi, describe, expect, it} from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginPage from "./LoginPage"
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../App";

interface MockUser {
  _id: string;
  userName: string;
  email: string;
}

const mockUser:MockUser = {
  _id: "12345",
  userName: "Testuser",
  email: "test@test.test"
};

vi.mock("../services/apiService.ts", () => {
  return {
    loginUser: vi.fn(() => mockUser)
  }
});

describe("LoginPage", () => {

  it("calls loginUser() with test credentials when form is submitted", async () => {
    const apiMock = await import("../services/apiService.ts");
    const setUserMock = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <UserContext.Provider value={{user: null, setUser: setUserMock}}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Username or Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", {name: "Log In"});

    await user.type(emailInput, mockUser.email);

    expect(submitButton).toBeDisabled()

    await user.type(passwordInput, "test1234");
    await user.click(submitButton);

    expect(apiMock.loginUser).toHaveBeenCalledWith({usernameOrEmail: mockUser.email, password: "test1234"})
    expect(setUserMock).toHaveBeenCalledWith(mockUser)
  })

})