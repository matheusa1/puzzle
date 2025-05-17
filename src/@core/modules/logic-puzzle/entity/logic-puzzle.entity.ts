import { difficulty } from '../../../../../prisma/generated/prisma'
import { Attribute, TAttribute } from '../../attribute/entity/attribute.entity'
import { Hint, THint } from '../../hint/entity/hint.entity'
import { Puzzle } from '../../puzzle/entity/puzzle.entity'

export type TCreateLogicPuzzle = {
  image?: string
  puzzleId: string
  hints: {
    text: string
    order: number
  }[]
}

export type TLogicPuzzle = {
  id: string
  title: string
  description: string
  image?: string
  difficulty: difficulty
  createdAt: Date
  updatedAt: Date
  hint?: THint[]
  attribute?: TAttribute[]
}

interface ILogicPuzzle {
  id: string
  title: string
  description: string
  image?: string
  difficulty: difficulty
  createdAt: Date
  updatedAt: Date
  hint?: Hint[]
  attribute?: Attribute[]
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
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      difficulty: this.difficulty,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      hint: this.props.hint?.map((hint) => hint.toJson()),
      attribute: this.props.attribute?.map((attribute) => attribute.toJson()),
    }
  }
}
