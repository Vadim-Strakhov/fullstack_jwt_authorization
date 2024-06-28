import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import axios from "axios";
import AuthService from "../services/AuthService";
import { AxiosError } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

interface ErrorResponse {
  message: string;
}

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      console.log(error.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      console.log(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      return response;
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
