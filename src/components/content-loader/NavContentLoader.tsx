import React from "react";
import ContentLoader from "react-content-loader";

type props = {
  lines: number,
  lineHeight?: number,
};

const Line = ({ lineIndex, lineHeight }: { lineIndex: number, lineHeight: number }) => {
  const yPos = lineHeight * 2 * lineIndex;
  const lineGfx = [
    (
      <>
        <rect x="0" y={yPos} rx="3" ry="3" width="67" height={lineHeight} />
        <rect x="76" y={yPos} rx="3" ry="3" width="140" height={lineHeight} />
      </>
    ),
    (
      <>
        <rect x="18" y={yPos} rx="3" ry="3" width="140" height={lineHeight} />
        <rect x="166" y={yPos} rx="3" ry="3" width="173" height={lineHeight} />
      </>
    ),
    (
      <>
        <rect x="127" y={yPos} rx="3" ry="3" width="53" height={lineHeight} />
        <rect x="187" y={yPos} rx="3" ry="3" width="72" height={lineHeight} />
        <rect x="18" y={yPos} rx="3" ry="3" width="100" height={lineHeight} />
      </>
    ),
    (
      <rect x="0" y={yPos} rx="3" ry="3" width="37" height={lineHeight} />
    )
  ];

  return lineGfx[lineIndex % lineGfx.length];
};

export const NavContentLoader = ({ lines, lineHeight = 10 }: props) => {
  return (
    <ContentLoader height={lines * lineHeight * 2} className={"nav-content-loader"}>
      {[...Array(lines)].map((_, index) => <Line lineIndex={index} lineHeight={lineHeight} key={index} />)}
    </ContentLoader>
  );
};
