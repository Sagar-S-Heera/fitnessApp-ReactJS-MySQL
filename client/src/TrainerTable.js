const TrainerTable = ({ trainer }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialization</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {trainer.map((val) => (
          <tr key={val.TrainerID}>
            <td>{val.Name}</td>
            <td>{val.Specialization}</td>
            <td>{val.Phone}</td>
            <td>{val.Email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TrainerTable;
