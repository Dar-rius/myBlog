import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = ({ locals }) => {
  console.log(locals);
};

// set token in sessionStorage
export const storedToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", token);
    return sessionStorage.getItem("token");
  }
};

// check that user is logged
export const isLogged = (token: any): boolean => {
  if (token !== "undefined") {
    console.log("pass");
    return true;
  } else {
    console.log("pass");
    return false;
  }
};
