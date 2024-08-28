import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useRequest(url, key) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn: () => getFetch(),
    select: (data)=> data.data.data
  });

 async function getFetch() {
    return axios.get(url);
  }

  return { data , isLoading , isError};

}