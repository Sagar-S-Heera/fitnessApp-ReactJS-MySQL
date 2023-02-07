import React, { useState } from "react";
import axios from "axios";
import "./UpdateMember.css";

const UpdateMember = ({ member, handleUpdate, memberID }) => {
  // state to hold the updated member data

  const [updatedMember, setUpdatedMember] = useState({
    MemberID: memberID,
    Name: member?.Name || "",
    Address: member?.Address || "",
    Phone: member?.Phone || "",
    Email: member?.Email || "",
  });

  // function to handle form inputs change
  const handleChange = (event) => {
    setUpdatedMember({
      ...updatedMember,
      [event.target.name]: event.target.value,
    });
  };

  // function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Update Successful!");
    window.location.reload(true);
    axios
      .put("http://localhost:3001/api/updateMemberID", {
        MemberID: updatedMember.MemberID,
        Name: updatedMember.Name,
        Address: updatedMember.Address,
        Phone: updatedMember.Phone,
        Email: updatedMember.Email,
      })
      .then(() => {
        handleUpdate(updatedMember, member.MemberID);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form className="update-from" onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="Name"
              value={updatedMember.Name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="Address"
              value={updatedMember.Address}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="text"
              name="Phone"
              value={updatedMember.Phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={updatedMember.Email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMember;
