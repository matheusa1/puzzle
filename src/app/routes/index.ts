import { logicPuzzleRoutes } from '../puzzle/logic/routes'

export const globalRoutes = {
  home: {
    name: 'Home',
    routes: {
      index: {
        name: 'Início',
        path: '/',
      },
    },
  },
  puzzles: [logicPuzzleRoutes],
}
