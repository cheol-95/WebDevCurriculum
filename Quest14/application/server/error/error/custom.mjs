export class CustomError extends Error {
  status;
  message;
  constructor(status, message) {
    super();
    this.status = status || 400;
    this.message = message;
  }
}
