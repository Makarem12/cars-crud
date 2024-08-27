import { useContext } from 'react';
import { AuthContext } from '../context/Auth'; // Ensure the path is correct
import useSWR from 'swr';

const apiUrl = 'http://127.0.0.1:8000/api/v1/things_app/';

export default function useResource() {
    const { tokens } = useContext(AuthContext);

    // Use tokens as a key to re-fetch data when tokens change
    const { data, error, mutate } = useSWR(tokens ? apiUrl : null, fetchResource);

    async function fetchResource(url) {
        if (!tokens) return;
        try {
            const res = await fetch(url, config());
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }
            return res.json();
        } catch (err) {
            console.error('Fetch resource error:', err);
            return null; // Return null if an error occurs
        }
    }

    function config() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access}`,
            },
        };
    }

    async function deleteResource(id) {
        try {
            const url = `${apiUrl}${id}/`;
            const res = await fetch(url, { ...config(), method: 'DELETE' });
            if (!res.ok) {
                throw new Error(`Delete request failed: ${res.statusText}`);
            }
            mutate(); // Refetch data after deletion
        } catch (err) {
            console.error('Delete resource error:', err);
        }
    }

    async function createResource(carInfo) {
        if (!tokens) return;
        try {
            const res = await fetch(apiUrl, { ...config(), method: 'POST', body: JSON.stringify(carInfo) });
            if (!res.ok) {
                throw new Error(`Create request failed: ${res.statusText}`);
            }
            mutate(); // Refetch data after creation
        } catch (err) {
            console.error('Create resource error:', err);
        }
    }

    async function updateResource(id, carInfo) {
        if (!tokens) return;
        try {
            const url = `${apiUrl}${id}/`; // Check if URL is correct
            console.log("Updating resource at:", url);
            const res = await fetch(url, { ...config(), method: 'PUT', body: JSON.stringify(carInfo) });
            if (!res.ok) {
                throw new Error(`Update request failed: ${res.statusText}`);
            }
            mutate(); // Refetch data after update
        } catch (err) {
            console.error('Update resource error:', err);
        }
    }

    return {
        resource: data,
        deleteFun: deleteResource,
        addCar: createResource,
        updateCar: updateResource,
        loading: !tokens || !data && !error,
        error
    };
}
