

import  '../style/roomlist.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function House1RoomListPage(){
     const navigate = useNavigate();

     const back = () => {
       navigate('/boardinghouse')
     }
     const view = () => {
       navigate('/roomdetails')
     }

     const [rooms, setRooms] = useState([
          {
               id: 101,
               number: '101',
               status: 'occupied',
               tenant: 'John Doe',
               moveInDate: '2024-01-15',
               rent: 500,
               dueDate: 15,
               maintenance: null
          },
          {
               id: 102,
               number: '102',
               status: 'available',
               tenant: null,
               moveInDate: null,
               rent: 500,
               dueDate: 15,
               maintenance: null
          },
          {
               id: 103,
               number: '103',
               status: 'maintenance',
               tenant: null,
               moveInDate: null,
               rent: 500,
               dueDate: 15,
               maintenance: {
                    issue: 'Plumbing repair',
                    startDate: '2024-01-18',
                    estimatedReady: '2024-01-21'
               }
          },
          {
               id: 104,
               number: '104',
               status: 'occupied',
               tenant: 'Sarah Wilson',
               moveInDate: '2024-01-10',
               rent: 550,
               dueDate: 15,
               maintenance: null
          }
     ]);

     const [filter, setFilter] = useState('all');

     const filteredRooms = rooms.filter(room => {
          if (filter === 'all') return true;
          return room.status === filter;
     });

     const getStatusIcon = (status) => {
          switch (status) {
               case 'occupied': return '✅';
               case 'available': return '🔓';
               case 'maintenance': return '🔧';
               default: return '⚪';
          }
     };

     const getStatusText = (status) => {
          switch (status) {
               case 'occupied': return 'Occupied';
               case 'available': return 'Available';
               case 'maintenance': return 'Maintenance';
               default: return 'Unknown';
          }
     };

     const getStatusClass = (status) => {
          switch (status) {
               case 'occupied': return 'status-occupied';
               case 'available': return 'status-available';
               case 'maintenance': return 'status-maintenance';
               default: return 'status-unknown';
          }
     };

     const roomStats = {
          total: rooms.length,
          occupied: rooms.filter(room => room.status === 'occupied').length,
          available: rooms.filter(room => room.status === 'available').length,
          maintenance: rooms.filter(room => room.status === 'maintenance').length
     };

     return (
          <div className="room-list-page">
               {/* Header */}
               <div className="room-list-header">
                    <div className="header-left">
                         <button onClick={back} className="btn-back">Back</button>
                         {/*<h1>Boarding House 1 › Rooms</h1>*/}
                    </div>
                    <div className="header-right">
                         <button className="btn-add">+ Add Room</button>
                    </div>
               </div>

               {/* Room Overview */}
               <div className="room-overview">
                    <div className="stats-grid">
                         <div className="stat-card">
                              <span className="stat-number">{roomStats.total}</span>
                              <span className="stat-label">Total Rooms</span>
                         </div>
                         <div className="stat-card">
                              <span className="stat-number">{roomStats.occupied}</span>
                              <span className="stat-label">Occupied</span>
                         </div>
                         <div className="stat-card">
                              <span className="stat-number">{roomStats.available}</span>
                              <span className="stat-label">Available</span>
                         </div>
                         <div className="stat-card">
                              <span className="stat-number">{roomStats.maintenance}</span>
                              <span className="stat-label">Maintenance</span>
                         </div>
                    </div>

                    {/* Filter Section */}
                    <div className="filter-section">
                         <div className="filter-buttons">
                              <button
                                   className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                   onClick={() => setFilter('all')}
                              >
                                   All Rooms
                              </button>
                              <button
                                   className={`filter-btn ${filter === 'occupied' ? 'active' : ''}`}
                                   onClick={() => setFilter('occupied')}
                              >
                                   Occupied
                              </button>
                              <button
                                   className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
                                   onClick={() => setFilter('available')}
                              >
                                   Available
                              </button>
                              <button
                                   className={`filter-btn ${filter === 'maintenance' ? 'active' : ''}`}
                                   onClick={() => setFilter('maintenance')}
                              >
                                   Maintenance
                              </button>
                         </div>
                    </div>

                    {/* Rooms List */}
               </div>


               <div className="rooms-container">
                    {filteredRooms.map(room => (
                         <div key={room.id} className="room-card">
                              <div className="room-header">
                                   <h3 className="room-number">Room {room.number}</h3>
                                   <div className="room-actions">
                                        <button className="btn-edit">Edit</button>
                                        <button onClick={view} className="btn-view">view</button>
                                        <button className="more-btn">⋮</button>
                                   </div>
                              </div>

                              <div className="room-details">
                                   <div className={`status-badge ${getStatusClass(room.status)}`}>
                                        {getStatusIcon(room.status)} {getStatusText(room.status)}
                                   </div>

                                   {room.status === 'occupied' && room.tenant && (
                                        <div className="tenant-info">
                                             <p><strong>Tenant:</strong> {room.tenant}</p>
                                             <p><strong>Since:</strong> {new Date(room.moveInDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                             <p><strong>Rent:</strong> ${room.rent}/month | <strong>Due:</strong> {room.dueDate}th</p>
                                        </div>
                                   )}

                                   {room.status === 'available' && (
                                        <div className="available-info">
                                             <p>Ready for new tenant</p>
                                             <p><strong>Rent:</strong> ${room.rent}/month</p>
                                        </div>
                                   )}

                                   {room.status === 'maintenance' && room.maintenance && (
                                        <div className="maintenance-info">
                                             <p><strong>Issue:</strong> {room.maintenance.issue}</p>
                                             <p><strong>Since:</strong> {new Date(room.maintenance.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                             <p><strong>Estimated ready:</strong> {new Date(room.maintenance.estimatedReady).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                        </div>
                                   )}
                              </div>
                         </div>
                    ))}
               </div>

               {/* Empty State */}
               {filteredRooms.length === 0 && (
                    <div className="empty-state">
                         <div className="empty-icon">🏠</div>
                         <h3>No rooms found</h3>
                         <p>No rooms match your current filter criteria.</p>
                         <button
                              className="clear-filter-btn"
                              onClick={() => setFilter('all')}
                         >
                              Clear Filters
                         </button>
                    </div>
               )}
          </div>
     );
};