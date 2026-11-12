import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { CLIP_SECONDS, ProcessSteps } from "@/components/about/ProcessSteps";

function setTime(video: HTMLVideoElement, t: number) {
  Object.defineProperty(video, "currentTime", { configurable: true, value: t });
  fireEvent.timeUpdate(video);
}

describe("ProcessSteps", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it("plays a muted background video starting with the picking clip, under a readability overlay", () => {
    const { container } = render(<ProcessSteps />);
    const video = container.querySelector("video")!;
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video).toHaveAttribute("src", "/video/process-1.mp4");
    expect(screen.getByTestId("process-overlay")).toBeInTheDocument();
  });

  it("highlights the step whose clip is playing", () => {
    render(<ProcessSteps />);
    const steps = within(screen.getByRole("list", { name: "Dari biji ke gelas" })).getAllByRole("listitem");
    expect(steps[0]).toHaveAttribute("aria-current", "step");
    expect(steps[1]).not.toHaveAttribute("aria-current");
  });

  it(`moves to the next step after ${CLIP_SECONDS} seconds and wraps around after the last`, () => {
    const { container } = render(<ProcessSteps />);
    const video = () => container.querySelector("video")!;
    const steps = () => within(screen.getByRole("list", { name: "Dari biji ke gelas" })).getAllByRole("listitem");

    act(() => setTime(video(), CLIP_SECONDS - 1));
    expect(steps()[0]).toHaveAttribute("aria-current", "step");

    act(() => setTime(video(), CLIP_SECONDS));
    expect(steps()[1]).toHaveAttribute("aria-current", "step");
    expect(video()).toHaveAttribute("src", "/video/process-2.mp4");

    act(() => fireEvent.ended(video()));
    act(() => fireEvent.ended(video()));
    expect(video()).toHaveAttribute("src", "/video/process-4.mp4");
    act(() => fireEvent.ended(video()));
    expect(video()).toHaveAttribute("src", "/video/process-1.mp4");
    expect(steps()[0]).toHaveAttribute("aria-current", "step");
  });

  it("runs on its own without a pause button", () => {
    render(<ProcessSteps />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
