class HttpException extends Error {
  public readonly statusCode?: number;
  public readonly name: string = 'HttpException';

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { HttpException };
