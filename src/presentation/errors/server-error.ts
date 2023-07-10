export class ServerError extends Error {
  constructor(stack: string | undefined) {
    super('Internal Server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
