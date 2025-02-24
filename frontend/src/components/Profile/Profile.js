import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Computer Science",
    year: "3rd Year",
    profilePic: "", // Initially empty (no photo)
  });

  const placeholderImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Default image

  // Function to handle profile picture change
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a preview URL
      setUser((prevUser) => ({
        ...prevUser,
        profilePic: imageUrl, // Update profile picture
      }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Left Section: Profile Photo */}
        <div className="profile-photo-container">
          <img
            src={user.profilePic || placeholderImage}
            alt="Profile"
            className="profile-pic"
          />
          {/* Edit Photo Button BELOW the image */}
          <label htmlFor="photoUpload" className="edit-photo-btn">
            Edit Photo
          </label>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }} // Hide input field
          />
        </div>

        {/* Right Section: User Details */}
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Year:</strong> {user.year}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
