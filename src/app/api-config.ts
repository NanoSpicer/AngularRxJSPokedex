

export const ApiConfig = {
  baseurl: 'https://pokeapi.co/api/v2/pokemon',
  gen1: {
    offset: 0,
    limit: 151
  },
  gen2: {
    offset: 151,
    limit: 100
  }
}

export type ApiConfig = typeof ApiConfig
