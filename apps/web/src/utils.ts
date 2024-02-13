// set token in sessionStorage
export const storedToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", token);
    return sessionStorage.getItem("token");
  }
};

// check that user is logged
export const isLogged = (token: string) => {
  if (typeof window !== "undefined") {
    if (token !== "undefined") {
      return true;
    }
  } else {
    return false;
  }
};
