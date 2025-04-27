import prisma from '@/@core/lib/prisma'
import { Container } from 'inversify'
import 'reflect-metadata'

import { CreatePuzzleUseCase } from '../application/create.use.case'
import { PuzzleGateway } from './gateway'

const registry = {
  gateway: Symbol.for('PuzzleGateway'),
  CreatePuzzleUseCase: Symbol.for('CreatePuzzleUseCase'),
}

const container = new Container()

container.bind(registry.gateway).toConstantValue(new PuzzleGateway(prisma))

container.bind(registry.CreatePuzzleUseCase).toDynamicValue(() => {
  return new CreatePuzzleUseCase(new PuzzleGateway(prisma))
})

export const puzzleRegistry = {
  create: container.get<CreatePuzzleUseCase>(registry.CreatePuzzleUseCase),
}
