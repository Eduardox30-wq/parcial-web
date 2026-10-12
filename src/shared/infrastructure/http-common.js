/**
 * @summary Common Axios configuration using environment base URL.
 * @author Estudiante
 */
import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default http;