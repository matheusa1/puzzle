import prisma from '@/@core/lib/prisma'
import { Container } from 'inversify'
import 'reflect-metadata'

import { CreateHintUseCase } from '../application/create.use.case'
import { HintGateway } from './gateway'

const registry = {
  CreateHintUseCase: Symbol.for('CreateHintUseCase'),
}

const container = new Container()

container.bind(registry.CreateHintUseCase).toConstantValue(() => {
  return new CreateHintUseCase(new HintGateway(prisma))
})

export const hintRegistry = {
  create: container.get<CreateHintUseCase>(registry.CreateHintUseCase),
}
