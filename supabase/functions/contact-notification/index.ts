// Supabase Edge Function: contact-notification
// Deploy instructions:
// 1. Install Supabase CLI: npm install -g supabase
// 2. Login: supabase login
// 3. Link project: supabase link --project-ref <your-project-ref>
// 4. Set secret: supabase secrets set RESEND_API_KEY=re_... NOTIFY_EMAIL=your@email.com
// 5. Deploy: supabase functions deploy contact-notification
// 6. In Supabase Dashboard → Database → Webhooks → Create webhook:
//    Table: contact_messages | Event: INSERT
//    URL: https://<project-ref>.supabase.co/functions/v1/contact-notification
//    Header: Authorization: Bearer <your-service-role-key>

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? "";

serve(async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const payload = await req.json();

    // Supabase webhook sends { type, table, record, schema, old_record }
    const record = payload?.record;
    if (!record) {
      return new Response("No record in payload", { status: 400 });
    }

    const { name, email, phone, subject, message, created_at } = record;

    const emailBody = `
      <h2 style="color:#1d2327;font-family:sans-serif;">📬 New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:8px;font-weight:bold;width:120px;color:#555;">Name:</td><td style="padding:8px;border-bottom:1px solid #eee;">${name ?? "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Email:</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email ?? "—"}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Phone:</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone ?? "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Subject:</td><td style="padding:8px;border-bottom:1px solid #eee;">${subject ?? "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;vertical-align:top;">Message:</td><td style="padding:8px;white-space:pre-wrap;">${message ?? ""}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Submitted:</td><td style="padding:8px;color:#888;">${new Date(created_at).toLocaleString()}</td></tr>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#888;font-family:sans-serif;">
        Log into your admin dashboard to view and manage this inquiry.
      </p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "notifications@yourdomain.com", // Change to your verified Resend sender domain
        to: [NOTIFY_EMAIL],
        subject: `New Inquiry from ${name ?? "Website Visitor"}: ${subject ?? "(no subject)"}`,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend API error:", err);
      return new Response(`Email send failed: ${err}`, { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
