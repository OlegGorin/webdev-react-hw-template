import { render, screen } from "@testing-library/react";
import { Search } from "./Search";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "@/store/features/trackSlice";

describe("filter", () => {
  const mockStore = configureStore([]);
  let store = mockStore({ playlist: initialState });
  it("render titleFilter", async () => {
    const component = render(
      <Provider store={store}>
        <Search/>
      </Provider>
    );
    const text = await screen.findByPlaceholderText("Поиск");
    expect(text).toMatch;
  });
});