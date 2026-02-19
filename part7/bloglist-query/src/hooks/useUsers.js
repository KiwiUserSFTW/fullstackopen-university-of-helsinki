import { useQuery } from "@tanstack/react-query";

// api
import usersService from "../services/users";

export const useGetUsers = () => {
  const query = useQuery({ queryKey: ["users"], queryFn: usersService.getAll });

  return query.data;
};
