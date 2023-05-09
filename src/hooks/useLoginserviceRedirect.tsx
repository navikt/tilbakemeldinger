import { useStore } from '../providers/Provider';
import Environments from '../Environments';

export const useLoginserviceRedirect = () => {
    const [{ auth }] = useStore();
    const { loginUrl } = Environments();

    // Redirect til loginservice hvis innlogget med wonderwall
    if (auth.authenticated && !hasLoginserviceToken()) {
        window.location.assign(`${loginUrl}?redirect=${window.location.href}`);
    }
};

const hasLoginserviceToken = () =>
    document.cookie.includes('selvbetjening-idtoken');
