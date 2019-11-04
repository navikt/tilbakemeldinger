import React from "react";

import Breadcrumbs, { BreadcrumbLenke } from "./Breadcrumbs";
import { urls } from "../../Config";
import HjemIkon from "assets/icons/line/home-1-line.svg";

const baseLenker: Array<BreadcrumbLenke> = [
  {url: "/", lenketekstId: "route.nav-no"}
];

export default () => (
  <Breadcrumbs
    currentPath={window.location.pathname}
    basePath={urls.baseUrl}
    ikonUrl={HjemIkon}
    baseLenker={baseLenker}
  />
);
