import { createClient } from "@/lib/supabase/server";

/**
 * Subscriber count widget — public on landing page. Hidden until count >= 50
 * per PRD §9.4. Reads hfm_sync_state.subscribers_count.
 *
 * Note: hfm_sync_state currently has service-role-only RLS. With the anon
 * server client, this query returns null in dev and prod alike — the widget
 * stays hidden. To make it actually public, create a SECURITY DEFINER RPC
 * (e.g. public.get_landing_subscriber_count()) and call it instead. Tracked
 * for a follow-up prompt.
 */
export async function SubscriberCount() {
  const supabase = createClient();
  const { data } = await supabase
    .from("hfm_sync_state")
    .select("subscribers_count")
    .eq("id", true)
    .maybeSingle();

  const count = data?.subscribers_count ?? 0;
  if (count < 50) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-card px-3 py-1.5 text-sm text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
      </span>
      <span>
        <span className="font-mono font-medium text-foreground">{count}</span>{" "}
        traders copying HayPlusbot
      </span>
    </div>
  );
}
