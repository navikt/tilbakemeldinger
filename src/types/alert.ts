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
