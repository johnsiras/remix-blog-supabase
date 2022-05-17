import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {
  MetaFunction,
  LoaderFunction,
  json,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import { Post, PostType } from "~/supabase.server";
import { Button } from "~/components/Form";

export const meta: MetaFunction = () => ({
  title: "Edit - Index",
});

export const loader: LoaderFunction = async () => {
  const { data, error } = await new Post().getAllPost();

  if (error?.code === "201") throw error;

  return json(data, { status: 200 });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const slug = formData.get("select") as string;

  return redirect(`/admin/edit/${slug}`);
};

export default function AdminIndex() {
  const [value, setValue] = useState("Select a slug");
  const posts = useLoaderData<PostType[]>();

  return (
    <main className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-center">Oops!</h1>
        <p className="text-center">You need to enter a slug in the url!</p>

        <Form method="post">
          <select
            className="select select-bordered w-full max-w-xs"
            value={value}
            name="select"
            onChange={(e) => setValue(e.target.value)}
          >
            <option disabled>Select a slug</option>

            {/* Mapped */}
            {posts.map((post) => (
              <option key={post.id}>{post.slug}</option>
            ))}
          </select>

          <button
            className="mt-5 btn btn-outline btn-block btn-success"
            type="submit"
          >
            Let's go!
          </button>
        </Form>
      </div>
    </main>
  );
}
