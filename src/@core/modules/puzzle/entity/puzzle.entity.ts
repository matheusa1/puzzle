import { difficulty } from '../../../../../prisma/generated/prisma'

interface IPuzzle {
  id: string
  title: string
  description: string
  difficulty: difficulty
  createdAt: Date
  updatedAt: Date
}

export class Puzzle {
  constructor(public readonly props: IPuzzle) {}

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get difficulty() {
    return this.props.difficulty
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      difficulty: this.difficulty,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
