import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { allClass, createClass, deleteClass } from '../utilities/classOperation';

const useClasses = (createFunction, deleteFunction) => {
    const queryClient = useQueryClient();

    // Fetch All Classes
    const fetchClasses = async () => {
        const response = await allClass();
        return response.data;
    };

    const { data: classes = [], isLoading: classLoading, error: fetchError, refetch } = useQuery(['classes'], fetchClasses);

    // Create Class
    const createClassMutation = useMutation(
        async (classDetails, email) => {
            const response = await createClass(classDetails, email);

            if (response.insertedId) {
                queryClient.invalidateQueries(['allClasses']);
            }
        }
    );

    // Delete Class
    const deleteClassMutation = useMutation(
        async (id) => {
            console.log("tanstack");
            const response = await deleteClass(id);
            return response.data;
        }
    );

    return {
        classes,
        classLoading,
        fetchError,
        refetch,
        createClass: createClassMutation.mutateAsync,
        deleteClass: deleteClassMutation.mutateAsync,
    };
};

export default useClasses;

