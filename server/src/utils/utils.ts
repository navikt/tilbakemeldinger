import { URLs } from '../urls';

export const getLastSegmentFromUrl = (url: string) => {
    const segments = url.split('/');
    return segments.pop() ?? '';
};

export const checkIfPage = (url: string) =>
    URLs.allPages.includes(getLastSegmentFromUrl(url));
