import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

// Helper: encode to Base64URL
function base64EncodeUrl(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  let binString = "";
  for (let i = 0; i < data.length; i++) {
    binString += String.fromCharCode(data[i]);
  }
  const b64 = btoa(binString);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Helper: Refresh access token
async function getGmailAccessToken(clientId, clientSecret, refreshToken) {
  const url = "https://oauth2.googleapis.com/token";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to refresh Google access token: ${errText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Dynamic import of env to prevent client-side build errors
          const { env } = await import('cloudflare:workers');
          
          const clientId = env.GMAIL_CLIENT_ID;
          const clientSecret = env.GMAIL_CLIENT_SECRET;
          const refreshToken = env.GMAIL_REFRESH_TOKEN;

          if (!clientId || !clientSecret || !refreshToken) {
            return json(
              { error: "Email service credentials are not configured on Cloudflare (missing GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, or GMAIL_REFRESH_TOKEN)." },
              { status: 500 }
            );
          }

          // Parse request body
          const body = await request.json();
          const { name, email, phone, message } = body;

          // Basic validation
          if (!name || !email || !message) {
            return json(
              { error: "Missing required fields: name, email, message." },
              { status: 400 }
            );
          }

          const toEmail = env.GMAIL_TO_EMAIL || "Van001@huluntrade.com";
          const emailSubject = `New Contact Form Submission from ${name}`;
          const emailHtml = `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line; background-color: #f7f7f7; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">${message}</p>
          `;

          // 1. Get Access Token
          const accessToken = await getGmailAccessToken(clientId, clientSecret, refreshToken);

          // 2. Build MIME Email
          const encodedSubject = btoa(
            Array.from(new TextEncoder().encode(emailSubject), (byte) =>
              String.fromCharCode(byte)
            ).join("")
          );

          const rawMail = [
            `From: ${toEmail}`,
            `To: ${toEmail}`,
            `Reply-To: ${email}`,
            `Subject: =?utf-8?B?${encodedSubject}?=`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=utf-8`,
            ``,
            emailHtml
          ].join("\r\n");

          const base64RawMail = base64EncodeUrl(rawMail);

          // 3. Send email via Gmail API
          const gmailResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              raw: base64RawMail
            })
          });

          let gmailData = {};
          const responseText = await gmailResponse.text();
          try {
            gmailData = JSON.parse(responseText);
          } catch (e) {
            gmailData = { error: responseText };
          }

          if (!gmailResponse.ok) {
            const errorMsg = gmailData.error && gmailData.error.message ? gmailData.error.message : (gmailData.error || "Failed to send email via Gmail API.");
            return json({ error: errorMsg }, { status: gmailResponse.status });
          }

          return json({ success: true, message: "Email sent successfully!" });

        } catch (error) {
          return json({ error: error.message || "Internal server error." }, { status: 500 });
        }
      }
    }
  }
})
