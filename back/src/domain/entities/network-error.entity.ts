type Props = {
  errorMessage?: string
  statusCode?: number
}

export class NetworkError extends Error {
  public errorMessage: string
  public statusCode: number

  constructor(params: Props) {
    const message = params.errorMessage || "NetworkError"
    super(message)
    this.errorMessage = message
    this.statusCode = params.statusCode || 400
  }
}
