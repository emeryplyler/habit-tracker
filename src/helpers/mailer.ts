import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {
        // create hashed token; this way we can tell users apart and tell their intentions
        const hashedToken = await bcrypt.hash(userID.toString(), 10); // just generate 10-character salt to use

        if (emailType === "VERIFY") { // verify account
            // add a verifytoken to the user's data in the DB; it expires after the alotted time
            await User.findByIdAndUpdate(userID, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        } else if (emailType === "RESET") { // reset password
            // add a forgot password token to the user in DB
            await User.findByIdAndUpdate(userID, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c32c8a1ec8afba",
            pass: "883b89a501fafd"
        }
        });

        const mailOptions = {
            from: "do-not-reply@habittracker.com",
            to: email, // user's email is a parameter
            subject: emailType === "VERIFY" ? "Verify your email for HabitTracker" : "Reset your password for HabitTracker",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}. </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        console.log(mailResponse);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};
