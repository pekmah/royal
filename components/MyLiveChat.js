import React, { useEffect } from "react";

const MyLiveChat = () => {
  useEffect(() => {
    // Add the myLiveChat script here
    const script = document.createElement("script");
    script.src =
      "https://mylivechat.com/chatinline.aspx?HCCID=34992597&InPageTemplate=5&InPagePosition=bottomleft"; // Replace with your chat ID
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null;
};
export default MyLiveChat;
