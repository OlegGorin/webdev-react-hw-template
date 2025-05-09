import Sidebar from "./Sidebar";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
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

describe("Sidebar component", () => {
  const mockStore = configureStore([]);
  let store = mockStore({ user: initialState });
  it("render component of Sidebar", () => {
    const component = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
    const imagePlaylist = screen.getByAltText("day's playlist");
    expect(imagePlaylist).toBeInTheDocument();
    const imageHits = screen.getByAltText("100 dance hits");
    expect(imageHits).toBeInTheDocument();
    const imageIndi = screen.getByAltText("indi-charge");
    expect(imageIndi).toBeInTheDocument();
  });
});
