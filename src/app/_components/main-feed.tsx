"use client";

import React from "react";
import { api } from "@/trpc/react";
import { Feed } from "./feed";

export function MainFeed() {
  const feedQuery = api.post.infiniteFollowedPosts.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 30 * 1000,
      refetchInterval: 30 * 1000,
    },
  );

  return (
    <>
      <div className="p-2">
        <h1>Feed</h1>
      </div>
      <Feed query={feedQuery} />
    </>
  );
}
