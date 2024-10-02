import { HTTP_STATUS_CODE } from "@/utils/status-codes";

export class PasswordDoNotMatchError extends Error {
  public statusCode: number;
  constructor() {
    super("password and confirm_password do not match.");

    this.name = this.constructor.name;
    this.statusCode = HTTP_STATUS_CODE.BadRequest;
  }
}
