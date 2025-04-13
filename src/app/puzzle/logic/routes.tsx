import { Search } from 'lucide-react'

export const logicPuzzleRoutes = {
  name: 'Logic Puzzle',
  icon: Search,
  routes: {
    index: {
      name: 'Problemas de Lógica',
      path: '/puzzle/logic',
    },
    create: {
      name: 'Criar',
      path: '/puzzle/logic/create',
    },
  },
}
