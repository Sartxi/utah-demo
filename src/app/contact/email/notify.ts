const notify = ({ name, service, phone, email, message, reachtime }) => {
  return `
    <div class="body">
      <h1>Woohoo, Inquiry Recieved!</h1>
      <h3>On ${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}</h3>
      <br />
      <table>
        <tbody>
          <tr><td><label>Name:</label> <strong>${name}</strong></td></tr>
          <tr><td><label>Email:</label> <strong>${email}</strong></td></tr>
          <tr><td><label>Phone:</label> <strong>${phone}</strong></td></tr>
          <tr><td><label>Best time to reach:</label> <strong>${reachtime}</strong></td></tr>
          <tr><td><label>Service:</label> <strong>${service}</strong></td></tr>
          <tr><td><label>Message:</label> <p>${message}</p></td></tr>
        </tbody>
      </table>
    </div>
  `;
};

export default notify;
