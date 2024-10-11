import { Id, isId, isIdStart } from '../Token/Id';
import { isKeyword, Keyword } from '../Token/Keyword';
import { isOpChar, OperatorString } from '../Token/Operator';
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

  is(t: Token['t'], val: Token['val']): boolean {
    const token = this.peek()
    return token !== null && token.t === t && token.val === val
  }

  skip<T extends Token>(t: T['t'], val: T['val']): T {
    const tk = this.next()
    if (tk === null) {
      throw this.error('Unexpected end of input')
    }
    if (tk.t !== t || tk.val !== val) {
      throw this.error(`Expecting ${t} "${val}", got ${tk.t} "${tk.val}"`)
    }
    return tk as T
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

  error(msg: string): Error {
    return this.input.error(msg)
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
    return { t: 'Num', val: parseFloat(numberString) }
  }

  private readId(): Id | Keyword {
    const id = this.readWhile(isId)
    return { t: isKeyword(id) ? 'Kw' : 'Id', val: id }
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
    return { t: 'Str', val: this.readEscaped('"') }
  }

  private readNext(): Token | null {
    this.readWhile(isWhitespace)
    if (this.input.eof()) return null
    const ch = this.input.peek()
    if (ch === STR_CHAR) return this.readString()
    if (isDigit(ch)) return this.readNumber()
    if (isIdStart(ch)) return this.readId()
    if (isPunc(ch)) return { t: 'Punc', val: this.input.next() }
    if (isOpChar(ch)) return { t: 'Op', val: this.readWhile(isOpChar) as OperatorString }
    throw this.input.error(`TokenStream: Can't handle character: "${ch}"`)
  }
}

function isWhitespace(char: string): boolean {
  return /\s/.test(char)
}

function isDigit(ch: string): boolean {
  return /\d/.test(ch)
}
