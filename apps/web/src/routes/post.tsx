import type { RouteConfig } from ".";
import ViewPost from "../components/Post";

const postRoutes: RouteConfig[] = [
  {
    path: "posts/:id",
    element: <ViewPost />,
    children: [
      {
        path: "quotes",
        element: <ViewPost />
      }
    ]
  }
];

export default postRoutes;
