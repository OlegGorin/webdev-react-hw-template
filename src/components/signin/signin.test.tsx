import { render, screen, cleanup } from "@testing-library/react";
import { SigninPage } from "./Signin";
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

describe("test Signin component", () => {
  const mockStore = configureStore([]);
  let store = mockStore({ user: initialState });
  it("render Signin", () => {
    const component = render(
      <Provider store={store}>
        <SigninPage />
      </Provider>
    );
    expect(screen.getByText(/Войти/)).toBeInTheDocument;
    expect(screen.getByText(/Зарегистрироваться/)).toBeInTheDocument;
  });
  it("render Signin", async () => {
    const component = render(
      <Provider store={store}>
        <SigninPage />
      </Provider>
    );
    const items = await screen.findAllByRole("button");
    expect(items).toHaveLength(2);
  });
});
