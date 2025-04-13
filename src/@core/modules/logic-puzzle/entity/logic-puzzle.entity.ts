import { difficulty } from '@/generated/prisma'

export type TLogicPuzzle = {
  title: string
  description: string
  image?: string
  difficulty: difficulty
}

export class LogicPuzzle {
  constructor(public readonly props: TLogicPuzzle) {}

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get image() {
    return this.props.image
  }

  get difficulty() {
    return this.props.difficulty
  }

  toJson() {
    return {
      name: this.title,
      description: this.description,
      image: this.image,
      difficulty: this.difficulty,
    }
  }
}
