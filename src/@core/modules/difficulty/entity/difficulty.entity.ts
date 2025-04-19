interface IDifficulty {
  id: string
  label: string
  color: string
}

export class Difficulty {
  constructor(private readonly props: IDifficulty) {}

  get id(): string {
    return this.props.id
  }

  get label(): string {
    return this.props.label
  }

  get color(): string {
    return this.props.color
  }

  toJson(): IDifficulty {
    return {
      id: this.id,
      label: this.label,
      color: this.color,
    }
  }
}
