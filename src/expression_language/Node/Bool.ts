import TokenStream from "../parser/TokenStream"

export interface Bool {
  t: 'Bool'
  val: boolean
}

export function parseBool(ts: TokenStream): Bool | undefined {
  const tk = ts.peek()

  if (tk?.t === 'Kw' && (tk.val === 'true' || tk.val === 'false')) {
    ts.next()
    return {
      t: 'Bool',
      val: tk.val === 'true'
    }
  }
}