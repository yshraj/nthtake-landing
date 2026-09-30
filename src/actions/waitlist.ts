"use server";

export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email");
  
  if (!email || typeof email !== "string") {
    return { error: "Valid email is required" };
  }

  // Simulate network request/database insertion
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Here we would typically save to a database (e.g., Supabase, Prisma) 
  // or add to a mailer (e.g., Resend, Mailchimp)
  console.log(`[Waitlist] New signup: ${email}`);

  return { success: true, message: "Thanks for joining the waitlist!" };
}
