import { difficulty } from '../../../../../prisma/generated/prisma'
import { Hint } from '../../hint/entity/hint.entity'
import { Puzzle } from '../../puzzle/entity/puzzle.entity'

interface ILogicPuzzle {
  title: string
  description: string
  image?: string
  difficulty: difficulty
  hint?: Hint[]
}

export class LogicPuzzle extends Puzzle {
  constructor(public readonly props: ILogicPuzzle) {
    super(props)
  }

  get image() {
    return this.props.image
  }

  toJson() {
    return {
      title: this.title,
      description: this.description,
      image: this.image,
      difficulty: this.difficulty,
      hint: this.hint?.map((hint) => hint.toJson()),
    }
  }
}
