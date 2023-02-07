import React, { useState, useEffect } from "react";
import Axions from "axios";
import "./InsertMember.css";

const InsertMember = ({ handleInsert }) => {
  // state to hold the new member data
  const [newMember, setNewMember] = useState({
    MemberID: "",
    Name: "",
    Address: "",
    Phone: "",
    Email: "",
  });

  useEffect(() => {
    // fetch the latest MemberID
    Axions.get("http://localhost:3001/api/getLatestMemberID")
      .then((response) => {
        // increment the latest MemberID by 1
        setNewMember({ ...newMember, MemberID: response.data[0].MemberID + 1 });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // function to handle form inputs change
  const handleChange = (event) => {
    setNewMember({
      ...newMember,
      [event.target.name]: event.target.value,
    });
  };
  // function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Insert Successful!");
    window.location.reload(true);
    Axions.post("http://localhost:3001/api/addMember", {
      MemberID: newMember.MemberID,
      Name: newMember.Name,
      Address: newMember.Address,
      Phone: newMember.Phone,
      Email: newMember.Email,
    })
      .then(() => {
        handleInsert(newMember);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="insert-member-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="Name"
              value={newMember.Name}
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
              value={newMember.Address}
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
              value={newMember.Phone}
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
              value={newMember.Email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Insert</button>
      </form>
    </div>
  );
};

export default InsertMember;
