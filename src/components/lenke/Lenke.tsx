import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";

type Props = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  className?: string;
};

const CustomLenke = ({ href, children, isExternal, className }: Props) => {
  return isExternal ? (
    <Lenke href={href} className={`chevronlenke ${className}`}>
      {children}
    </Lenke>
  ) : (
    <Link to={href} className={`chevronlenke ${className} lenke`}>
      {children}
    </Link>
  );
};

export default CustomLenke;
