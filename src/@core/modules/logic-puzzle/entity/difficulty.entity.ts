type TDifficulty = {
  label: string
  value: string
}

export class Difficulty {
  constructor(public readonly props: TDifficulty) {}

  get label() {
    return this.props.label
  }

  get value() {
    return this.props.value
  }

  toJson() {
    return {
      label: this.label,
      value: this.value,
    }
  }
}
