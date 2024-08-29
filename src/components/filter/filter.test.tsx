import { render, screen } from "@testing-library/react";
import { Filter } from "./Filter";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "@/store/features/trackSlice";

describe("filter component", () => {
  const mockStore = configureStore([]);
  let store = mockStore({ playlist: initialState });
  it("render titleFilter", () => {
    const component = render(
      <Provider store={store}>
        <Filter  tracks={[]}/>
      </Provider>
    );
    const text = screen.getAllByText("Искать по:");
    expect(text.length).toBeGreaterThan(0);
  });
});
