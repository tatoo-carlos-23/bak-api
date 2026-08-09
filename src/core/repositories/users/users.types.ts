export interface IByEmailAndIsClient {
  id: number;
  email: string;
  password: string;
  names: string | null;
  last_names: string | null;
  accepts_terms: number;
  accept_privacy_terms: number;
}
