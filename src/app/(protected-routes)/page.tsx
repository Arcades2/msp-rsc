import { unstable_noStore as noStore } from "next/cache";
import { createSSRHelper } from "@/server/helpers/ssHelpers";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { MainFeed } from "@/app/_components/main-feed";

export default async function Home() {
  noStore();
  const helpers = await createSSRHelper();

  await helpers.post.infiniteFollowedPosts.prefetchInfinite({});

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <MainFeed />
    </Hydrate>
  );
}
