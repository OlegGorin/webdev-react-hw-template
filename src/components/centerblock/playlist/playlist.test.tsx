import { render, screen } from "@testing-library/react";
import { Playlist } from "./Playlist";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "@/store/features/trackSlice";

describe("playlist", () => {
  const mockStore = configureStore([]);
  let store = mockStore({ playlist: initialState });
  it("render playlist", () => {
    const component = render(
      <Provider store={store}>
        <Playlist  tracks={[]}/>
      </Provider>
    );
    const textSinger = screen.getAllByText("Исполнитель");
    expect(textSinger.length).toBeGreaterThan(0);
    const textAlbum = screen.getAllByText("Альбом");
    expect(textAlbum.length).toBeGreaterThan(0);
  });
});