import fetchMock from "fetch-mock";
import authInfo from "./data/authInfo.json";
import fodselsnr from "./data/fodselsnr.json";
import kontaktInfo from "./data/kontaktInfo.json";
import enheter from "./data/enheter.json";
import alerts from "./data/alerts.json";
import faq from "./data/faq.json";
import channels from "./data/kanalInfo.json";
import Environment from "../../Environments";

const { baseUrl, apiUrl, personInfoApiUrl } = Environment();
fetchMock.config.fallbackToNetwork = true;

const mockAuthInfo = true;
const mockFodselsnr = true;
const mockKontaktInfo = true;
const mockEnheter = true;
const mockAlerts = true;
const mockFaq = true;
const mockChannels = true;

export const setUpMock = async () => {
  mockAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
  mockEnheter &&
    fetchMock.get(`${apiUrl}/enheter`, delay(5000, 6000).then(() => enheter));
  mockFodselsnr &&
    fetchMock.get(`${apiUrl}/fodselsnr`, delay(10, 50).then(() => fodselsnr));
  mockKontaktInfo &&
    fetchMock.get(
      `${personInfoApiUrl}/kontaktinformasjon`,
      delay(10, 50).then(() => kontaktInfo)
    );
  mockAlerts &&
    fetchMock.get(`${apiUrl}/alerts`, delay(400, 500).then(() => alerts));
  mockFaq &&
    fetchMock.get(`${apiUrl}/faq`, delay(400, 500).then(() => faq));
  mockChannels &&
    fetchMock.get(`${apiUrl}/channels`, delay(400, 500).then(() => channels));
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
