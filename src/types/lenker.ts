import { ChatTema } from "./chat";
import { STOTema } from "./skrivtiloss";

export type TemaLenkepanelData = {
  tema: ChatTema | STOTema;
  url: string;
  tittelFallbackId: string;
  grafanaId: string;
  externalUrl?: boolean;
  ikon?: any;
};
