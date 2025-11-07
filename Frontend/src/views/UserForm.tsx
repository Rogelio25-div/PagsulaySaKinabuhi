// Import necessary React and router hooks
import { useNavigate, useParams } from "react-router-dom"; // For navigation and reading URL parameters
import { useEffect, useState } from "react"; // For managing component state and side effects
import axiosClient from "../axiosClient.js"; // For sending HTTP requests to the backend

// Define the main UserForm component
export default function UserForm() {

     // Get the "id" value from the current URL (used for editing a specific user)
     const { id } = useParams();

     // Hook that allows redirecting to another route after saving
     const navigate = useNavigate();

     // State to store user data (used in the form)
     const [user, setUsers] = useState({
          id: null,        // Default ID is null (means new user)
          name: '',        // Empty name by default
          email: '',       // Empty email by default
          password: '',    // Empty password by default
     });

     // State to track loading status while fetching data
     const [loading, setLoading] = useState(false);

     // State to store validation errors from backend
     const [errors, setErrors] = useState(null);

     // If there's an ID in the URL, we are editing a user
     if (id) {
          useEffect(() => {
               setLoading(true); // Start loading
               axiosClient.get(`/users/${id}`) // Send GET request to fetch user data
                    .then(({ data }) => {
                         setLoading(false);   // Stop loading when data arrives
                         setUsers(data);      // Set form fields with the fetched user data
                    })
                    .catch(() => {
                         setLoading(false);   // Stop loading if request fails
                    });
          }, []); // Empty dependency means this runs only once on mount
     }

     // Function that runs when the form is submitted
     const onSubmit = ev => {
          ev.preventDefault(); // Prevent default form reload

          // Check if the user already exists (edit mode)
          if (user.id) {
               axiosClient.put(`/users/${user.id}`, user) // Send PUT request to update user
                    .then(() => {
                         navigate('/users'); // Go back to the user list after saving
                    })
                    .catch(err => {
                         const response = err.response;
                         if (response && response.status == 422) {
                              setErrors(response.data.errors); // Save validation errors
                         }
                    });
          } else {
               // If there's no user ID, create a new user
               axiosClient.post('/users', user) // Send POST request to create new user
                    .then(() => {
                         navigate('/users'); // Go back to user list after creation
                    })
                    .catch(err => {
                         const response = err.response;
                         if (response && response.status === 422) {
                              setErrors(response.data.errors); // Save validation errors
                         }
                    });
          }
     };

     // Render the form layout
     return (
          <>
               {/* Show "Update User" title if editing, otherwise show "New User" */}
               {user.id && <h1>Update User: {user.name}</h1>}
               {!user.id && <h1>New User</h1>}

               {/* Main container with animation */}
               <div className="card animated fadeInDown">
                    {/* Show loading message when data is being fetched */}
                    {loading && (
                         <div className="text-center">
                              Loading...
                         </div>
                    )}

                    {/* Display backend validation errors */}
                    {errors &&
                        <div className="alert">
                             {Object.keys(errors).map(key => (
                                  <p key={key}>{errors[key][0]}</p> // Show each error message
                             ))}
                        </div>
                    }

                    {/* Show the form only when not loading */}
                    {!loading && (
                         <form onSubmit={onSubmit}> {/* Handle form submission */}
                              {/* Input field for name */}
                              <input
                                   value={user.name} // Bind value to state
                                   onChange={ev => setUsers({ ...user, name: ev.target.value })} // Update name on change
                                   placeholder="Name" // Placeholder text
                              />

                              {/* Input field for email */}
                              <input
                                   value={user.email} // Bind value to state
                                   onChange={ev => setUsers({ ...user, email: ev.target.value })} // Update email on change
                                   placeholder="Email" // Placeholder text
                              />

                              {/* Input field for password */}
                              <input
                                   type="password" // Hide password text
                                   onChange={ev => setUsers({ ...user, password: ev.target.value })} // Update password on change
                                   placeholder="Password" // Placeholder text
                              />

                              {/* Submit button */}
                              <button className="btn">Save</button>
                         </form>
                    )}
               </div>
          </>
     );
}
