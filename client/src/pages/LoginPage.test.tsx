import { vi, describe, expect, it} from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginPage from "./LoginPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../App";

interface MockUser {
  userId: string;
  username: string;
  email: string;
}

const mockUser:MockUser = {
  userId: "12345",
  username: "Testuser",
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
      <BrowserRouter>
        <UserContext.Provider value={{user: null, setUser: setUserMock}}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
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