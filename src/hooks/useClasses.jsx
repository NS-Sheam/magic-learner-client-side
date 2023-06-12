import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
const useClasses = () => {
    const { user, loading } = useAuth();

    const { refetch, data: classes = [], loading: classLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async() => {
            const res = await fetch('https://summer-camp-server-side-alpha.vercel.app/classes');
            return res.json();
        }
    })

    return [classes, classLoading, refetch]

}
export default useClasses;

// queryFn: async () => {
        //     const res = await fetch(`https://summer-camp-server-side-alpha.vercel.app/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     return res.json();
        // },