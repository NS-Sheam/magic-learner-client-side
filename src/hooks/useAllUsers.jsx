import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';
const useAllUsers = () => {

    const { refetch, data: allUsers = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
                const res = await fetch('https://summer-camp-server-side-alpha.vercel.app/users');
                return res.json();
          
        },
    })

    return [allUsers, refetch];

}
export default useAllUsers;