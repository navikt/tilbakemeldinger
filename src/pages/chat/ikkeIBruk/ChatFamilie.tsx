import React from "react";
import ChatTemaBase from "./ChatTemaBase";

const tittel = "chat.familie.tittel";
const ingress = "chat.familie.ingress";
const lenke = "#";

const ChatFamilie = () => {
  return(
    <ChatTemaBase
      tittel={tittel}
      ingress={ingress}
      lenke={lenke}
    />
  );
};

export default ChatFamilie;
