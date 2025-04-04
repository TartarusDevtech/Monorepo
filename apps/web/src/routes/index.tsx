import Layout from "@/components/Common/Layout";
import Custom404 from "@/components/Shared/404";
import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router";
import groupRoutes from "./group";
import mainRoutes from "./misc";
import postRoutes from "./post";
import settingsRoutes from "./settings";
import staffRoutes from "./staff";

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
}

const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route, index) => (
    <Route
      key={`${route.path}-${index}`}
      path={route.path}
      element={route.element}
    >
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

export const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<Layout />}>
          {renderRoutes(mainRoutes)}
          {renderRoutes(groupRoutes)}
          {renderRoutes(postRoutes)}
          {renderRoutes(settingsRoutes)}
          {renderRoutes(staffRoutes)}
          <Route path="*" element={<Custom404 />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
};
