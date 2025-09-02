import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios"; 

const useRegister = () => {
  return useMutation({
    mutationFn: async ({ role, data }) => {
      const endpoint =
        role === "patient"
          ? "/auth/register/patient"
          : "/auth/register/doctor";

      const res = await axiosInstance.post(endpoint, data);
      return res.data;
    },
  });
};

export default useRegister;
