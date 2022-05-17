import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useFetchers,
  useTransition,
} from "@remix-run/react";

import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect, useMemo } from "react";

import styles from "./styles/app.css";
export const links: LinksFunction = () => [
  {
    href: styles,
    rel: "stylesheet",
  },
  { rel: "stylesheet", href: nProgressStyles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

// Document
function Document({
  children,
  title = "Remix Blog - Supabase",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        <article className="container mx-auto prose h-full sm:prose-base md:prose-lg">
          {children}
        </article>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const transition = useTransition();
  const fetchers = useFetchers();

  const state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );

  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [transition.state]);

  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const { status, statusText } = useCatch();

  return (
    <Document title={`${status} - ${statusText}`}>
      <div className="flex h-screen">
        <div className="m-auto">
          <h1 className="text-center cursor-default hover:text-red-500 duration-500">
            {status} {statusText}
          </h1>

          <p className="text-center">
            Can't find the url you are looking for...
          </p>

          <div className="text-center not-prose">
            <Link to="/">
              <button className="btn btn-block btn-outline btn-info">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Document>
  );
}
