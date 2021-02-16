import { User } from '../models/UserModel';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const emailAddress = 'hello@clippy.gg';

/**
 * Send the verification email to a user.
 * @param {User} user The user to send the email to.
 */
async function sendVerificationEmail(user: User) {
    try {
        const html = `<h1>Email Verification</h1>
        Thank you for registering on <a href="https://clippy.gg">clippy</a>, <strong>${user.username}</strong>.<br>
        Please confirm your email with the link below to complete the registration process.<br><br>
        ${process.env.BACKEND_URL}/auth/verify?key=${user.emailVerificationKey}`;

        const email = {
            from: emailAddress,
            to: user.email,
            subject: 'Clippy: Verify your Email',
            html,
        };

        await sgMail.send(email);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Send a password reset to someone.
 * @param {User} user The user to send a reset email to.
 * @param {string} key The password reset key.
 */
async function sendPasswordReset(user: User, key: string) {
    try {
        const html = `<h1>Password Reset</h1>
        Hello <strong>${user.username}</strong>, you have requested to reset your password, if you did not request this change, please contact an Administrator.<br>
        Please click on the link below to continue the reset process, this link will expire in <strong>10 minutes</strong>.<br>
        <a href="${process.env.FRONTEND_URL}/resetpassword?key=${key}">Reset your password</a>`;

        const email = {
            from: emailAddress,
            to: user.email,
            subject: 'Clippy: Password Reset',
            html,
        };
    
        await sgMail.send(email);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Send a archive of all of the user's files.
 * @param {string} user The user to send the files to.
 * @param {any} archive The archive.
 */
async function sendFileArchive(user: User, archive: any) {
    try {
        const html = `<h1>File Archive</h1>
        Hello <strong>${user.username}</strong>, you have requested to recieve an archive of all of your files, if you did not request this, please contact an Administrator.`;

        const email = {
            from: emailAddress,
            to: user.email,
            subject: 'Clippy: File Archive',
            html,
            attachments: [
                {
                    filename: 'archive.zip',
                    content: archive,
                    type: 'application/zip',
                },
            ],
        };

        await sgMail.send(email);
    } catch (err) {
        throw new Error(err);
    }
}

export {
    sendVerificationEmail,
    sendPasswordReset,
    sendFileArchive
};

