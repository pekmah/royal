export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// @ts-ignore
const getPhoneNumber = (phone) => {
  if (phone?.length > 13 || phone?.length < 9) {
    return { valid: false, error: "Invalid Phone number!" };
  } else if (phone?.startsWith("07")) {
    return "254" + phone?.slice(1, phone?.length);
  } else if (phone?.startsWith("254")) {
    return phone;
  } else if (phone?.startsWith("+254")) {
    return phone?.slice(1, phone?.length);
  } else if (phone.startsWith("7")) {
    return "254" + phone;
  }
};

const Helpers = { getPhoneNumber };

export default Helpers;
