import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// api
import blogsService from "../services/blogs";

export const useGetBlogs = () => {
  const query = useQuery({ queryKey: ["blogs"], queryFn: blogsService.getAll });

  return query.data;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blogsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  return (newBlog) => mutation.mutate(newBlog);
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blogsService.deleteOne,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  return (id) => mutation.mutate(id);
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: blogsService.like,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  return (id) => mutation.mutate(id);
};
