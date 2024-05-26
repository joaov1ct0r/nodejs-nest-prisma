export interface ErrorLogImp {
  id: string;
  userId: string | null;
  timestamp: Date;
  code: number;
  description: string;
}

export interface ErrorLogPersistanceImp {
  userId: string | null;
  code: number;
  description: string;
}
