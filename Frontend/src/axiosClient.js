// Import the axios library - a tool for making HTTP requests (like fetching data from servers)
import axios from "axios";

// Create a customized version of axios with default settings
const axiosClient = axios.create({
    // Set the base URL that will be used for all requests
    // This means every request will start with "http://127.0.0.1:8000/api"
    baseURL: "http://127.0.0.1:8000/api",
});

// Add a request interceptor - this runs BEFORE each request is sent
axiosClient.interceptors.request.use((config) => {
    // Get the access token from browser's local storage
    // This token is used to prove you're logged in
    const token = localStorage.getItem("ACCESS_TOKEN");

    // Add the token to the request headers as "Authorization: Bearer [token]"
    // This tells the server who is making the request
    config.headers.Authorization = `Bearer ${token}`;

    // Return the modified config so the request can continue
    return config;
});

// Add a response interceptor - this runs AFTER we get a response
axiosClient.interceptors.response.use(
    // This function handles SUCCESSFUL responses
    (response) => {
        // Simply return the successful response as-is
        return response;
    },
    // This function handles ERROR responses
    (error) => {
        try {
            // Extract the response from the error object
            const { response } = error;

            // If the error is 401 (Unauthorized) - meaning the token is invalid/expired
            if (response.status === 401) {
                // Remove the invalid token from local storage
                // This effectively logs the user out
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (err) {
            // If anything goes wrong in the try block, log it to console
            console.error(err);
        }

        // Re-throw the error so the calling code can handle it
        throw error;
    }
);

// Export the customized axios client so other files can use it
export default axiosClient;