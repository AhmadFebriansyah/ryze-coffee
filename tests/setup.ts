import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";


// jsdom lacks these browser APIs used by motion / layout code.
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}
if (!("IntersectionObserver" in window)) {
  Object.defineProperty(window, "IntersectionObserver", { writable: true, configurable: true, value: IO });
  Object.defineProperty(globalThis, "IntersectionObserver", { writable: true, configurable: true, value: IO });
}

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
