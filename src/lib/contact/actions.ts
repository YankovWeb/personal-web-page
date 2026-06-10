"use server";

import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in all fields." };
  }

  const supabase = await createClient();
  const { error: insertError } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
  });

  if (insertError) {
    return { ok: false, error: "Could not save your message. Please try again." };
  }

  const toEmail =
    process.env.CONTACT_TO_EMAIL ??
    process.env.ADMIN_EMAIL ??
    "yankovweb@outlook.com";

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { ok: true };
  }

  const resend = new Resend(resendKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const { error: emailError } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `New contact from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });

  if (emailError) {
    console.error("Contact email failed:", emailError);
  }

  return { ok: true };
}
