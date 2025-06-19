import { StorageKey } from "~/app/common/enums/storage-key-enum";
import api from "../api";
import type { Auth, Credentials } from "../models/credentials";
import { AxiosError } from "axios";

const API_ROUTE = "/account/authenticate";

export async function authService(body: Credentials) {
  try {
    const res = await api.post<Auth>(API_ROUTE, body);
    const access_token = res?.data?.access_token;
    if (res?.data?.access_token) {
      localStorage.setItem(StorageKey.access_token, access_token);
      // TODO: Redirect
    }
  } catch (error) {
    if (error instanceof AxiosError && error.status === 401) {
      return {
        message: error.message,
      };
    }
  }
}
