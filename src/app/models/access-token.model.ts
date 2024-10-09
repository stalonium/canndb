export interface AccessToken {
  id: number;
  token: string;
  status: 'unused' | 'used' | 'revoked';
  createdAt: Date;
  usedAt?: Date;
}