import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const ScrollToTop = (props: Props) => {
    const location = useLocation();
    const { children } = props;

    useEffect(() => {
        const anchorId = location.hash.replace('#', '');
        const element = window.document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    return <>{children}</> || null;
};

export default ScrollToTop;
