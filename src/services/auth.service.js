import instance from "@/libs/axios/instance";

const authServices = {
  register: (payload) => instance.post("/auth/register", payload),
  login: (payload) => instance.post("/auth/login", payload),
  logout: () => instance.post("/auth/logout"),
  user: () => instance.get("/auth/user"),
};

export default authServices;