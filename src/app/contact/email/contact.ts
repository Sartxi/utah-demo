const contact = ({ name, service, contact }) => {
  return `
    <div class="body">
      <h1>Thank you for your interest in Vic's Haul and Pickup Services!</h1>
      <h2>Dear ${name},</h2>
      <p>
        Thank you for your recent inquiry about
        <strong>${service}</strong>. We appreciate your interest and the
        opportunity to provide you with a free estimate.
      </p>
      <p>
        We will be in contact as soon as possible. We look forward to the
        possibility of working with you and helping you achieve your goals.
      </p>
      <p>Warm regards,</p>
      <h3 class="capitalize">${contact}</h3>
    </div>
  `;
};

export default contact;
