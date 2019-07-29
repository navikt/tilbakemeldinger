import fetchMock from "fetch-mock";
import authInfo from "./data/authInfo.json";
import Environment from "../../utils/Environments";

const { baseUrl } = Environment();

const mockAuthInfo = true;

export const setUpMock = async () => {
  mockAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
