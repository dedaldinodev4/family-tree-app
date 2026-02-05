import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

import RootLayout from "./RootLayout";
import Home from "@/pages/Home";
import Members from "@/pages/Members";
import MemberDetails from "@/pages/MemberDetails";
import Gallery from "@/pages/Gallery";
import Moments from "@/pages/Moments";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const membersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/members",
  component: Members,
});

const memberDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/members/$memberId",
  component: MemberDetails,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
})

const momentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/moments",
  component: Moments
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    membersRoute,
    memberDetailsRoute,
    galleryRoute,
    momentsRoute,
  ]),
});
