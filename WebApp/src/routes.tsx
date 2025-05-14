import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import * as v from "valibot";
import { getPokemon } from "./shared/api";
import { Root } from "./components/root";
import TitlesSummary from "./pages/TitlesSummary";
import TitelParagraphsApp from "./pages/TitelParagraphs";
import HomeApp   from "./pages/Home";
import { ItemFilters } from "./types/item-filters";
import { isAuthenticated } from "./utils/auth";

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
    component: HomeApp,
});

const titlesSummaryRoute = createRoute({
  getParentRoute: () => rootRoute,
    path: "/titles",
    component: TitlesSummary 
});

const paragraphsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/paragraphs",
    component: TitelParagraphsApp
});
 
 

export const routeTree = rootRoute.addChildren([
  indexRoute,
    titlesSummaryRoute,
    paragraphsRoute 
]);
