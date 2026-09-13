export type WaitlistPayload = {
  name?: string;
  email: string;
  craft?: string;
  source?: string;
  company?: string;
};

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string; field?: string; status: number };

export async function joinWaitlist(
  payload: WaitlistPayload,
): Promise<WaitlistResult> {
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string; field?: string }
      | null;

    if (!res.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.error || "transmission failed",
        field: data?.field,
        status: res.status,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "network error", status: 0 };
  }
}
