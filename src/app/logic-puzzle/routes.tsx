import { Search } from 'lucide-react'

export const logicPuzzleRoutes = {
  name: 'Logic Puzzle',
  icon: Search,
  routes: {
    index: {
      name: 'Problemas de Lógica',
      path: '/logic-puzzle',
    },
    create: {
      name: 'Criar',
      path: '/logic-puzzle/create',
    },
  },
}
