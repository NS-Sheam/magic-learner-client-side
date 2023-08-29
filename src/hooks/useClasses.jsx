import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { allClass, createClass, deleteClass, enrollUserInClass } from '../utilities/classOperation';

const useClasses = () => {
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
            const response = await deleteClass(id);
            return response.data;
        }
    );

    const enrollCallMutation = useMutation(
        async (userEmail, classId) => {
            const response = await enrollUserInClass(userEmail, classId)
            if (response.modifiedCount > 0) {
                queryClient.invalidateQueries(['modifiedClass']);
            }

        }
    )

    return {
        classes,
        classLoading,
        fetchError,
        refetch,
        createClass: createClassMutation.mutateAsync,
        deleteClass: deleteClassMutation.mutateAsync,
        enrolledClass: enrollCallMutation.mutateAsync
    };
};

export default useClasses;

