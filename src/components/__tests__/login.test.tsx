import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import Login from "../../containers/Login/LoginForm";

describe("login", () => {
  test("inputs and button to be included; on click redirect to /dashboard", async () => {
    const history = createMemoryHistory({ initialEntries: ["/dashboard"] });
    history.replace = jest.fn();

    render(<Login />);

    const username = screen.getByRole("textbox", { name: /Username/i });
    const password = screen.getByRole("password", { name: /password/i });
    const button = screen.getByRole("button", { name: /Login/i });

    await waitFor(() => {
      fireEvent.change(username, {
        target: {
          value: "admin",
        },
      });
    });

    await waitFor(() => {
      fireEvent.change(password, {
        target: {
          value: "password        ",
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(button);
    });

    await waitFor(() => expect(history.location.pathname).toBe("/dashboard"));
  });
});
