import React from "react";
import ContentLoader, { Code, List } from "react-content-loader";

type props = {
  lines: number,
  width?: number,
  height?: number
};

const lineGfx: JSX.Element[] = [
  (
    <>
      <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
      <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
    </>
  ),
  (
    <>
      <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
      <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
    </>
  ),
  (
    <>
      <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
      <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
      <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
    </>
  ),
  (
    <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
  )
];

export const NavContentLoader = ({lines, width, height}: props) => {
  return (
    <ContentLoader width={width} height={height} >
      {[...Array(lines)].map((_, i) => lineGfx[i % (lineGfx.length)])}
    </ContentLoader>
  );
};
