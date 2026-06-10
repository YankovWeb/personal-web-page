import { createClient } from "@/lib/supabase/server";
import { deleteMessage, markMessageRead } from "@/lib/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="mt-1 text-sm text-muted">
        Contact form submissions from your site.
      </p>

      <div className="mt-8 space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-xl border p-5 ${
              msg.read
                ? "border-border bg-surface"
                : "border-accent/30 bg-accent/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{msg.name}</p>
                  {!msg.read && <Badge className="border-accent/30 text-accent">New</Badge>}
                </div>
                <a href={`mailto:${msg.email}`} className="text-sm text-accent hover:underline">
                  {msg.email}
                </a>
                <p className="mt-1 text-xs text-muted">{formatDate(msg.created_at)}</p>
              </div>
              <div className="flex gap-2">
                {!msg.read && (
                  <form action={markMessageRead.bind(null, msg.id)}>
                    <Button type="submit" variant="secondary" size="sm">
                      Mark read
                    </Button>
                  </form>
                )}
                <DeleteButton onDelete={deleteMessage.bind(null, msg.id)} />
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <p className="py-8 text-center text-muted">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
