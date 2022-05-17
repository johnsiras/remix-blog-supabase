import { json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { Post, type PostType } from "~/supabase.server";

export const loader: LoaderFunction = async ({ params }) => {
  const post = new Post();

  const { data, error } = await post.getBySlug(params.slug as string);

  if (data?.length === 0) throw new Response(error?.message);

  return json(data);
};

export default function PostsSlug() {
  const posts = useLoaderData<PostType[]>();
  const mark = (content: string) => {
    return marked.parse(content);
  };

  const [flip, setFlip] = useState(false);

  const fetcher = useFetcher<PostType[]>();

  // Animation
  const props = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    reset: true,
    reverse: flip,
    config: config.slow,
    delay: 200,
    onRest: () => setFlip(!flip),
  });

  const data = fetcher.data || posts;

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(`/posts/${data.map((slug) => slug.slug)}`);
    }
  }, [fetcher]);

  return (
    <>
      {fetcher.type === "done" ? (
        <>
          {data.map((post) => (
            <main key={post.id}>
              <h1 className="text-center">{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: mark(post.content) }} />
            </main>
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <animated.h1 className="text-center" style={props}>
            Loading data...
          </animated.h1>
        </div>
      )}
    </>
  );
}
