export type TAttribute = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  logicPuzzleId: string
  options: string[]
  solution_value: string[]
}

export class Attribute {
  constructor(private readonly props: TAttribute) {}

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get logicPuzzleId() {
    return this.props.logicPuzzleId
  }

  get options() {
    return this.props.options
  }

  get solution_value() {
    return this.props.solution_value
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      logicPuzzleId: this.logicPuzzleId,
      options: this.options,
      solution_value: this.solution_value,
    }
  }
}
