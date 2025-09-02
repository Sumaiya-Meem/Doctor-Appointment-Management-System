import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
  });
};

export default useLogin;
