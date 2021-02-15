"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFileArchive = exports.sendPasswordReset = exports.sendVerificationEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailAddress = 'dnywtf@gmail.com';
/**
 * The nodemailer transporter.
 */
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: emailAddress,
        pass: process.env.GMAIL_PASSWORD,
    },
});
exports.transporter = transporter;
/**
 * Send the verification email to a user.
 * @param {User} user The user to send the email to.
 */
async function sendVerificationEmail(user) {
    try {
        const html = `<h1>Email Verification</h1>
        Thank you for registering on <a href="https://dny.wtf">Dny</a>, <strong>${user.username}</strong>.<br>
        Please confirm your email with the link below to complete the registration process.<br><br>
        ${process.env.BACKEND_URL}/auth/verify?key=${user.emailVerificationKey}`;
        const email = {
            from: emailAddress,
            to: user.email,
            subject: 'Verify your Email',
            html,
        };
        await transporter.sendMail(email);
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.sendVerificationEmail = sendVerificationEmail;
/**
 * Send a password reset to someone.
 * @param {User} user The user to send a reset email to.
 * @param {string} key The password reset key.
 */
async function sendPasswordReset(user, key) {
    const html = `<h1>Password Reset</h1>
    Hello <strong>${user.username}</strong>, you have requested to reset your password, if you did not request this change, please contact an Administrator.<br>
    Please click on the link below to continue the reset process, this link will expire in <strong>10 minutes</strong>.<br>
    <a href="${process.env.FRONTEND_URL}/resetpassword?key=${key}">Reset your password</a>`;
    const email = {
        from: emailAddress,
        to: user.email,
        subject: 'Password Reset',
        html,
    };
    await transporter.sendMail(email);
}
exports.sendPasswordReset = sendPasswordReset;
/**
 * Send a archive of all of the user's files.
 * @param {string} user The user to send the files to.
 * @param {any} archive The archive.
 */
async function sendFileArchive(user, archive) {
    const html = `<h1>File Archive</h1>
    Hello <strong>${user.username}</strong>, you have requested to recieve an archive of all of your files, if you did not request this, please contact an Administrator.`;
    const email = {
        from: emailAddress,
        to: user.email,
        subject: 'File Archive',
        html,
        attachments: [
            {
                filename: 'archive.zip',
                content: archive,
                contentType: 'application/zip',
            },
        ],
    };
    await transporter.sendMail(email);
}
exports.sendFileArchive = sendFileArchive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbFV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvTWFpbFV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNERBQW9DO0FBSXBDLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBRXhDOztHQUVHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsb0JBQVUsQ0FBQyxlQUFlLENBQUM7SUFDM0MsT0FBTyxFQUFFLE9BQU87SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztLQUNuQztDQUNKLENBQUMsQ0FBQztBQTBFQyxrQ0FBVztBQXhFZjs7O0dBR0c7QUFDSCxLQUFLLFVBQVUscUJBQXFCLENBQUMsSUFBVTtJQUMzQyxJQUFJO1FBQ0EsTUFBTSxJQUFJLEdBQUc7a0ZBQzZELElBQUksQ0FBQyxRQUFROztVQUVyRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsb0JBQW9CLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRXpFLE1BQU0sS0FBSyxHQUFHO1lBQ1YsSUFBSSxFQUFFLFlBQVk7WUFDbEIsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2QsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixJQUFJO1NBQ1AsQ0FBQztRQUVGLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtBQUNMLENBQUM7QUFtREcsc0RBQXFCO0FBakR6Qjs7OztHQUlHO0FBQ0gsS0FBSyxVQUFVLGlCQUFpQixDQUFDLElBQVUsRUFBRSxHQUFXO0lBQ3BELE1BQU0sSUFBSSxHQUFHO29CQUNHLElBQUksQ0FBQyxRQUFROztlQUVsQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksc0JBQXNCLEdBQUcsMkJBQTJCLENBQUM7SUFFeEYsTUFBTSxLQUFLLEdBQUc7UUFDVixJQUFJLEVBQUUsWUFBWTtRQUNsQixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDZCxPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLElBQUk7S0FDUCxDQUFDO0lBRUYsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUErQkcsOENBQWlCO0FBN0JyQjs7OztHQUlHO0FBQ0gsS0FBSyxVQUFVLGVBQWUsQ0FBQyxJQUFVLEVBQUUsT0FBWTtJQUNuRCxNQUFNLElBQUksR0FBRztvQkFDRyxJQUFJLENBQUMsUUFBUSx5SUFBeUksQ0FBQztJQUV2SyxNQUFNLEtBQUssR0FBaUI7UUFDeEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLO1FBQ2QsT0FBTyxFQUFFLGNBQWM7UUFDdkIsSUFBSTtRQUNKLFdBQVcsRUFBRTtZQUNUO2dCQUNJLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsV0FBVyxFQUFFLGlCQUFpQjthQUNqQztTQUNKO0tBQ0osQ0FBQztJQUVGLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBTUcsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpbCBmcm9tICdub2RlbWFpbGVyL2xpYi9tYWlsZXInO1xyXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcclxuaW1wb3J0IHNtdHBUcmFuc3BvcnQgZnJvbSAnbm9kZW1haWxlci1zbXRwLXRyYW5zcG9ydCc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcclxuXHJcbmNvbnN0IGVtYWlsQWRkcmVzcyA9ICdkbnl3dGZAZ21haWwuY29tJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgbm9kZW1haWxlciB0cmFuc3BvcnRlci5cclxuICovXHJcbmNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgc2VydmljZTogJ2dtYWlsJyxcclxuICAgIGF1dGg6IHtcclxuICAgICAgICB1c2VyOiBlbWFpbEFkZHJlc3MsXHJcbiAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuR01BSUxfUEFTU1dPUkQsXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBTZW5kIHRoZSB2ZXJpZmljYXRpb24gZW1haWwgdG8gYSB1c2VyLlxyXG4gKiBAcGFyYW0ge1VzZXJ9IHVzZXIgVGhlIHVzZXIgdG8gc2VuZCB0aGUgZW1haWwgdG8uXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZW5kVmVyaWZpY2F0aW9uRW1haWwodXNlcjogVXNlcikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBodG1sID0gYDxoMT5FbWFpbCBWZXJpZmljYXRpb248L2gxPlxyXG4gICAgICAgIFRoYW5rIHlvdSBmb3IgcmVnaXN0ZXJpbmcgb24gPGEgaHJlZj1cImh0dHBzOi8vZG55Lnd0ZlwiPkRueTwvYT4sIDxzdHJvbmc+JHt1c2VyLnVzZXJuYW1lfTwvc3Ryb25nPi48YnI+XHJcbiAgICAgICAgUGxlYXNlIGNvbmZpcm0geW91ciBlbWFpbCB3aXRoIHRoZSBsaW5rIGJlbG93IHRvIGNvbXBsZXRlIHRoZSByZWdpc3RyYXRpb24gcHJvY2Vzcy48YnI+PGJyPlxyXG4gICAgICAgICR7cHJvY2Vzcy5lbnYuQkFDS0VORF9VUkx9L2F1dGgvdmVyaWZ5P2tleT0ke3VzZXIuZW1haWxWZXJpZmljYXRpb25LZXl9YDtcclxuXHJcbiAgICAgICAgY29uc3QgZW1haWwgPSB7XHJcbiAgICAgICAgICAgIGZyb206IGVtYWlsQWRkcmVzcyxcclxuICAgICAgICAgICAgdG86IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHN1YmplY3Q6ICdWZXJpZnkgeW91ciBFbWFpbCcsXHJcbiAgICAgICAgICAgIGh0bWwsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwoZW1haWwpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZW5kIGEgcGFzc3dvcmQgcmVzZXQgdG8gc29tZW9uZS5cclxuICogQHBhcmFtIHtVc2VyfSB1c2VyIFRoZSB1c2VyIHRvIHNlbmQgYSByZXNldCBlbWFpbCB0by5cclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcGFzc3dvcmQgcmVzZXQga2V5LlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gc2VuZFBhc3N3b3JkUmVzZXQodXNlcjogVXNlciwga2V5OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGh0bWwgPSBgPGgxPlBhc3N3b3JkIFJlc2V0PC9oMT5cclxuICAgIEhlbGxvIDxzdHJvbmc+JHt1c2VyLnVzZXJuYW1lfTwvc3Ryb25nPiwgeW91IGhhdmUgcmVxdWVzdGVkIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQsIGlmIHlvdSBkaWQgbm90IHJlcXVlc3QgdGhpcyBjaGFuZ2UsIHBsZWFzZSBjb250YWN0IGFuIEFkbWluaXN0cmF0b3IuPGJyPlxyXG4gICAgUGxlYXNlIGNsaWNrIG9uIHRoZSBsaW5rIGJlbG93IHRvIGNvbnRpbnVlIHRoZSByZXNldCBwcm9jZXNzLCB0aGlzIGxpbmsgd2lsbCBleHBpcmUgaW4gPHN0cm9uZz4xMCBtaW51dGVzPC9zdHJvbmc+Ljxicj5cclxuICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LkZST05URU5EX1VSTH0vcmVzZXRwYXNzd29yZD9rZXk9JHtrZXl9XCI+UmVzZXQgeW91ciBwYXNzd29yZDwvYT5gO1xyXG5cclxuICAgIGNvbnN0IGVtYWlsID0ge1xyXG4gICAgICAgIGZyb206IGVtYWlsQWRkcmVzcyxcclxuICAgICAgICB0bzogdXNlci5lbWFpbCxcclxuICAgICAgICBzdWJqZWN0OiAnUGFzc3dvcmQgUmVzZXQnLFxyXG4gICAgICAgIGh0bWwsXHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKGVtYWlsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgYSBhcmNoaXZlIG9mIGFsbCBvZiB0aGUgdXNlcidzIGZpbGVzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlciBUaGUgdXNlciB0byBzZW5kIHRoZSBmaWxlcyB0by5cclxuICogQHBhcmFtIHthbnl9IGFyY2hpdmUgVGhlIGFyY2hpdmUuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZW5kRmlsZUFyY2hpdmUodXNlcjogVXNlciwgYXJjaGl2ZTogYW55KSB7XHJcbiAgICBjb25zdCBodG1sID0gYDxoMT5GaWxlIEFyY2hpdmU8L2gxPlxyXG4gICAgSGVsbG8gPHN0cm9uZz4ke3VzZXIudXNlcm5hbWV9PC9zdHJvbmc+LCB5b3UgaGF2ZSByZXF1ZXN0ZWQgdG8gcmVjaWV2ZSBhbiBhcmNoaXZlIG9mIGFsbCBvZiB5b3VyIGZpbGVzLCBpZiB5b3UgZGlkIG5vdCByZXF1ZXN0IHRoaXMsIHBsZWFzZSBjb250YWN0IGFuIEFkbWluaXN0cmF0b3IuYDtcclxuXHJcbiAgICBjb25zdCBlbWFpbDogTWFpbC5PcHRpb25zID0ge1xyXG4gICAgICAgIGZyb206IGVtYWlsQWRkcmVzcyxcclxuICAgICAgICB0bzogdXNlci5lbWFpbCxcclxuICAgICAgICBzdWJqZWN0OiAnRmlsZSBBcmNoaXZlJyxcclxuICAgICAgICBodG1sLFxyXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiAnYXJjaGl2ZS56aXAnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogYXJjaGl2ZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vemlwJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfTtcclxuXHJcbiAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChlbWFpbCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICB0cmFuc3BvcnRlcixcclxuICAgIHNlbmRWZXJpZmljYXRpb25FbWFpbCxcclxuICAgIHNlbmRQYXNzd29yZFJlc2V0LFxyXG4gICAgc2VuZEZpbGVBcmNoaXZlXHJcbn07XHJcblxyXG4iXX0=