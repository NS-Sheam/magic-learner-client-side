import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';
const useInstructor = () => {
    const { user, loading } = useAuth();

    const { refetch, data:instructors = [] } = useQuery({
        queryKey: ['instructors'],
        enabled: !loading,
        queryFn: async () => {
                const res = await fetch('http://localhost:5000/users/instructors');
                return res.json();
          
        },
    })

    return [instructors];

}
export default useInstructor;

// queryFn: async () => {
        //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
        //         authorization: `bearer ${token}`
        //     }})
        //     return res.json();
        // },