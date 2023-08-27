const validateLocationState = (state) => {
  if (!state?.region) {
    return { valid: false, error: "County required!" };
  } else if (!state?.phone) {
    return { valid: false, error: "Phone number required!" };
  } else {
    return { valid: true, error: "" };
  }
};

const validatePhoneNumber = (phone) => {
  if (phone?.length > 13 || phone?.length < 9) {
    return { valid: false, error: "Invalid Phone number!" };
  } else if (phone?.startsWith("07")) {
    return {
      valid: true,
      phone: `${phone?.slice(0, phone?.length)}`,
    };
  } else if (phone?.startsWith("254")) {
    if (phone?.length !== 12) {
      return { valid: false, error: "Invalid Phone number!" };
    }
    return { valid: true, phone: "0" + phone?.slice(3, phone?.length) };
  } else if (phone?.startsWith("+254")) {
    if (phone?.length !== 13) {
      return { valid: false, error: "Invalid Phone number!" };
    }
    return { valid: true, phone: "0" + phone?.slice(4, phone?.length) };
  } else {
    return { valid: true, phone: "0" + phone };
  }
};

const validator = { validatePhoneNumber, validateLocationState };

export default validator;
