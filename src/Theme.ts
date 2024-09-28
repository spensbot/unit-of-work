export interface Theme {
  colors: {
    text: string
    bg: string
  }
}

export function createLight(): Theme {
  return {
    colors: {
      text: "#000",
      bg: "#fff",
    },
  }
}

export function createDark(): Theme {
  return {
    colors: {
      text: "#fff",
      bg: "#000",
    },
  }
}