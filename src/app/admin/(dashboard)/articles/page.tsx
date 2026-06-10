import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteArticle } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="mt-1 text-sm text-muted">{articles?.length ?? 0} total</p>
        </div>
        <Button href="/admin/articles/new">+ New article</Button>
      </div>

      <div className="mt-8 space-y-3">
        {articles?.map((article) => (
          <div
            key={article.id}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="font-medium hover:text-accent"
                >
                  {article.title}
                </Link>
                <Badge
                  className={
                    article.status === "published"
                      ? "border-green-500/30 text-green-400"
                      : ""
                  }
                >
                  {article.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted">
                {formatDate(article.published_at ?? article.created_at)}
              </p>
            </div>
            <DeleteButton
              onDelete={deleteArticle.bind(null, article.id)}
            />
          </div>
        ))}
        {(!articles || articles.length === 0) && (
          <p className="text-center text-muted py-8">No articles yet.</p>
        )}
      </div>
    </div>
  );
}
