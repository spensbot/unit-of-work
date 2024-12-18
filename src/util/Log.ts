export class Log {
  static Temp(message: string): void {
    console.debug(message)
  }

  static Info(message: string): void {
    console.log(message)
  }

  static Warn(message: string): void {
    console.warn(message)
  }

  static Error(message: string): void {
    console.error(message)
  }
}