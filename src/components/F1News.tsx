"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { AlertCircle, RefreshCcw, Rss, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  title: string;
  url: string;
  publishedAt?: string;
}

interface ApiResponse {
  articles: Article[];
  updatedAt?: string;
  error?: string;
}

function domainFromUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function F1News() {
  const query = useQuery<ApiResponse>({
    queryKey: ["f1-news"],
    queryFn: async () => {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load news");
      return res.json();
    },
    // Refresh every 60s for near real-time updates
    refetchInterval: 60_000,
  });

  const { data, isLoading, isError, error, refetch, isFetching } = query;

  return (
    <section id="news" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-racing font-black mb-3">
              <span className="heading-f1">REAL‑TIME F1 NEWS</span>
            </h2>
            <p className="text-f1-silver">
              Live headlines from top sources. Updates every minute.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="h-10 inline-flex items-center gap-2 px-3 rounded-lg border border-border bg-f1-carbon text-f1-white hover:bg-f1-carbon/80 focus:outline-none focus:ring-2 focus:ring-f1-red"
            aria-label="Refresh news"
          >
            <RefreshCcw className={isFetching ? "animate-spin" : ""} size={18} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="card-f1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Rss size={16} className="text-f1-silver" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-3/4 mb-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="card-f1 p-6 flex items-start gap-3 text-f1-silver">
            <AlertCircle className="text-f1-red mt-0.5" />
            <div>
              <p className="font-semibold text-f1-white">Failed to load news</p>
              <p className="text-sm opacity-80">{(error as Error)?.message ?? "Unknown error"}</p>
            </div>
          </div>
        )}

        {!!data && !isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.articles?.length ? (
              data.articles.map((a, idx) => (
                <a
                  key={`${a.url}-${idx}`}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-f1 p-6 group transition-shadow hover:shadow-lg hover:shadow-f1-red/10"
                >
                  <div className="flex items-center gap-2 text-xs text-f1-silver/80 mb-2">
                    <Rss size={14} />
                    <span>{domainFromUrl(a.url)}</span>
                  </div>
                  <h3 className="text-f1-white font-semibold leading-snug mb-3 group-hover:text-f1-red transition-colors">
                    {a.title}
                  </h3>
                  {a.publishedAt && (
                    <div className="text-xs text-f1-silver/70 flex items-center gap-1">
                      <span>
                        {formatDistanceToNowStrict(parseISO(a.publishedAt), { addSuffix: true })}
                      </span>
                      <ExternalLink size={12} className="opacity-70" />
                    </div>
                  )}
                </a>
              ))
            ) : (
              <div className="col-span-full card-f1 p-8 text-center text-f1-silver">
                No news at the moment. Please try again later.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
