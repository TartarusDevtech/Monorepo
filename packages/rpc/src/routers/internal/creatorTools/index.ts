import { router } from "../../../trpc";
import { assignPermission } from "./assignPermission";

export const creatorToolsRouter = router({
  assign: assignPermission
});

export type CreatorToolsRouter = typeof creatorToolsRouter;
