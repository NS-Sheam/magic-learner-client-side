import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
const useClasses = () => {
    const { user, loading } = useAuth();

    const { refetch, data: classes = [], loading: classLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/classes');
            return res.json();
        }
    })

    return [classes, classLoading, refetch]

}
export default useClasses;

// queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     return res.json();
        // },