const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// 辅助函数：将字符串编码为符合 Gmail API 要求的 Base64URL 格式，完美支持 UTF-8 字符（如中文）
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

// 辅助函数：使用 Refresh Token 刷新获取临时的 Access Token
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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route /api/contact requests
    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }

      if (request.method === "POST") {
        try {
          // Check if Gmail API Credentials are configured
          const clientId = env.GMAIL_CLIENT_ID;
          const clientSecret = env.GMAIL_CLIENT_SECRET;
          const refreshToken = env.GMAIL_REFRESH_TOKEN;

          if (!clientId || !clientSecret || !refreshToken) {
            return new Response(
              JSON.stringify({ error: "Email service credentials are not configured on Cloudflare (missing GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, or GMAIL_REFRESH_TOKEN)." }),
              { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          // Parse request body
          const body = await request.json();
          const { name, email, phone, message } = body;

          // Basic validation
          if (!name || !email || !message) {
            return new Response(
              JSON.stringify({ error: "Missing required fields: name, email, message." }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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

          // 1. 获取 Gmail Access Token
          let accessToken;
          try {
            accessToken = await getGmailAccessToken(clientId, clientSecret, refreshToken);
          } catch (tokenError) {
            return new Response(
              JSON.stringify({ error: `Auth Error: ${tokenError.message}` }),
              { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          // 2. 构造 MIME 邮件
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

          // 3. 调用 Gmail API 发送邮件
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
            return new Response(
              JSON.stringify({ error: errorMsg }),
              { status: gmailResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }

          return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully!" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );

        } catch (error) {
          return new Response(
            JSON.stringify({ error: error.message || "Internal server error." }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      return new Response(
        JSON.stringify({ error: "Method not allowed." }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Serve static assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
