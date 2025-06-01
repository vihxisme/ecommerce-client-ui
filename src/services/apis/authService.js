import http from "../http";

export const login = (request) => {
  return http.post("/identity/auth/login", {
    identifier: request.identifier,
    password: request.password,
  });
}

export const register = (request) => {
  console.log("request: ", request);
  return http.post("/identity/auth/register", {
    registerUserRequest: {
      username: request.username,
      email: request.email,
      password: request.password,
      confirmPassword: request.confirmPassword,
    },
    infoCustomer: {
      firstName: request.firstName,
      lastName: request.lastName,
      phone: request.phone,
    }
  });
}