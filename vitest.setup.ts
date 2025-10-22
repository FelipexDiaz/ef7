Object.defineProperty(window, 'visualViewport', {
  value: {
    width: 1024,
    height: 768,
    scale: 1,
    pageLeft: 0,
    pageTop: 0,
    addEventListener: () => {},
    removeEventListener: () => {},
  },
  writable: true,
})
