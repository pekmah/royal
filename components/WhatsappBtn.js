import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const handleWhatsAppButtonClick = () => {
    window.open("https://wa.me/254722638383", "_blank");
  };

  return (
    <div
      className={"shadow"}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        color: "#fff",
        borderRadius: "50%",
        background: "#25d366",
        width: "55px",
        height: "55px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleWhatsAppButtonClick}
    >
      <FaWhatsapp className="text-white" style={{ fontSize: "38px" }} />
    </div>
  );
};

export default WhatsAppButton;
