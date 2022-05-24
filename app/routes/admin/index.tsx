import { ActionFunction, json } from "@remix-run/node";
import { useActionData, Link } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { Check, EditCircle } from "tabler-icons-react";
import { z } from "zod";
import Button from "~/components/Form/Button";
import Textarea from "~/components/Form/Textarea";
import TextInput from "~/components/Form/TextInput";
import { Post } from "~/supabase.server";

export const validator = withZod(
  z.object({
    slug: z.string().min(1, "Slug is required"),
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const result = await validator.validate(await request.formData());

  if (result.error) return validationError(result.error);

  const { slug, title, content } = result.data;

  await new Post().create({ slug, title, content });

  return json("Post has been created!", { status: 201 });
};

export default function AdminIndex() {
  const success = useActionData<string>();

  return (
    <>
      <h1 className="text-center">Post Admin</h1>

      <ValidatedForm validator={validator} method="post" noValidate>
        <div className="card w-full bg-base-200 shadow-xl">
          <div className="card-body">
            <TextInput
              name="slug"
              label="Post Slug"
              placeholder="Ex. awesome or awe-some"
              autoComplete="off"
              altLabel="Must be lowercase and hyphenated."
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
        </div>
      </ValidatedForm>

      <div className="text-center mt-3">
        <Link to="/admin/edit">
          <button className="btn gap-2">
            <EditCircle />
            Edit A Post
          </button>
        </Link>
      </div>

      {success && (
        <div className="alert alert-success shadow-lg">
          <div>
            <Check />
            <span>{success}</span>
          </div>
        </div>
      )}
    </>
  );
}
