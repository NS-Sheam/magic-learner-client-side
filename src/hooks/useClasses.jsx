import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
const useClasses = () => {
    const { user, loading } = useAuth();

    const { refetch, data: classes = [] } = useQuery({
        queryKey: ['instructors'],
        enabled: !loading,
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:5000/classes');
                return response.data;
            } catch (error) {
                console.error('Error fetching instructors:', error);
                throw error;
            }
        },
    })

    return [classes, refetch]

}
export default useClasses;

// queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     return res.json();
        // },