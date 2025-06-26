import instance from "@/libs/axios/instance";

const authServices = {
  register: (payload) => instance.post(`/auth/register`, payload),
  login: (payload) => instance.post(`/auth/login`, payload),
};

export default authServices;
