
import  '../style/boardinghouses.css';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axiosClient from "../axiosClient.js";

export default function BoardingHouse() {
     const navigate = useNavigate();
     const [boardingHouses, setBoardingHouses] = useState([])
     const [loading, setLoading] = useState(false);


     //fetch all boarding houses from the backend
     useEffect(() => {
          getBH();
     }, []);


     const handleAddBoardingList = () => {
          navigate("/roomlist");
     };

     const onDeleteBH = bh => {
          if (!window.confirm("Are you sure you want to delete this boarding house?")) {
               return
          }

          axiosClient.delete(`/boardinghouse/${bh.id}`)
               .then(() => {
                    getBH();
               })

     }

     const getBH = () =>{
          setLoading(true)

          axiosClient.get('/boardinghouse')
               .then(({data}) => {
                    setLoading(false)
                    setBoardingHouses(data); //store the result
               })
               .catch(() => {
                    console.error("failed to load boarding houses")
                    setLoading(false)
               })
     }

     return (
          <>
               <div className="card-container">
                    <div className="info-card">

                         <div className="card-header">
                              <h2 className="card-title">Boarding House 1</h2>
                              <button onClick={handleAddBoardingList} className="btn-add">Open</button>
                         </div>

                         <div className="card-header">
                              <span className="header-text">Location</span>
                              <span className="database-tag">Tagoloan, Mis.or</span>
                         </div>

                         <div className="card-details">
                              <div className="detail-row">
                                   <span className="label">Rooms</span>
                                   <span className="value">15</span>
                              </div>
                              <div className="detail-row">
                                   <span className="label">Occupied</span>
                                   <span className="link">10</span>
                              </div>
                              <div className="detail-row">
                                   <span className="label">Available</span>
                                   <span className="prepaid">5</span>
                              </div>
                         </div>
                    </div>

                    <div className="info-card">

                         <div className="card-header">
                              <h2 className="card-title">Boarding House 1</h2>
                              <button className="btn-add">Open</button>
                         </div>

                         <div className="card-header">
                              <span className="header-text">Location</span>
                              <span className="database-tag">Tagoloan, Mis.or</span>
                         </div>

                         <div className="card-details">
                              <div className="detail-row">
                                   <span className="label">Rooms</span>
                                   <span className="value">15</span>
                              </div>
                              <div className="detail-row">
                                   <span className="label">Occupied</span>
                                   <span className="link">10</span>
                              </div>
                              <div className="detail-row">
                                   <span className="label">Available</span>
                                   <span className="prepaid">5</span>
                              </div>
                         </div>
                    </div>

                    <div className="info-card">

                         <div className="card-header">
                              <h2 className="card-title">Boarding House 1</h2>
                              <button className="btn-add">Open</button>
                         </div>

                         <div className="card-header">
                              <span className="header-text">Location</span>
                              <span className="database-tag">Tagoloan, Mis.or</span>
                         </div>

                         <div className="card-details">
                              <div className="detail-row">
                                   <span className="label">Rooms</span>
                                   <span className="value">15</span>
                              </div>
                              <div className="detail-row">
                                   <span className="label">Occupied</span>
                                   <span className="link">10</span>
                              </div>
                              <div className="detail-row">
                                   <span className="label">Available</span>
                                   <span className="prepaid">5</span>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
}