import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type PostType = {
  id?: any;
  slug?: string;
  title: string;
  content: string;
};

export class Post {
  async create(data: PostType) {
    const { data: returnedData, error } = await supabase
      .from<PostType>("posts")
      .insert(data);

    return {
      returnedData,
      error,
    };
  }

  async getAllPost() {
    const { data, error } = await supabase.from<PostType>("posts").select();

    return { data, error };
  }

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from<PostType>("posts")
      .select()
      .eq("slug", slug);

    return { data, error };
  }

  async editPost(slug: string, dataToEdit: PostType) {
    const fetch = await this.getBySlug(slug);

    const { data, error } = await supabase
      .from<PostType>("posts")
      .update(dataToEdit)
      .match({ slug: fetch.data?.map((post) => post.slug) });

    return { data, error };
  }
}
