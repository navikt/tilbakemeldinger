import Cookies from "js-cookie";

const testSluttTid = new Date("2019-11-28T00:01:00+01:00");
const cookieName = "kontakt-ab2";
const kontrollGruppeVariant = "gammel";
const testGruppeVariant = "ny";
const ikkeTesterVariant = "ikke-tester";

const setTestVariant = (erTestBruker: boolean, erIKontrollGruppe: boolean) => {
  const value = erTestBruker
    ? (erIKontrollGruppe ? kontrollGruppeVariant : testGruppeVariant)
    : ikkeTesterVariant;

  Cookies.set(cookieName, value, {expires: testSluttTid});
};

const getTestGruppe = () => {
  return Cookies.get(cookieName);
};

export default {
  setTestVariant,
  getTestGruppe,
  kontrollGruppeVariant,
  testGruppeVariant,
  ikkeTesterVariant,
};
