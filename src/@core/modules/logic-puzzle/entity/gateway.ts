import { hint, logic_puzzle } from '../../../../../prisma/generated/prisma'
import { TCreateLogicPuzzle } from './logic-puzzle.entity'

export interface ILogicPuzzleGateway {
  create(params: TCreateLogicPuzzle): Promise<logic_puzzle & { hint: hint[] }>
}
