const contact = ({ name, service, contact }) => {
  return `
    <div class="body">
      <h1>Thank you for your interest in Utah Demolition Services!</h1>
      <h2>Dear ${name},</h2>
      <p>
        Thank you for your recent inquiry about
        <strong>${service}</strong>. We appreciate your interest and the
        opportunity to provide you with a free estimate.
      </p>
      <p>
        At Utah Dust Free Demolition, we pride ourselves on delivering
        exceptional work and solutions that meet the diverse needs of our
        customers. Our team of experts are happy to discuss your specific
        requirements and tailor a solution that best suits your needs.
      </p>
      <p>
        We will be in contact as soon as possible. We look forward to the
        possibility of working with you and helping you achieve your goals.
      </p>
      <p>Warm regards,</p>
      <h3>${contact}</h3>
      <i>your demolition specialist</i>
    </div>
  `;
};

export default contact;
