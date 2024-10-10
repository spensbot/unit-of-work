export default class InputStream {
  private input: string
  private position: number

  constructor(input: string) {
    this.input = input
    this.position = 0
  }

  public peek(): string {
    return this.input[this.position]
  }

  public next(): string {
    return this.input[this.position++]
  }

  public eof(): boolean {
    return this.position >= this.input.length
  }

  public croak(msg: string): void {
    throw new Error(`${msg} (${this.position})`)
  }
}

