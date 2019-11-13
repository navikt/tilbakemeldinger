import { ReactNode } from "react";

export interface LenkepanelData {
  tittelId: string;
  ingress: ReactNode;
  url: string;
  ikon?: any;
  external?: boolean;
}
