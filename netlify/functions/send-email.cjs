const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    console.log('eventbody=============================>', data);

    const emailUser = process.env.EMAIL_USER || 'ambatimanoj2469@gmail.com'

    const transporter = nodemailer.createTransport({
        service: "gmail", // or use another SMTP provider
        auth: {
            user: emailUser,
            pass: process.env.EMAIL_PASS || 'bdscuuaokvacryhi',
        },
    });

    const mailOptions = {
        from: `"Website Inquiry" <${emailUser}>`,
        to: "a.manoj@voltuswave.com", // your email to receive inquiries
        subject: "New Form Submission",
        html: `
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.toString() }),
        };
    }
};
