export interface EventLogImp {
  id: string;
  userId: string;
  description: string;
  timestamp: Date;
  code: number;
}

export interface EventLogPersistanceImp {
  userId: string;
  description: string;
  code: number;
}
