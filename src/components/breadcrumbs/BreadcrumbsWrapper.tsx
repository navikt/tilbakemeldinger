import React from "react";

import Breadcrumbs, { BreadcrumbLenke } from "./Breadcrumbs";
import { urls } from "../../Config";
import HjemIkon from "assets/icons/line/home-1-line.svg";
import Environment from "../../Environments";

const baseLenker: Array<BreadcrumbLenke> = [
  {url: Environment().baseUrl, lenketekstId: "breadcrumb.nav-no", isExternal: true},
];

export default () => (
  <Breadcrumbs
    currentPath={window.location.pathname}
    basePath={urls.baseAppPath}
    ikonUrl={HjemIkon}
    baseLenker={baseLenker}
  />
);
