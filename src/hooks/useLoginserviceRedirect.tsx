import { useStore } from '../providers/Provider';
import Environments from '../Environments';
import { useEffect } from 'react';

export const useLoginserviceRedirect = () => {
    const [{ auth, fodselsnr }] = useStore();
    const { loginUrl } = Environments();

    useEffect(() => {
        // Redirect til loginservice hvis innlogget med wonderwall
        // (fødselsnummer utledes fra loginservice-token)
        if (auth.loaded && auth.authenticated && !fodselsnr) {
            const loginserviceRedirectUrl = `${loginUrl}?redirect=${window.location.href}`;
            // Fjerner trailing slash pga rigit allow list i loginservice
            window.location.assign(loginserviceRedirectUrl.replace(/\/+$/, ''));
        }
    }, [auth.loaded, auth.authenticated]);
};
