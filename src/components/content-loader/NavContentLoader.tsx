import React from "react";
import ContentLoader, { Code, List } from "react-content-loader";

type props = {
  lines: number,
  width?: number,
  height?: number
};

const h = 10;

const Line = ({ i }: { i: number }) => {
  const lines = [
    (
      <>
        <rect x="0" y="0" rx="3" ry="3" width="67" height={h} />
        <rect x="76" y="0" rx="3" ry="3" width="140" height={h} />
      </>
    ),
    (
      <>
        <rect x="18" y="23" rx="3" ry="3" width="140" height={h} />
        <rect x="166" y="23" rx="3" ry="3" width="173" height={h} />
      </>
    ),
    (
      <>
        <rect x="127" y="48" rx="3" ry="3" width="53" height={h} />
        <rect x="187" y="48" rx="3" ry="3" width="72" height={h} />
        <rect x="18" y="48" rx="3" ry="3" width="100" height={h} />
      </>
    ),
    (
      <rect x="0" y="71" rx="3" ry="3" width="37" height={h} />
    )
  ];
  
  
};

export const NavContentLoader = ({ lines, width, height }: props) => {
  return (
    <ContentLoader width={width} height={1000}>
      {[...Array(lines)].map((_, i) => <Line index={i} key={i} />)}
    </ContentLoader>
  );
};
