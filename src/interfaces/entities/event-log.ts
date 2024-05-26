export interface EventLogImp {
  id: string;
  userId: string | null;
  description: string;
  timestamp: Date;
  code: number;
}

export interface EventLogPersistanceImp {
  userId: string | null;
  description: string;
  code: number;
}
