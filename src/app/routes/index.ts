import { logicPuzzleRoutes } from '../logic-puzzle/routes'

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
