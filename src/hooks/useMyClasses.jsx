import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useMyClasses = () => {
    const { user, loading } = useAuth();

    const { refetch, data:responseData = [], loading: classLoading } = useQuery({
        queryKey: ["email"],
        enabled: !loading,
        queryFn: async () => {
          const res = await fetch(`http://localhost:5000/users?email=${user?.email}`);
          return res.json();
        },
      });

    return [responseData, classLoading, refetch]
};

export default useMyClasses;