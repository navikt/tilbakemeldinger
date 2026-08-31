// Import global style early to ensure the later component-level imports
// gets higher specificity
import './App.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoot } from './index';
import { env } from './env';

const AppWithContext = () => {
    return (
        <React.StrictMode>
            <BrowserRouter basename={env.VITE_APP_BASEPATH}>
                <AppRoot />
            </BrowserRouter>
        </React.StrictMode>
    );
};

const rootElement = document.getElementById('maincontent') as HTMLElement;

// Hydrate whenever the server sent markup — in dev too, so hydration mismatches
// surface where they can be fixed rather than only in production. Checking for
// an element child rather than any child node: the template leaves whitespace
// around the SSR placeholder, so hasChildNodes() is true even when the render
// produced nothing (an unmatched route, or a failure htmlRenderer logged).
if (rootElement.firstElementChild) {
    ReactDOM.hydrateRoot(rootElement, <AppWithContext />);
} else {
    ReactDOM.createRoot(rootElement).render(<AppWithContext />);
}
