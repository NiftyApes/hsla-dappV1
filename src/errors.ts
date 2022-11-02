export class ErrorWithReason extends Error {
  constructor(public reason: string) {
    super();
  }
}
