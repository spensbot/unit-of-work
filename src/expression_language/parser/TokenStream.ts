import { Id, isId, isIdStart } from '../Token/Id';
import { isKeyword, Keyword } from '../Token/Keyword';
import { isOpChar } from '../Token/Operator';
import { isPunc } from '../Token/Punc';
import { Str, STR_CHAR } from '../Token/Str';
import { Token, Num } from '../Token/Token';
import InputStream from './InputStream';

export default class TokenStream {
  private current: Token | null = null
  private input: InputStream

  constructor(input: string) {
    this.input = new InputStream(input)
  }

  peek(): Token | null {
    if (this.current === null) {
      this.current = this.readNext()
    }
    return this.current
  }

  next(): Token | null {
    const token = this.current
    this.current = null
    return token ?? this.readNext()
  }

  croak(msg: string): void {
    this.input.croak(msg)
  }

  private readWhile(predicate: (char: string) => boolean): string {
    let str = ''
    while (!this.input.eof() && predicate(this.input.peek())) {
      str += this.input.next()
    }
    return str
  }

  private readNumber(): Num {
    let hasDot = false
    const numberString = this.readWhile(ch => {
      if (ch === '.') {
        if (hasDot) return false
        hasDot = true
        return true
      }
      return isDigit(ch)
    })
    return { t: 'Num', value: parseFloat(numberString) }
  }

  private readId(): Id | Keyword {
    const id = this.readWhile(isId)
    return { t: isKeyword(id) ? 'Kw' : 'Id', value: id }
  }

  private readEscaped(end: string): string {
    let escaped = false
    let str = ''
    this.input.next()
    while (!this.input.eof()) {
      const ch = this.input.next()
      if (escaped) {
        str += ch
        escaped = false
      }
      else if (ch === '\\') {
        escaped = true
      }
      else if (ch === end) {
        break
      } else {
        str += ch
      }
    }
    return str
  }

  private readString(): Str {
    return { t: 'Str', value: this.readEscaped('"') }
  }

  private readNext(): Token | null {
    this.readWhile(isWhitespace)
    if (this.input.eof()) return null
    const ch = this.input.peek()
    if (ch === STR_CHAR) return this.readString()
    if (isDigit(ch)) return this.readNumber()
    if (isIdStart(ch)) return this.readId()
    if (isPunc(ch)) return { t: 'Punc', value: this.input.next() }
    if (isOpChar(ch)) return { t: 'Op', value: this.readWhile(isOpChar) }
    this.input.croak(`TokenStream: Can't handle character: "${ch}"`)
    throw new Error('unreachable')
  }
}

function isWhitespace(char: string): boolean {
  return /\s/.test(char)
}

function isDigit(ch: string): boolean {
  return /\d/.test(ch)
}
