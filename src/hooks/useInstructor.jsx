import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
const useInstructor = () => {
    const { user, loading } = useAuth();

    const { refetch, data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        enabled: !loading,
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:5000/instructors');
                return response.data;
            } catch (error) {
                console.error('Error fetching instructors:', error);
                throw error;
            }
        },
    })

    return [instructors, refetch]

}
export default useInstructor;

// queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     return res.json();
        // },