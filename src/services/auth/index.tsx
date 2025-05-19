import { decryptWithAES, encryptWithAES } from "utils/parse";
import http from "..";
import { Admin, LoginCustomerResponse, LoginData, LoginResponse } from "./type";


const tokenKey = "burtgel.token";
const userKey = "app.user";
const BASE_URL = "http://localhost:8000"; // Your backend URL

const auth = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await fetch(`${BASE_URL}/api/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Login failed", errorResponse);
      throw new Error(errorResponse.message || "Login error");
    } 

    const responseData: LoginResponse = await response.json();
    console.log("Login successful", responseData);

    if (!responseData.token) {
      throw new Error("Token not found");
    }

    // Save token & user data
    localStorage.setItem(tokenKey, responseData.token);
    localStorage.setItem(userKey, encryptWithAES(JSON.stringify(responseData.user)));

    return responseData; // Return user data for further usage
  },

  loginCustomer: (body?: any) =>
    http.post<LoginCustomerResponse>("/customer-company/login", { body }),

  saveToken: (token: string) => {
    localStorage.setItem(tokenKey, token);
  },

  hasToken: () => !!localStorage.getItem(tokenKey),

  removeToken: () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  },

  getToken: () => localStorage.getItem(tokenKey),

  signOut: () => {
    auth.removeToken();
    console.log("User signed out");
  },

  info: async (): Promise<Admin> => {
    const token = auth.getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/auth/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    return response.json();
  },

  rememberUser: (values: LoginData) => {
    if (values.remember) {
      localStorage.setItem(userKey, encryptWithAES(JSON.stringify(values)));
    } else {
      localStorage.removeItem(userKey);
    }
  },

  getRememberUser: (): LoginData | undefined => {
    const userData = localStorage.getItem(userKey);
    return userData ? (JSON.parse(decryptWithAES(userData)) as LoginData) : undefined;
  },
};

export default auth;
