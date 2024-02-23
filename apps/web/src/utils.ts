// check that user is logged
export const isLogged = (token: any): boolean => {
  if (token !== null) {
    return true;
  } else {
    return false;
  }
};

export const url = "http://localhost:4321";
