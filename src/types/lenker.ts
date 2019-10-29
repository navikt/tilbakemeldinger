import { ReactNode } from "react";

export interface LenkepanelData {
  tittel: string;
  ingress: ReactNode;
  url: string;
  ikon?: any;
  external?: boolean;
}
