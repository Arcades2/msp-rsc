"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { type api } from "@/trpc/react";
import { CreatePostForm } from "@/app/_components/create-post-form";
import { MusicPost } from "@/app/_components/music-post";
import { Button } from "@/components/ui/button";

export type FeedProps = {
  query: ReturnType<typeof api.post.infiniteFollowedPosts.useInfiniteQuery>;
};

export function Feed({ query }: FeedProps) {
  const { ref, inView } = useInView();
  const { fetchNextPage } = query;

  React.useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (query.status === "error") {
    return <div>{query.error.message}</div>;
  }

  return (
    <>
      <div className="my-4 w-full border-t border-neutral-400 border-opacity-25" />
      <div className="p-2">
        <CreatePostForm />
      </div>
      <div>
        {query.data?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <div
              key={post.id}
              className="border-y border-neutral-400 border-opacity-25"
            >
              <MusicPost post={post} />
            </div>
          ))}
        <div className="my-8 text-center">
          <Button
            ref={ref}
            onClick={() => query.fetchNextPage()}
            disabled={!query.hasNextPage || query.isFetchingNextPage}
          >
            {(() => {
              if (query.isFetchingNextPage) return "Loading more...";
              if (query.hasNextPage) return "Load older";
              return "Nothing more to load";
            })()}
          </Button>
        </div>
      </div>
    </>
  );
}
