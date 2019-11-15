import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";

type Props = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  className?: string;
};

const RouterLenke = ({ href, children, isExternal, className }: Props) => {
  return isExternal ? (
    <Lenke href={href} className={`routerlenke ${className}`}>
      {children}
    </Lenke>
  ) : (
    <Link to={href} className={`routerlenke lenke ${className}`}>
      {children}
    </Link>
  );
};

export default RouterLenke;
