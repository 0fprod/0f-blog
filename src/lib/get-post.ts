import { join } from "path";
import { parsePost } from "./parse-post";
import { Post } from "@/models/Post";

export const getPostBySlug = (slug: string): Post => {
  const filepath = join(process.cwd(), 'data', `${slug}.md`);
  return parsePost(filepath);
};
