import { useStore } from '../providers/Provider';
import Environments from '../Environments';
import { useEffect } from 'react';

export const useLoginserviceRedirect = () => {
    const [{ auth }] = useStore();
    const { loginUrl } = Environments();

    useEffect(() => {
        // Redirect til loginservice hvis innlogget med wonderwall
        if (auth.authenticated && !hasLoginserviceToken()) {
            window.location.assign(
                `${loginUrl}?redirect=${window.location.href}`
            );
        }
    }, []);
};

const hasLoginserviceToken = () =>
    document.cookie.includes('selvbetjening-idtoken');
