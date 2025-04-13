import { Container } from 'inversify'
import 'reflect-metadata'

import { GetDifficultyListUseCase } from '../application/getDifficulties.use.case'

const registry = {
  GetDifficultyListUseCase: Symbol.for('GetDifficultyListUseCase'),
}

const container = new Container()

container.bind(registry.GetDifficultyListUseCase).toDynamicValue(() => {
  return new GetDifficultyListUseCase()
})

export const logicPuzzle = {
  getDifficulties: container.get<GetDifficultyListUseCase>(
    registry.GetDifficultyListUseCase,
  ),
}
