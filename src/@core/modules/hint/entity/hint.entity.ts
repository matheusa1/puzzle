interface IHint {
  text: string
}

export class Hint {
  constructor(private readonly props: IHint) {}

  get text(): string {
    return this.props.text
  }

  toJson(): IHint {
    return {
      text: this.props.text,
    }
  }
}
