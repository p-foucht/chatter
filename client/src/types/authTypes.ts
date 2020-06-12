export interface AuthType {
  token: string;
  username: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticate: (data: any) => void;
}
