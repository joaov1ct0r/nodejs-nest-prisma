export interface ErrorLogImp {
  id: string;
  userId: string;
  timestamp: Date;
  code: number;
  description: string;
}

export interface ErrorLogPersistanceImp {
  userId: string;
  code: number;
  description: string;
}
