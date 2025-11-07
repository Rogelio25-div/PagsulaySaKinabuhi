import React, { useState } from 'react';
import  '../style/roomDetailsPage.css';
import {useNavigate} from "react-router-dom";

export default function RoomDetailsPage() {
     const navigate = useNavigate();

     const back = () => {
          navigate('/roomlist')
     }

     // Sample room data - in real app, this would come from database
     const [room, setRoom] = useState({
          id: 101,
          number: '101',
          status: 'occupied',
          type: 'Standard Single',
          location: '2nd Floor, Front Building',
          size: '20 sqm',
          rent: 300,
          dueDate: 15,

          // Tenant information
          tenant: {
               name: 'John Doe',
               email: 'johndoe@email.com',
               phone: '+1 (555) 123-4567',
               moveInDate: '2024-01-15',
               leaseEnd: '2025-01-14',
               emergencyContact: 'Jane Doe (Mother) - +1 (555) 987-6543'
          },

          // Room account credentials
          account: {
               username: 'room101',
               password: 'room101_default',
               status: 'active',
               lastLogin: '2024-02-02 14:30'
          },

          // Payment information
          payment: {
               balance: 0,
               lastPayment: '2024-01-10',
               nextDue: '2024-02-15',
               history: [
                    { month: 'Jan 2024', amount: 300, status: 'paid' },
                    { month: 'Dec 2023', amount: 300, status: 'paid' },
                    { month: 'Nov 2023', amount: 300, status: 'paid' }
               ]
          }
     });

     // Simple functions for buttons
     const resetPassword = () => {
          const newPassword = 'room' + room.number + '_new123';
          setRoom({
               ...room,
               account: { ...room.account, password: newPassword }
          });
          alert('Password reset to: ' + newPassword);
     };

     const sendLoginDetails = () => {
          alert('Login details sent to ' + room.tenant.email);
     };

     const recordPayment = () => {
          alert('Open payment recording form for Room ' + room.number);
     };

     return (
          <div className="room-details-page">

               {/* Header */}
               <div className="details-header">
                    <button onClick={back} className="back-button">← Back to Rooms</button>
                    <h1>Room {room.number} - Details</h1>
               </div>

               {/* Room Account */}
               <div className="info-section">
                    <h2>🔐 Room Account</h2>
                    <div className="info-grid">
                         <div className="info-item">
                              <label>Username:</label>
                              <span>{room.account.username}</span>
                         </div>
                         <div className="info-item">
                              <label>Password:</label>
                              <span>{room.account.password}</span>
                         </div>
                         <div className="info-item">
                              <label>Status:</label>
                              <span className="status active">✅ {room.account.status}</span>
                         </div>
                         <div className="info-item">
                              <label>Last Login:</label>
                              <span>{room.account.lastLogin}</span>
                         </div>
                    </div>
                    <div className="button-group">
                         <button className="action-btn" onClick={resetPassword}>
                              Reset Password
                         </button>
                         <button className="action-btn" onClick={sendLoginDetails}>
                              Send Login Details
                         </button>
                    </div>
               </div>

               {/* Room Basic Information */}
               {/*<div className="info-section">*/}
               {/*     <h2>📍 Room Information</h2>*/}
               {/*     <div className="info-grid">*/}
               {/*          <div className="info-item">*/}
               {/*               <label>Room Type:</label>*/}
               {/*               <span>{room.type}</span>*/}
               {/*          </div>*/}
               {/*          <div className="info-item">*/}
               {/*               <label>Location:</label>*/}
               {/*               <span>{room.location}</span>*/}
               {/*          </div>*/}
               {/*          <div className="info-item">*/}
               {/*               <label>Size:</label>*/}
               {/*               <span>{room.size}</span>*/}
               {/*          </div>*/}
               {/*          <div className="info-item">*/}
               {/*               <label>Monthly Rent:</label>*/}
               {/*               <span>${room.rent}</span>*/}
               {/*          </div>*/}
               {/*          <div className="info-item">*/}
               {/*               <label>Due Date:</label>*/}
               {/*               <span>{room.dueDate}th each month</span>*/}
               {/*          </div>*/}
               {/*          <div className="info-item">*/}
               {/*               <label>Status:</label>*/}
               {/*               <span className={`status ${room.status}`}>*/}
               {/*                     {room.status === 'occupied' ? '✅ Occupied' : '🔓 Available'}*/}
               {/*               </span>*/}
               {/*          </div>*/}
               {/*     </div>*/}
               {/*</div>*/}

               {/* Tenant Information */}
               <div className="info-section">
                    <h2>👤 Tenant Information</h2>
                    <div className="info-grid">
                         <div className="info-item">
                              <label>Name:</label>
                              <span>{room.tenant.name}</span>
                         </div>
                         <div className="info-item">
                              <label>Email:</label>
                              <span>{room.tenant.email}</span>
                         </div>
                         <div className="info-item">
                              <label>Phone:</label>
                              <span>{room.tenant.phone}</span>
                         </div>
                         <div className="info-item">
                              <label>Move-in Date:</label>
                              <span>{room.tenant.moveInDate}</span>
                         </div>
                         <div className="info-item">
                              <label>Lease End:</label>
                              <span>{room.tenant.leaseEnd}</span>
                         </div>
                         <div className="info-item">
                              <label>Emergency Contact:</label>
                              <span>{room.tenant.emergencyContact}</span>
                         </div>
                    </div>
               </div>

               {/* Payment Information */}
               <div className="info-section">
                    <h2>💰 Payment Information</h2>
                    <div className="info-grid">
                         <div className="info-item">
                              <label>Current Balance:</label>
                              <span>${room.payment.balance}</span>
                         </div>
                         <div className="info-item">
                              <label>Last Payment:</label>
                              <span>{room.payment.lastPayment} (${room.rent})</span>
                         </div>
                         <div className="info-item">
                              <label>Next Due Date:</label>
                              <span>{room.payment.nextDue}</span>
                         </div>
                    </div>

                    <h3>Payment History</h3>
                    <div className="payment-history">
                         {room.payment.history.map((payment, index) => (
                              <div key={index} className="payment-item">
                                   <span>{payment.month}</span>
                                   <span>${payment.amount}</span>
                                   <span className="status paid">✅ {payment.status}</span>
                              </div>
                         ))}
                    </div>

                    <div className="button-group">
                         <button className="action-btn" onClick={recordPayment}>
                              Record Payment
                         </button>
                         <button className="action-btn">
                              Send Reminder
                         </button>
                    </div>
               </div>

               {/* Quick Actions */}
               <div className="info-section">
                    <h2>⚡ Quick Actions</h2>
                    <div className="button-group full-width">
                         <button className="action-btn">Edit Room Details</button>
                         <button className="action-btn">Edit Tenant Info</button>
                         <button className="action-btn">Message Tenant</button>
                         <button className="action-btn">Add Maintenance</button>
                    </div>
               </div>

          </div>
     );
};

