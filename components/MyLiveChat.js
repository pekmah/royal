import React, { useEffect } from "react";

const MyLiveChat = () => {
  useEffect(() => {
    // Add the myLiveChat script here
    const script = document.createElement("script");
    script.src =
      "https://mylivechat.com/chatinline.aspx?HCCID=34992597&InPageTemplate=5&InPagePosition=bottomright"; // Replace with your chat ID
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      // if (document.getElementsByClassName("mylivechat_template5")[0] !== null)
      //   document.body.removeChild(script);
    };
  }, []);

  return null;
};
export default MyLiveChat;
