import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';
const useInstructor = () => {
    const { user, loading } = useAuth();
    const [instructors, setInstructors] = useState([]);

    // const { refetch, data: instructors = [] } = useQuery({
    //     queryKey: ['instructors'],
    //     enabled: !loading,
    //     queryFn: async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/instructors');
    //             return response.data;
    //         } catch (error) {
    //             console.error('Error fetching instructors:', error);
    //             throw error;
    //         }
    //     },
    // })
    useEffect(()=>{
        fetch('http://localhost:5000/instructors')
        .then(res => res.json())
        .then(data => setInstructors(data))
    }, [])

    return [instructors]

}
export default useInstructor;

// queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     return res.json();
        // },