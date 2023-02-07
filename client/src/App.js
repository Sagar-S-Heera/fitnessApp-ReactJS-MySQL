import "./App.css";
import React, { useState, useEffect } from "react";
import Axions from "axios";
import UpdateMember from "./UpdateMember";
import TrainerTable from "./TrainerTable";
import PaymentTable from "./PaymentTable";
import EnrollmentTable from "./EnrollmentsTable";
import InsertMember from "./InsertMember";

function App() {
  const [memberList, setMemberList] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const [showTrainers, setShowTrainers] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);

  useEffect(() => {
    Axions.get("http://localhost:3001/api/getAllMembers").then((response) => {
      setMemberList(response.data);
    });
  }, []);

  useEffect(() => {
    Axions.get("http://localhost:3001/api/getAllTrainers").then((response) => {
      setTrainers(response.data);
    });
  }, []);

  useEffect(() => {
    Axions.get("http://localhost:3001/api/getPayments").then((response) => {
      setPayments(response.data);
    });
  }, []);
  useEffect(() => {
    Axions.get("http://localhost:3001/api/getEnrollments").then((response) => {
      setEnrollments(response.data);
    });
  }, []);

  const [selectedMember, setSelectedMember] = useState({});

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const handleUpdate = (member) => {
    setShowUpdateForm(!showInsertForm);
    setSelectedMember(member);
  };

  const [showInsertForm, setShowInsertForm] = useState(false);

  // toggle showInsertForm state when "New Member" button is clicked
  const handleInsertClick = () => {
    setShowInsertForm(!showInsertForm);
  };
  // code to delete a member goes here
  const handleDelete = (memid) => {
    Axions.delete(`http://localhost:3001/api/deleteMemberID/${memid}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ReactJS & MySQL Application</h1>
      </header>
      <div className="btn-grp">
        <button>Members</button>
        <button onClick={() => setShowTrainers(!showTrainers)}>Trainers</button>
        <button onClick={() => setShowPayments(!showPayments)}>Payments</button>
        <button onClick={() => setShowEnrollments(!showEnrollments)}>
          Enrollments
        </button>
      </div>
      <div className="tables">
        <h2>Members</h2>
        <button id="insert-mem-btn" onClick={handleInsertClick}>
          New Member
        </button>
        {showInsertForm && <InsertMember />}
        {showUpdateForm && (
          <UpdateMember
            value={selectedMember}
            handleUpdate={handleUpdate}
            memberID={selectedMember.MemberID}
          />
        )}
        <table>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          {memberList.map((value) => {
            return (
              <tbody>
                <tr key={value.MemberID}>
                  <td>{value.Name}</td>
                  <td>{value.Address}</td>
                  <td>{value.Phone}</td>
                  <td>{value.Email}</td>
                  <td>
                    <div id="action-btn">
                      <button onClick={() => handleUpdate(value)}>
                        Update
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete the member?"
                            )
                          ) {
                            handleDelete(value.MemberID);
                            window.location.reload(true);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        {showTrainers && (
          <div>
            <h2>Trainers</h2>

            <TrainerTable trainer={trainers} />
          </div>
        )}
        {showPayments && (
          <div>
            <h2>Payments</h2>
            <PaymentTable payments={payments} />
          </div>
        )}
        {showEnrollments && (
          <div>
            <h2>Enrollments</h2>
            <EnrollmentTable entry={enrollments} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
