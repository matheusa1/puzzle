import { Container } from 'inversify'
import 'reflect-metadata'

import { GetDifficultyUseCase } from '../application/get.use.case'
import { GetDifficultiesUseCase } from '../application/getAll.use.case'

const registry = {
  GetDifficultiesUseCase: Symbol.for('GetDifficultiesUseCase'),
  GetDifficultyUseCase: Symbol.for('GetDifficultyUseCase'),
}

const container = new Container()

container
  .bind(registry.GetDifficultiesUseCase)
  .toConstantValue(new GetDifficultiesUseCase())

container.bind(registry.GetDifficultyUseCase).toDynamicValue((context) => {
  return new GetDifficultyUseCase(
    context
      .get<GetDifficultiesUseCase>(registry.GetDifficultiesUseCase)
      .execute(),
  )
})

export const difficulty = {
  getAll: container.get<GetDifficultiesUseCase>(
    registry.GetDifficultiesUseCase,
  ),
  get: container.get<GetDifficultyUseCase>(registry.GetDifficultyUseCase),
}
