import Cookies from "js-cookie";

const testSluttTid = new Date("2019-11-27T10:00:00+01:00");
const cookieName = "kontakt-ab";
const aGruppeNavn = "gammel";
const bGruppeNavn = "ny";
const ikkeTesterGruppeNavn = "ikke-tester";

const setTestState = (erTestBruker: boolean, erIKontrollGruppe: boolean) => {
  const value = erTestBruker
    ? (erIKontrollGruppe ? aGruppeNavn : bGruppeNavn)
    : ikkeTesterGruppeNavn;

  Cookies.set(cookieName, value, {expires: testSluttTid});
};

const getTestState = () => {
  return Cookies.get(cookieName);
};

export default {
  setTestState,
  getTestState,
  aGruppeNavn,
  bGruppeNavn,
  ikkeTesterGruppeNavn,
};
