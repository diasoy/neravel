import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

const onErrorHander = (error) => {
  const { response } = error;
  const res = response?.data;
  if (response && res?.data?.name === "TokenExpiredError") {
    signOut();
  }
};

export { onErrorHander };
