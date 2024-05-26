import { TokenImp } from '@interfaces/entities/token';

declare global {
  namespace Express {
    interface Request {
      token: TokenImp;
    }
  }
}
