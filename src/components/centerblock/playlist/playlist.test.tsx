import { render, screen } from "@testing-library/react";
import { Playlist } from "./Playlist";

describe("playlist", () => {
  it("render playlist", () => {
    render(<Playlist  tracks={[]}/>);
    const text = screen.getAllByText("Исполнитель");
    expect(text.length).toBeGreaterThan(0);
  });
  it("render playlist", () => {
    render(<Playlist  tracks={[]}/>);
    const text = screen.getAllByText("Альбом");
    expect(text.length).toBeGreaterThan(0);
  });
});