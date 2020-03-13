import { AlertStripeType } from "nav-frontend-alertstriper";

export type Alert = {
  tekst: string
  type: AlertStripeType
};

export type AlertJson = {
  "_createdAt": string,
  "_id": string,
  "_rev": string,
  "_type": string,
  "_updatedAt": string,
  "description": Array<{
    "_key": string,
    "_type": string,
    "children": Array<{
      "_key": string,
      "_type": string,
      "marks": Array<string>,
      "text": string
    }>,
    "markDefs": Array<string>,
    "style": string
  }>,
  "type": AlertStripeType
};

export const jsonToAlert = (json: AlertJson): Alert | null => {
  if (!json.description
    || !json.description[0]
    || !json.description[0].children
    || !json.description[0].children[0]) {
    return null;
  }

  return {
    tekst: json.description[0].children[0].text,
    type: json.type
  };
};

export const alertMock: Array<AlertJson> = [{
  "_createdAt": "2020-03-12T15:45:08Z",
  "_id": "4a1e55e6-643b-453b-8c95-423311c6cf83",
  "_rev": "rmWzzr2BwZU43esqF1GdIC",
  "_type": "alert",
  "_updatedAt": "2020-03-13T08:05:13Z",
  "description": [{
    "_key": "f9ff37bf3b48",
    "_type": "block",
    "children": [{
      "_key": "f9ff37bf3b480",
      "_type": "span",
      "marks": [],
      "text": "Det er for tiden mange som kontakter oss. Hvis henvendelsen din ikke haster, ber vi deg ta kontakt senere."
    }],
    "markDefs": [],
    "style": "normal"
  }],
  "type": "feil"
}];
