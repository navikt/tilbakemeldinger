import { RequestHandler } from 'express';
import { URLs } from '../../../urls';
import { Enhet } from '../../../../../common/enhet';

const NORG2_API_URL = `${URLs.norg2Origin}${URLs.norg2Path}`;

const transformEnhet = (enhetRaw: Record<string, unknown> & Enhet): Enhet => ({
    enhetNr: enhetRaw.enhetNr,
    status: enhetRaw.status,
    navn: enhetRaw.navn,
    type: enhetRaw.type
})

export const enheterHandler: RequestHandler = async (req, res) => {
    const enheter = await fetch(NORG2_API_URL).then(norgRes => norgRes.json()).catch(e => {
        console.error(`Error fetching enheter from norg2 - ${e}`);
        return null;
    });

    if (!enheter || !Array.isArray(enheter)) {
        return res.status(500).send('Lasting av enheter feilet');
    }


    return res.send(enheter.map(transformEnhet));

};