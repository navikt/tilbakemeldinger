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
            window.location.assign(
                `${loginUrl}?redirect=${window.location.href}`
            );
        }
    }, [auth.loaded, auth.authenticated]);
};
