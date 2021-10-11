export type AuthInfo = { loaded: boolean } & (
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      name: string;
      securityLevel: string;
    }
);
