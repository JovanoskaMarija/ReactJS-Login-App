import Navbar from "../containers/Dashboard/Navbar/Navbar";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";

describe("logout", () => {
  it("redirect to /login when logout is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/login"] });

    render(<Navbar />);
    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);

    expect(history.location.pathname).toEqual("/login");
  });
});
