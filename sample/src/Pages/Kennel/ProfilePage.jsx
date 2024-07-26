import React from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
    const kennelOwnerData = useSelector((state) => state.kennel.kennelOwnerData);
     
    
  return (
    <div className="profile-container">
      <h2>Kennel Owner Profile</h2>
      {kennelOwnerData ? (
        <div className="profile-details">
          <p><strong>Email:</strong> {kennelOwnerData.email}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  )
}

export default ProfilePage
