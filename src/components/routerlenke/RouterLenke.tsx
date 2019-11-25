import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";

type Props = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
};

const RouterLenke = (props: Props) => {
  const { href, children, isExternal, className, onClick } = props;
  return isExternal ? (
    <Lenke href={href} className={`routerlenke ${className}`} onClick={onClick}>
      {children}
    </Lenke>
  ) : (
    <Link
      to={href}
      className={`routerlenke lenke ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default RouterLenke;
