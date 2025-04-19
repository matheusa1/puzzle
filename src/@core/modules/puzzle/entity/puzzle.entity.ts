import { difficulty } from '../../../../../prisma/generated/prisma'
import { Hint } from '../../hint/entity/hint.entity'

interface IPuzzle {
  title: string
  description: string
  difficulty: difficulty
  hint?: Hint[]
}

export class Puzzle {
  constructor(public readonly props: IPuzzle) {}

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get difficulty() {
    return this.props.difficulty
  }

  get hint() {
    return this.props.hint
  }

  toJson() {
    return {
      title: this.title,
      description: this.description,
      difficulty: this.difficulty,
      hint: this.hint?.map((hint) => hint.toJson()),
    }
  }
}
