import { appRouter } from "@/server/api/root";
import { createContext } from "@/trpc/server";
import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";

export const createSSRCaller = async () => {
  return appRouter.createCaller(await createContext());
};

export const createSSRHelper = async () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  });
};
