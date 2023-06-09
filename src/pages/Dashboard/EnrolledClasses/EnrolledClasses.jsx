import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

const EnrolledClasses = () => {
    const {user, loading} = useAuth();
    const [enrollClass, setEnrollClass] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })
    }, [])
    return (
        <div>
            <SectionTitle heading={"Enrolled Classes"}
                description={"All your enrolled classes are Here"} />
        </div>
    );
};

export default EnrolledClasses;