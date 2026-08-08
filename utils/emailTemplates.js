function signupEmail(username){

   return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome</title>
</head>

<body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:50px 20px;">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:28px;overflow:hidden;">

    <!-- Decorative Top -->
    <tr>
        <td style="height:12px;background:
        linear-gradient(90deg,#111827 0%,#111827 20%,#2563eb 20%,#2563eb 40%,#8b5cf6 40%,#8b5cf6 60%,#ec4899 60%,#ec4899 80%,#14b8a6 80%,#14b8a6 100%);
        ">
        </td>
    </tr>

    <!-- Logo -->
    <tr>
        <td align="center" style="padding-top:45px;">

            <table cellpadding="0" cellspacing="0">
                <tr>

                    <td style="
                    width:72px;
                    height:72px;
                    background:#111827;
                    color:white;
                    border-radius:20px;
                    text-align:center;
                    font-size:32px;
                    font-weight:bold;">
                        E
                    </td>

                </tr>
            </table>

            <h1 style="margin:22px 0 0;font-size:34px;color:#111827;">
                E-commerce
            </h1>

        </td>
    </tr>

    <!-- Welcome -->
    <tr>
        <td style="padding:55px;">

            <div style="
            display:inline-block;
            padding:8px 18px;
            border-radius:50px;
            background:#eef2ff;
            color:#4338ca;
            font-size:13px;
            font-weight:bold;">
                NEW MEMBER
            </div>

            <h2 style="
            margin:30px 0 20px;
            font-size:42px;
            line-height:1.15;
            color:#111827;
            ">
                Welcome,<br>
                ${username}
            </h2>

            <p style="
            font-size:18px;
            color:#4b5563;
            line-height:1.9;
            margin:0;
            ">
                Thank you for joining our community.

                We created E-commerce to make online shopping simple,
                enjoyable, and trustworthy.

                Your journey starts today, and we're excited to have
                you with us.
            </p>

            <!-- Divider -->

            <table width="100%" cellpadding="0" cellspacing="0"
            style="margin:45px 0;">
                <tr>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                    <td width="34%" align="center"
                    style="font-size:22px;">
                        ✦
                    </td>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                </tr>
            </table>

            <table width="100%">
                <tr>

                    <td align="center">
                        <div style="font-size:36px;">🚚</div>
                        <div style="margin-top:12px;font-size:14px;color:#6b7280;">
                            Fast Delivery
                        </div>
                    </td>

                    <td align="center">
                        <div style="font-size:36px;">🛒</div>
                        <div style="margin-top:12px;font-size:14px;color:#6b7280;">
                            Thousands of Products
                        </div>
                    </td>

                    <td align="center">
                        <div style="font-size:36px;">💙</div>
                        <div style="margin-top:12px;font-size:14px;color:#6b7280;">
                            Trusted Support
                        </div>
                    </td>

                </tr>
            </table>

        </td>
    </tr>

    <!-- Footer -->

    <tr>
        <td style="padding:35px 55px;background:#fafafa;">

            <table width="100%">
                <tr>

                    <td style="font-size:14px;color:#6b7280;">
                        E-commerce
                    </td>

                    <td align="right"
                    style="font-size:13px;color:#9ca3af;">
                        Made with ❤ for our customers
                    </td>

                </tr>
            </table>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
}

function otpEmail(username,purpose,otp){ 

   return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Login</title>
</head>

<body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:50px 20px;">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:28px;overflow:hidden;">

    <!-- Top Accent -->
    <tr>
        <td style="height:12px;background:
        linear-gradient(90deg,#111827 0%,#111827 20%,#2563eb 20%,#2563eb 40%,#8b5cf6 40%,#8b5cf6 60%,#ec4899 60%,#ec4899 80%,#14b8a6 80%,#14b8a6 100%);">
        </td>
    </tr>

    <!-- Logo -->
    <tr>
        <td align="center" style="padding-top:45px;">

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td
                    style="
                    width:72px;
                    height:72px;
                    background:#111827;
                    border-radius:20px;
                    color:#ffffff;
                    text-align:center;
                    font-size:32px;
                    font-weight:bold;">
                        E
                    </td>
                </tr>
            </table>

            <h1 style="margin:22px 0 0;font-size:34px;color:#111827;">
                E-commerce
            </h1>

        </td>
    </tr>

    <!-- Content -->

    <tr>
        <td style="padding:55px;">

            <div style="
            display:inline-block;
            padding:8px 18px;
            border-radius:999px;
            background:#eef2ff;
            color:#4338ca;
            font-size:13px;
            font-weight:bold;">
                ${purpose}
            </div>

            <h2 style="
            margin:28px 0 20px;
            font-size:40px;
            line-height:1.2;
            color:#111827;">
                One-Time Password
            </h2>

            <h2 style="
            margin:30px 0 20px;
            font-size:42px;
            line-height:1.15;
            color:#111827;
            ">
                Hey,<br>
                ${username}
            </h2>

            <p style="
            font-size:18px;
            color:#4b5563;
            line-height:1.9;
            margin:0;">
                Use the verification code below to securely sign in to your
                <strong>E-commerce</strong> account.
            </p>

            <!-- OTP BOX -->

            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="margin:45px 0;">
                <tr>
                    <td align="center">

                        <div
                        style="
                        display:inline-block;
                        padding:22px 40px;
                        border:2px dashed #d1d5db;
                        border-radius:18px;
                        background:#fafafa;
                        font-size:42px;
                        font-weight:bold;
                        letter-spacing:12px;
                        color:#111827;">
                            ${otp}
                        </div>

                    </td>
                </tr>
            </table>

            <p style="
            text-align:center;
            font-size:16px;
            color:#6b7280;
            margin-top:-15px;">
                This OTP will expire in <strong>10 minutes</strong>.
            </p>

            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="margin:40px 0;">
                <tr>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                    <td width="34%" align="center"
                    style="font-size:20px;">
                        🔐
                    </td>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                </tr>
            </table>

            <p style="
            font-size:15px;
            color:#6b7280;
            line-height:1.8;
            margin:0;">
                If you didn't request this verification code, you can safely
                ignore this email. Your account remains secure and no changes
                will be made without this OTP.
            </p>

        </td>
    </tr>

    <!-- Footer -->

    <tr>
        <td style="
        padding:35px 55px;
        background:#fafafa;">

            <table width="100%">
                <tr>

                    <td
                    style="
                    font-size:14px;
                    color:#6b7280;">
                        E-commerce
                    </td>

                    <td
                    align="right"
                    style="
                    font-size:13px;
                    color:#9ca3af;">
                        Secure Authentication
                    </td>

                </tr>
            </table>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
}

function resetPasswordEmail(email, purpose, resetUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
</head>

<body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:50px 20px;">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:28px;overflow:hidden;">

    <!-- Top Accent -->
    <tr>
        <td style="height:12px;background:
        linear-gradient(90deg,#111827 0%,#111827 20%,#2563eb 20%,#2563eb 40%,#8b5cf6 40%,#8b5cf6 60%,#ec4899 60%,#ec4899 80%,#14b8a6 80%,#14b8a6 100%);">
        </td>
    </tr>

    <!-- Logo -->
    <tr>
        <td align="center" style="padding-top:45px;">

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td
                    style="
                    width:72px;
                    height:72px;
                    background:#111827;
                    border-radius:20px;
                    color:#ffffff;
                    text-align:center;
                    font-size:32px;
                    font-weight:bold;">
                        E
                    </td>
                </tr>
            </table>

            <h1 style="margin:22px 0 0;font-size:34px;color:#111827;">
                E-commerce
            </h1>

        </td>
    </tr>

    <!-- Content -->
    <tr>
        <td style="padding:55px;">

            <div style="
            display:inline-block;
            padding:8px 18px;
            border-radius:999px;
            background:#eef2ff;
            color:#4338ca;
            font-size:13px;
            font-weight:bold;">
                ${purpose}
            </div>

            <h2 style="
            margin:28px 0 20px;
            font-size:40px;
            line-height:1.2;
            color:#111827;">
                Reset Password
            </h2>

            <h2 style="
            margin:30px 0 20px;
            font-size:42px;
            line-height:1.15;
            color:#111827;">
                Hey,<br>
                User
            </h2>

            <p style="
            font-size:18px;
            color:#4b5563;
            line-height:1.9;
            margin:0;">
                We received a request to reset the password for the account associated with
                <strong>${email}</strong>.
            </p>

            <p style="
            font-size:18px;
            color:#4b5563;
            line-height:1.9;
            margin:25px 0;">
                Click the button below to create a new password.
            </p>

            <!-- Reset Button -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:45px 0;">
                <tr>
                    <td align="center">

                        <a href="${resetUrl}"
                        style="
                        display:inline-block;
                        background:#111827;
                        color:#ffffff;
                        text-decoration:none;
                        padding:18px 42px;
                        border-radius:14px;
                        font-size:18px;
                        font-weight:bold;">
                            Reset Password
                        </a>

                    </td>
                </tr>
            </table>

            <p style="
            text-align:center;
            font-size:16px;
            color:#6b7280;">
                This link will expire in <strong>10 minutes</strong>.
            </p>

            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="margin:40px 0;">
                <tr>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                    <td width="34%" align="center"
                    style="font-size:20px;">
                        🔒
                    </td>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                </tr>
            </table>

            <p style="
            font-size:15px;
            color:#6b7280;
            line-height:1.8;
            margin:0;">
                If the button doesn't work, copy and paste the following link into your browser:
            </p>

            <p style="
            word-break:break-all;
            margin-top:18px;
            padding:16px;
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:12px;
            font-size:14px;
            color:#374151;">
                ${resetUrl}
            </p>

            <p style="
            font-size:15px;
            color:#6b7280;
            line-height:1.8;
            margin-top:30px;">
                If you didn't request a password reset, you can safely ignore this email.
                Your password will remain unchanged.
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="
        padding:35px 55px;
        background:#fafafa;">

            <table width="100%">
                <tr>

                    <td
                    style="
                    font-size:14px;
                    color:#6b7280;">
                        E-commerce
                    </td>

                    <td
                    align="right"
                    style="
                    font-size:13px;
                    color:#9ca3af;">
                        Password Recovery
                    </td>

                </tr>
            </table>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}

function invitationEmail(invitationLink) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>You're Invited</title>
</head>

<body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:50px 20px;">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:28px;overflow:hidden;">

    <!-- Top Accent -->
    <tr>
        <td style="height:12px;background:
        linear-gradient(90deg,#111827 0%,#111827 20%,#2563eb 20%,#2563eb 40%,#8b5cf6 40%,#8b5cf6 60%,#ec4899 60%,#ec4899 80%,#14b8a6 80%,#14b8a6 100%);">
        </td>
    </tr>

    <!-- Logo -->
    <tr>
        <td align="center" style="padding-top:45px;">

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td
                    style="
                    width:72px;
                    height:72px;
                    background:#111827;
                    border-radius:20px;
                    color:#ffffff;
                    text-align:center;
                    font-size:32px;
                    font-weight:bold;">
                        E
                    </td>
                </tr>
            </table>

            <h1 style="margin:22px 0 0;font-size:34px;color:#111827;">
                E-commerce
            </h1>

        </td>
    </tr>

    <!-- Content -->
    <tr>
        <td style="padding:55px;">

            <div style="
            display:inline-block;
            padding:8px 18px;
            border-radius:999px;
            background:#eef2ff;
            color:#4338ca;
            font-size:13px;
            font-weight:bold;">
                INVITATION
            </div>

            <h2 style="
            margin:28px 0 20px;
            font-size:40px;
            line-height:1.2;
            color:#111827;">
                You're Invited!
            </h2>

            <h2 style="
            margin:30px 0 20px;
            font-size:42px;
            line-height:1.15;
            color:#111827;">
                Hello,
            </h2>

            <p style="
            font-size:18px;
            color:#4b5563;
            line-height:1.9;
            margin:0;">
                You have been invited to join the
                <strong>E-commerce</strong> platform.
            </p>

            <p style="
            font-size:18px;
            color:#4b5563;
            line-height:1.9;
            margin:25px 0;">
                Click the button below to review and accept your invitation.
                Once accepted, you'll be guided through the account setup process.
            </p>

            <!-- Invitation Button -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:45px 0;">
                <tr>
                    <td align="center">

                        <a href="${invitationLink}"
                        style="
                        display:inline-block;
                        background:#111827;
                        color:#ffffff;
                        text-decoration:none;
                        padding:18px 42px;
                        border-radius:14px;
                        font-size:18px;
                        font-weight:bold;">
                            Accept Invitation
                        </a>

                    </td>
                </tr>
            </table>

            <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="margin:40px 0;">
                <tr>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                    <td width="34%" align="center"
                    style="font-size:20px;">
                        ✨
                    </td>

                    <td width="33%">
                        <hr style="border:none;border-top:1px solid #e5e7eb;">
                    </td>

                </tr>
            </table>

            <p style="
            font-size:15px;
            color:#6b7280;
            line-height:1.8;
            margin:0;">
                If the button above doesn't work, copy and paste this link into your browser:
            </p>

            <p style="
            word-break:break-all;
            margin-top:18px;
            padding:16px;
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:12px;
            font-size:14px;
            color:#374151;">
                ${invitationLink}
            </p>

            <p style="
            font-size:15px;
            color:#6b7280;
            line-height:1.8;
            margin-top:30px;">
                If you weren't expecting this invitation, you can safely ignore this email. No account will be created unless you choose to accept the invitation.
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="
        padding:35px 55px;
        background:#fafafa;">

            <table width="100%">
                <tr>

                    <td
                    style="
                    font-size:14px;
                    color:#6b7280;">
                        E-commerce
                    </td>

                    <td
                    align="right"
                    style="
                    font-size:13px;
                    color:#9ca3af;">
                        Invitation System
                    </td>

                </tr>
            </table>

        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
}
module.exports = { signupEmail,otpEmail,resetPasswordEmail,invitationEmail }

