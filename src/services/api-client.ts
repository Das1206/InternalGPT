/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL, TokenKey } from "../constants";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TokenKey) || null;
  if (token) config.headers.Authorization = `${token}`;

  config.headers["Content-Type"] =
    config.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";
  return config;
});

// function UpdateCache(
//   queryClient: ReturnType<typeof useQueryClient>,
//   endpoint: string,
//   role: "bot" | "user",
//   mesg: string
// ) {
//   queryClient.setQueryData([endpoint], (old: APIResponse) => {
//     return {
//       ...old,
//       history: [
//         ...(old.history || []),
//         {
//           id: (old.history?.length || 0) + 1,
//           role: role,
//           message: mesg,
//           date: new Date(),
//         },
//       ],
//     };
//   });
// }
// class APIClientw {
//   endpoint: string;

//   constructor(endpoint: string) {
//     this.endpoint = endpoint;
//   }

//   // getAll = () =>
//   //   useQuery<APIResponse, Error>({
//   //     queryKey: [this.endpoint],
//   //     queryFn: () =>
//   //       axiosInstance.get<APIResponse>(this.endpoint).then((res) => res.data),
//   //     staleTime: 24 * 60 * 60 * 1000,
//   //     initialData: {
//   //       count: 1,
//   //       history: [
//   //         {
//   //           role: "bot",
//   //           id: 1,
//   //           message: "Hello, Im SE AI assistant. How may i assist you?",
//   //           date: new Date(),
//   //         },
//   //         {
//   //           role: "user",
//   //           id: 1,
//   //           message: "Hello",
//   //           date: new Date(),
//   //         },
//   //       ],
//   //     },
//   //   });

//   // post = <T>(data: string) => {
//   //   const queryClient = useQueryClient();
//   //   return useMutation<APIPost, Error, T>({
//   //     mutationFn: (data: T) =>
//   //       axiosInstance
//   //         .post<APIPost>(this.endpoint, data)
//   //         .then((res) => res.data),
//   //     onMutate: () => {
//   //       UpdateCache(queryClient, this.endpoint, "user", data);
//   //     },
//   //     onSuccess: (data) => {
//   //       UpdateCache(queryClient, this.endpoint, "bot", data.data);
//   //     },
//   //     onError: (error) => {
//   //       UpdateCache(
//   //         queryClient,
//   //         this.endpoint,
//   //         "bot",
//   //         error.message || "Internal Server Error."
//   //       );
//   //     },
//   //   });
//   // };
// }
class APIClient {
  getAll = (endpoint: string, options?: any) =>
    axiosInstance.get(endpoint, options).then((res) => res.data);

  post = (endpoint: string, options?: any) =>
    axiosInstance.post(endpoint, options).then((res) => res.data);
  delete = (endpoint: string, data?: any, options?: any) =>
    axiosInstance
      .delete(endpoint, { ...options, data })
      .then((res) => res.data);
  postWithFile = (endpoint: string, data?: any) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append other data to the FormData object
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Make the POST request with headers
    return axiosInstance.post(endpoint, formData).then((res) => res.data);
  };
  getQuery = <T>(key: string) =>
    useQuery<T, Error>({
      queryKey: [key],
      queryFn: () => this.getAll(key),
      staleTime: 24 * 60 * 60 * 1000,
    });
}
export default APIClient;
export { axiosInstance };
