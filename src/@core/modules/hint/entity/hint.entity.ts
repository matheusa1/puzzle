export interface IHint {
  id: string
  logicPuzzleId: string
  order: number
  text: string
  createdAt: Date
  updatedAt: Date
}

export type THint = {
  id: string
  logicPuzzleId: string
  order: number
  text: string
  createdAt: Date
  updatedAt: Date
}

export type TCreateHint = {
  text: string
  order: number
  logicPuzzleId: string
}

export class Hint {
  constructor(private readonly props: IHint) {}

  get text(): string {
    return this.props.text
  }

  get id(): string {
    return this.props.id
  }

  get order(): number {
    return this.props.order
  }

  get logicPuzzleId(): string {
    return this.props.logicPuzzleId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  toJson(): IHint {
    return {
      text: this.props.text,
      id: this.props.id,
      logicPuzzleId: this.props.logicPuzzleId,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      order: this.props.order,
    }
  }
}
