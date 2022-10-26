import jwt_decode from "jwt-decode";

function checkExpiration(token) {
  const decode = jwt_decode(token);
  const currentTime = Date.now();

  if (decode.exp * 1000 < currentTime) {
    return false; // expired
  } else {
    return true;
  }
}

export default function getToken() {
  const tokenString = localStorage.getItem("token") || null;
  if (tokenString) {
    const userToken = JSON.parse(tokenString);

    if (checkExpiration(userToken)) {
      return userToken;
    } else {
      localStorage.clear();
      return "expired";
    }
  } else {
    return null;
  }
}
