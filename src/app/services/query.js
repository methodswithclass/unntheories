import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetails } from "./auth";
import {
  callDummy,
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  listUsers,
} from "./api";

export const useCallDummy = (id) => {
  return useQuery({
    queryKey: ["callDummy", id],
    queryFn: callDummy,
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: getUserDetails,
  });
};

export const useListUsers = () => {
  return useQuery({
    queryKey: ["listUsers"],
    queryFn: listUsers,
  });
};

export const useListBlogs = (id, input) => {
  return useQuery({
    queryKey: ["listBlogs", id, input],
    queryFn: async () => {
      return listBlogs(input);
    },
  });
};

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: (input) => {
      return createBlog(input);
    },
  });
};

export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: (input) => {
      updateBlog(input);
    },
    onSuccess: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["listBlogs"] });
    },
  });
};

export const useGetBlog = (input) => {
  return useQuery({
    queryKey: ["getBlog"],
    queryFn: async () => {
      return getBlog(input);
    },
  });
};
