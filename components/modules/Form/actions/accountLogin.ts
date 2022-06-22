import Cookies from 'js-cookie';

export const handleAccountLogin = async (data: any) => {
  // send query to API
  const res = await fetch(`/api/customer/account-login`, {
    method: "POST",
    headers: {
      "content-type" : "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });

  const {
    customerAccessToken,
    customerUserErrors,
  } = await res.json();

  // save token to cookie
  

  // payload object for FOH display
  const payload = {
    successTitle: "",
    successMessage: !customerUserErrors.length ? (
      "Logged In"
    ) : false,
    errorTitle: "",
    errorMessage: customerUserErrors.length ? (
      "Could not find customer"
    ) : false,
  }

  return payload;
}
