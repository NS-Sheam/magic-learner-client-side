import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useAdmin = () => {
  const { user, loading } = useAuth();

  const { data: userRole, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/admin/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [userRole, isAdminLoading];
};

export default useAdmin;
