// import type { logedInUser } from "./user/usr.type";

declare namespace Express {
  export interface Request {
      user: any
  }
}