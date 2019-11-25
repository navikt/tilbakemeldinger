import { ReactNode } from "react";

export interface LenkepanelData {
  grafanaId: string;
  tittelId: string;
  ingress: ReactNode;
  url: string;
  ikon?: any;
  external?: boolean;
}
