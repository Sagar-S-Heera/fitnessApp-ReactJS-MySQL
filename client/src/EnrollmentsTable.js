const EnrollmentTable = ({ entry }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Member ID</th>
          <th>Name</th>
          <th>ClassName</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
        {entry.map((val) => (
          <tr key={val.MemberID}>
            <td>{val.MemberID}</td>
            <td>{val.Name}</td>
            <td>{val.ClassName}</td>
            <td>{val.Active}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default EnrollmentTable;
