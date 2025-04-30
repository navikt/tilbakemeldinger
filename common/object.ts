import { sanitizeString } from './string';

export const sanitizeObject = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map((item) => sanitizeObject(item));
    } else if (typeof obj === 'object' && obj !== null) {
        const sanitizedObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sanitizedObj[key] = sanitizeObject(obj[key]);
            }
        }
        return sanitizedObj;
    } else if (typeof obj === 'string') {
        return sanitizeString(obj);
    }
    return obj;
};
