import { Link, useCatch, useFetcher, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Post, type PostType } from "~/supabase.server";
import { useEffect, useState } from "react";
import { animated, config, useSpring, useSpringRef } from "react-spring";
import { ArrowBack, ArrowLeft, ArrowRight } from "tabler-icons-react";

export const meta: MetaFunction = () => ({
  title: "Posts - Index",
});

export const loader: LoaderFunction = async () => {
  // 1. Call the post class
  const post = new Post();

  // 2. Call the post.get method
  const get = await post.getAllPost();

  // 3. If there's any error, throw a response.
  if (get.data?.length === 0) throw new Response("No posts we're found.");

  // 4. Return the data.
  return json(get.data);
};
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-center">Caught - {caught.status}</h1>
        <p className="text-center">{caught.data}</p>
        <div className="text-center not-prose">
          <Link to="/">
            <button className="btn btn-info btn-block">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PostsIndex() {
  const posts = useLoaderData<PostType[]>();
  const fetcher = useFetcher<PostType[]>();

  const [flip, setFlip] = useState(false);

  // Animation
  const props = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    reset: true,
    reverse: flip,
    config: config.slow,
    onRest: () => setFlip(!flip),
  });

  const fadeInRef = useSpringRef();

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  const data = fetcher.data || posts;

  useEffect(() => {
    if (fetcher.type === "done") {
      fadeInRef.start();
    } else if (fetcher.type === "init") {
      fadeInRef.stop();
      fetcher.load("/posts?index");
    }
  }, [fetcher]);

  return (
    <>
      {data ? (
        fetcher.type === "done" ? (
          <animated.div style={fadeIn}>
            <h1 className="mt-10 text-center">Posts</h1>
            <ul>
              {data.map((post) => (
                <li key={post.id}>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-between not-prose">
              <Link to="/">
                <button className="btn btn-outline gap-2">
                  <ArrowLeft />
                  Go Back
                </button>
              </Link>

              <Link to="/admin">
                <button className="btn gap-2">
                  Admin
                  <ArrowRight />
                </button>
              </Link>
            </div>
          </animated.div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <animated.h1 className="text-center" style={props}>
              Loading Data...
            </animated.h1>
          </div>
        )
      ) : null}
    </>
  );
}
