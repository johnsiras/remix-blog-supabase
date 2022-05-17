import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { Check } from "tabler-icons-react";
import { z } from "zod";
import { Button, Textarea, TextInput } from "~/components/Form";
import { Post, PostType } from "~/supabase.server";

export const validator = withZod(
  z.object({
    slug: z.string().nonempty("Slug is required"),
    title: z.string().nonempty("Title is required"),
    content: z.string().nonempty("Content is required"),
  })
);

export const loader: LoaderFunction = async ({ params }) => {
  const post = new Post();
  const { data, error } = await post.getBySlug(params.slug as string);

  return json(data);
};

export const action: ActionFunction = async ({ params, request }) => {
  const result = await validator.validate(await request.formData());
  const post = new Post();

  if (result.error) return validationError(result.error);

  const { slug, title, content } = result.data;

  const { data, error } = await post.editPost(params.slug as string, {
    slug,
    title,
    content,
  });

  if (error?.code === "201") throw new Response(error?.message);

  return json(data);
};

export default function EditSlug() {
  const actionData = useActionData();
  const loaderData = useLoaderData<PostType[]>();

  return (
    <>
      <h1 className="text-center">Edit Slug - Admin</h1>

      <ValidatedForm validator={validator} method="post" noValidate>
        <div className="card w-full bg-base-200 shadow-xl">
          {loaderData?.map((post) => (
            <div className="card-body" key={post.slug}>
              <TextInput
                type="text"
                name="slug"
                label="Post Slug"
                placeholder="Ex. awesome or awe-some"
                autoComplete="off"
                altLabel="Must be lowercase and hyphenated."
                defaultValue={post.slug || "ss"}
                key={post.slug || "ss"}
                required
              />

              <TextInput
                name="title"
                label="Post Title"
                placeholder="My awesome blog"
                autoComplete="off"
                required
              />

              <Textarea
                name="content"
                label="Post Content"
                placeholder="*Hello World*"
                autoComplete="off"
                altLabel="Markdown is supported."
                required
              />

              <Button classes="mt-5 btn-outline btn-success">Submit</Button>
            </div>
          ))}
        </div>
      </ValidatedForm>

      {actionData && (
        <div className="alert alert-success shadow-lg">
          <div>
            <Check />
            <span>{actionData}</span>
          </div>
        </div>
      )}
    </>
  );
}
