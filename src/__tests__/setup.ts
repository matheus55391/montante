import '@testing-library/jest-dom/vitest'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock

Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  configurable: true,
  value: () => ({
    width: 800,
    height: 320,
    top: 0,
    left: 0,
    bottom: 320,
    right: 800,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }),
})
