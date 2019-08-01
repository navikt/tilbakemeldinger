import fetchMock from "fetch-mock";
import authInfo from "./data/authInfo.json";
import fodselsnr from "./data/fodselsnr.json";
import kontaktInfo from "./data/kontaktInfo.json";
import Environment from "../../utils/Environments";

const { baseUrl, apiUrl, personInfoApiUrl } = Environment();

const mockAuthInfo = true;
const mockFodselsnr = true;
const mockKontaktInfo = true;

export const setUpMock = async () => {
  mockAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
  mockFodselsnr &&
    fetchMock.get(`${apiUrl}/fodselsnr`, delay(10, 50).then(() => fodselsnr));
  mockKontaktInfo &&
    fetchMock.get(
      `${personInfoApiUrl}/kontaktinformasjon`,
      delay(10, 50).then(() => kontaktInfo)
    );
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
