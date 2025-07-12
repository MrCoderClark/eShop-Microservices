import axiosInstance from '../utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// Fetch user data from API
const fetchUser = async () => {
  const response = await axiosInstance.get('/api/logged-in-user');
  return response.data;
};

const useUser = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  // Extract the actual user object from the API response
  return { user: data?.user, isLoading, isError, refetch };
};

export default useUser;
