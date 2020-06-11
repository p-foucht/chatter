export interface AuthType {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  authenticate: (data: any) => void;
}
