import  '../style/form.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axiosClient.js"; // For sending HTTP requests to the backend


export default function BHform() {
     const [loading, setLoading] = useState(false);

     const [form, setForm] = useState({
          name: "",
          location: "",
          rooms: "",
     });

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setForm({ ...form, [name]: value });
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);

          axiosClient.post('/boardinghouses', form)
               .then(() => {
                    setForm({ name: "", location: "", rooms: "" });
                    alert("Boarding house added successfully!");
               })
               .catch((err) => {
                    console.error(err);
                    alert("Something went wrong. Please try again.");
               })
               .finally(() => setLoading(false));

          console.log("Boarding House Data:", form);
     };

     return (
          <div className="card animated fadeInDown">
               <h2>Add Boarding House</h2>

                    {loading && (
                         <div className="text-center">
                              Loading...
                         </div>
                    )}
                    {!loading && (
                         <form onSubmit={handleSubmit}> {/* Handle form submission */}
                              <br/>
                              <label htmlFor="name">Boarding House name</label>
                              <input
                                   name="name"
                                   value={form.name} // Bind value to state
                                   onChange={handleChange} // Update name on change
                                   placeholder="Name" // Placeholder text
                                   required
                              />

                              <label htmlFor="location">Location</label>
                              <input
                                   name="location"
                                   value={form.location}
                                   onChange={handleChange}
                                   placeholder="Location"
                                   required
                              />

                              {/* Input field for password */}
                              <label htmlFor="rooms">Number of Rooms:</label>
                              <input
                                   type="number"
                                   name="rooms"
                                   value={form.rooms}
                                   onChange={handleChange}
                                   placeholder="Number of rooms"
                                   required
                              />

                              <div className="form-actions">
                                   <button type="submit">Save</button>
                              </div>
                         </form>
                    )}
          </div>
     );
}