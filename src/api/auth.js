export const BASE_URL = "https://tweetbackend.azurewebsites.net/Tweets/";
const CONTENT_TYPE = "application/JSON";

const register = async (userData) => {
  let response = await fetch(BASE_URL + "Register/", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": CONTENT_TYPE,
      Accept: CONTENT_TYPE,
    },
  });
  if (response.ok) return true;
  return false;
};

const isEmailExist = async (email) => {
  let response = await fetch(BASE_URL + "search/" + email);
  let result = await response.json();
  if (result.email === email) return true;
  return false;
};

const login = async (userData) => {
  let response = await fetch(BASE_URL + "Login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": CONTENT_TYPE,
      Accept: CONTENT_TYPE,
    },
  });

  let result = await response.json();

  if (result.token == null) {
    return false;
  }

  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("name", result.loginId);
  sessionStorage.setItem("token", result.token);
  sessionStorage.setItem("phone", result.refreshToken);

  return true;
};

const resetPassword = async (userData) => {
  let response = await fetch(BASE_URL + { userData } + "/forget-Password", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": CONTENT_TYPE,
      Accept: CONTENT_TYPE,
    },
  });
  let result = await response.json();
  if (result === "Password Successfully Changed") {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    return true;
  }
  return false;
};

export { register, isEmailExist, login, resetPassword };
