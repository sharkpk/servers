const generate_otp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
};

const email_template_with_otp = (otp) => {
  if (!otp) {
    otp = generate_otp();
  }

  return `<p>Your OTP is ${otp}</p>`;
};

module.exports = { generate_otp, email_template_with_otp };
