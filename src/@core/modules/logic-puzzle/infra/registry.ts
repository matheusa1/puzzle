import prisma from '@/@core/lib/prisma'
import { Container } from 'inversify'
import 'reflect-metadata'

import { CreateLogicPuzzleUseCase } from '../application/create.use.case'
import { LogicPuzzleGateway } from './gateway'

const registry = {
  Gateway: Symbol.for('LogicPuzzleGateway'),
  CreateLogicPuzzleUseCase: Symbol.for('CreateLogicPuzzleUseCase'),
}

const container = new Container()

container
  .bind(registry.Gateway)
  .toConstantValue(() => new LogicPuzzleGateway(prisma))

container.bind(registry.CreateLogicPuzzleUseCase).toDynamicValue(() => {
  return new CreateLogicPuzzleUseCase(new LogicPuzzleGateway(prisma))
})

export const logicPuzzleRegistry = {
  create: container.get<CreateLogicPuzzleUseCase>(
    registry.CreateLogicPuzzleUseCase,
  ),
}
