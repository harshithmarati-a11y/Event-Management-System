import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";
import "../styles/Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile(user._id);

      setProfile({
        name: data.name,
        email: data.email,
      });

      if (data.profileImage) {
        setPreview(
          `https://event-management-system-p1cp.onrender.com${data.profileImage}`
        );
      }

    } catch (error) {
      alert("Unable to load profile");
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", profile.name);
      formData.append("email", profile.email);

      if (image) {
        formData.append("image", image);
      }

      await updateProfile(user._id, formData);

      alert("Profile Updated Successfully");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Update Failed"
      );
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />

      <div className="profile-content">

        <h1>My Profile</h1>

        <form
          className="profile-card"
          onSubmit={handleSubmit}
        >

          {preview && (
            <img
              src={preview}
              alt="Profile"
              className="profile-image"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <button className="save-btn">
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default Profile;