import { instance } from "./instance";
import { FormDataType, ResponseType } from "./types";

export const authAPI = {
  me() {
    return instance.get<
      ResponseType<{ id: number; email: string; login: string }>
    >("auth/me");
  },
  login(data: FormDataType) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
