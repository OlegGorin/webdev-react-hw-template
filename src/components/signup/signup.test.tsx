import { render, screen, cleanup } from "@testing-library/react";
import SignupPage from "./Signup";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "@/store/features/userSlice";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

afterEach(cleanup);

describe("test Signup component", () => {
  const mockStore = configureStore([]);
  let store = mockStore({ user: initialState });
  it("render Signup", () => {
    const component = render(
      <Provider store={store}>
        <SignupPage />
      </Provider>
    );
    const items = screen.getAllByRole("textbox");
    expect(items).toHaveLength(2);
  });
  it("render Signup", async () => {
    const component = render(
      <Provider store={store}>
        <SignupPage />
      </Provider>
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });
});