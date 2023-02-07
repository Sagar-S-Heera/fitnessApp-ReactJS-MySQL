const PaymentTable = ({ payments }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Member Name</th>
          <th>PaymentDate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((val) => (
          <tr key={val.PaymentID}>
            <td>{val.Name}</td>
            <td>{val.PaymentDate}</td>
            <td>{val.Amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default PaymentTable;
