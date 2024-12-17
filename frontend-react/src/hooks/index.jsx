import queryClient from "../services/query-client"

export const useLazyQuery = ({fn, key, name}) => {
    return (recipeName) => queryClient.ensureQueryData({
      queryKey: [ name ||'LazyQuery', key],
      queryFn: () => fn(recipeName),
    });
  };
  