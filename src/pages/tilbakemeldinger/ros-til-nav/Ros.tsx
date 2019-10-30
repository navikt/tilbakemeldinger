import React, { useState, useEffect } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../../assets/Veileder.svg";
import { Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import InputNavn from "../../../components/input-fields/InputNavn";
import InputMelding from "../../../components/input-fields/InputMelding";
import { fetchEnheter, postRosTilNav } from "../../../clients/apiClient";
import Tilbake from "../../../components/tilbake/Tilbake";
import { HTTPError } from "../../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Element } from "nav-frontend-typografi";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, Form, Validation } from "calidation";
import Select from "react-select";
import { ValueType } from "react-select/src/types";
import { Enheter } from "../../../types/enheter";
import { useStore } from "../../../providers/Provider";
import Header from "../../../components/header/Header";
import { urls } from "Config";
import Box from "../../../components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import MetaTags from "react-meta-tags";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import Takk from "../../../components/takk/Takk";

type HVEM_ROSES = "NAV_KONTAKTSENTER" | "NAV_DIGITALE_LOSNINGER" | "NAV_KONTOR";

type OutboundRosTilNavBase = {
  navn: string;
  melding: string;
};

type OutboundRosTilNavExtend =
  | { hvemRoses: "NAV_KONTAKTSENTER" }
  | { hvemRoses: "NAV_DIGITALE_LOSNINGER" }
  | { hvemRoses: "NAV_KONTOR"; navKontor: string };

export type OutboundRosTilNav = OutboundRosTilNavBase & OutboundRosTilNavExtend;

const Ros = (props: RouteComponentProps) => {
  const [{ enheter }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();

  useEffect(() => {
    fetchEnheter()
      .then((enheter: Enheter[]) => {
        dispatch({ type: "SETT_ENHETER_RESULT", payload: enheter });
      })
      .catch((error: HTTPError) => {
        dispatch({ type: "SETT_ENHETER_ERROR", payload: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formConfig = {
    navn: {},
    hvemRoses: {
      isRequired: intl.formatMessage({
        id: "validering.hvemroses.pakrevd"
      })
    },
    melding: {
      isRequired: intl.formatMessage({
        id: "validering.melding.pakrevd"
      })
    }
  };

  const navKontorConfig = {
    navKontor: {
      isRequired: intl.formatMessage({
        id: "validering.navkontor.pakrevd"
      })
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, melding } = fields;
    const hvemRoses: HVEM_ROSES = fields.hvemRoses;

    if (isValid) {
      const outboundBase = {
        ...(navn && {
          navn
        }),
        melding
      };

      const outboundExtend: {
        [key in HVEM_ROSES]: OutboundRosTilNavExtend;
      } = {
        NAV_KONTAKTSENTER: { hvemRoses: "NAV_KONTAKTSENTER" },
        NAV_DIGITALE_LOSNINGER: { hvemRoses: "NAV_DIGITALE_LOSNINGER" },
        NAV_KONTOR: {
          hvemRoses: "NAV_KONTOR",
          navKontor: fields.navKontor ? fields.navKontor.label : undefined
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemRoses]
      };

      console.log(outbound);
      settLoading(true);
      postRosTilNav(outbound)
        .then(() => {
          settSuccess(true);
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  const tittel = intl.formatMessage({
    id: "tilbakemeldinger.ros.form.overskrift"
  });

  return (
    <div className="pagecontent">
      <MetaTags>
        <title>{intl.messages["seo.rostilnav.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["seo.rostilnav.description"] as string}
        />
      </MetaTags>
      <Tilbake to={urls.tilbakemeldinger.forside} />
      <Header
        title={intl.formatMessage({ id: "tilbakemeldinger.ros.form.tittel" })}
      />
      <div className="tb__veileder">
        <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
          <FormattedHTMLMessage id={"tilbakemeldinger.ros.form.veileder"} />
        </Veilederpanel>
      </div>
      <Box tittel={tittel}>
        {success ? (
          <Takk />
        ) : (
          <Form onSubmit={send}>
            <Validation config={formConfig}>
              {({ errors, fields, submitted, setField, isValid }) => {
                return (
                  <>
                    <InputNavn
                      bredde={"L"}
                      label={intl.formatMessage({
                        id: "felter.navn.tittel.valgfritt"
                      })}
                      value={fields.navn}
                      error={errors.navn}
                      onChange={v => setField({ navn: v })}
                      submitted={submitted}
                    />
                    <SkjemaGruppe
                      title={intl.formatMessage({
                        id: "felter.hvemroses.tittel"
                      })}
                      feil={
                        submitted && errors.hvemRoses
                          ? { feilmelding: errors.hvemRoses }
                          : undefined
                      }
                    >
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemroses.navkontaktsenter"
                        })}
                        name={"NAV_KONTAKTSENTER"}
                        checked={fields.hvemRoses === "NAV_KONTAKTSENTER"}
                        onChange={() =>
                          setField({ hvemRoses: "NAV_KONTAKTSENTER" })
                        }
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemroses.digitaletjenester"
                        })}
                        name={"NAV_DIGITALE_LOSNINGER"}
                        checked={fields.hvemRoses === "NAV_DIGITALE_LOSNINGER"}
                        onChange={() =>
                          setField({ hvemRoses: "NAV_DIGITALE_LOSNINGER" })
                        }
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemroses.navkontor"
                        })}
                        name={"NAV_KONTOR"}
                        checked={fields.hvemRoses === "NAV_KONTOR"}
                        onChange={() => setField({ hvemRoses: "NAV_KONTOR" })}
                      />
                      {fields.hvemRoses === "NAV_KONTOR" && (
                        <Validation config={navKontorConfig}>
                          {() => {
                            return (
                              <div className="ros-til-nav__navkontor">
                                <div className="ros-til-nav__label">
                                  <Element>
                                    <FormattedMessage
                                      id={"felter.hvemroses.navkontor.velg"}
                                    />
                                  </Element>
                                </div>
                                {enheter.status === "RESULT" ? (
                                  <Select
                                    placeholder={intl.formatMessage({
                                      id: "felter.hvemroses.navkontor.skrivinn"
                                    })}
                                    classNamePrefix={
                                      submitted && errors.navKontor
                                        ? "ros-til-nav-feil"
                                        : "ros-til-nav"
                                    }
                                    value={fields.navKontor}
                                    onChange={(
                                      v: ValueType<{
                                        value: string;
                                        label: string;
                                      }>
                                    ) => setField({ navKontor: v })}
                                    options={enheter.data
                                      .sort((a, b) =>
                                        a.enhetsnavn < b.enhetsnavn ? -1 : 1
                                      )
                                      .map(enhet => ({
                                        value: enhet.enhetsnummer,
                                        label: `${enhet.enhetsnavn} -  ${enhet.enhetsnummer}`
                                      }))}
                                  />
                                ) : (
                                  <div className="ros-til-nav__spinner">
                                    <NavFrontendSpinner />
                                  </div>
                                )}
                                {submitted && errors.navKontor && (
                                  <div role="alert" aria-live="assertive">
                                    <div className="skjemaelement__feilmelding">
                                      {errors.navKontor}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }}
                        </Validation>
                      )}
                    </SkjemaGruppe>
                    <div className="mellomrom">
                      <InputMelding
                        label={intl.formatMessage({
                          id: "felter.melding.tittel"
                        })}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    {error && (
                      <AlertStripeFeil>
                        <FormattedMessage id={"felter.noegikkgalt"} /> {error}
                      </AlertStripeFeil>
                    )}
                    <div className="tb__knapper">
                      <div className="tb__knapp">
                        <Knapp
                          htmlType={"submit"}
                          type={"standard"}
                          disabled={loading || (submitted && !isValid)}
                        >
                          {loading ? (
                            <NavFrontendSpinner type={"S"} />
                          ) : (
                            <FormattedMessage id={"felter.send"} />
                          )}
                        </Knapp>
                      </div>
                      <div className="tb__knapp">
                        <Link to={urls.tilbakemeldinger.forside}>
                          <Knapp type={"flat"}>
                            <FormattedMessage id={"felter.tilbake"} />
                          </Knapp>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              }}
            </Validation>
          </Form>
        )}
      </Box>
    </div>
  );
};
export default withRouter(Ros);
