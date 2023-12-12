import fetchMock from 'fetch-mock';
import authInfo from './data/authInfo.json';
import fodselsnr from './data/fodselsnr.json';
import kontaktInfo from './data/kontaktInfo.json';
import enheter from './data/enheter.json';
import Environment from 'src/Environments';

const { appUrl, personInfoApiUrl, authUrl } = Environment();
fetchMock.config.fallbackToNetwork = true;

const mockAuthInfo = true;
const mockFodselsnr = true;
const mockKontaktInfo = true;
const mockEnheter = true;

//TODO fjern
console.log('appUrl', appUrl);

export const setUpMock = async () => {
    mockAuthInfo &&
        fetchMock.get(
            `${authUrl}`,
            delay(10, 50).then(() => authInfo)
        );
    mockEnheter &&
        fetchMock.get(
            `${appUrl}/enheter`,
            delay(10, 50).then(() => enheter)
        );
    mockFodselsnr &&
        fetchMock.get(
            `${appUrl}/fodselsnr`,
            delay(10, 50).then(() => fodselsnr)
        );
    mockKontaktInfo &&
        fetchMock.get(
            `${personInfoApiUrl}/kontaktinformasjon`,
            delay(10, 50).then(() => kontaktInfo)
        );
};

const delay = (min: number, max: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * (max - min) + min);
    });
};
