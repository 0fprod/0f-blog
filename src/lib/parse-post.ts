import { Post } from "@/models/Post";
import { readFileSync } from "fs";
import matter, { GrayMatterFile } from "gray-matter";

export const parsePost = (filepath: string): Post => {
  const rawContent = readFileSync(filepath, 'utf8');
  const { data, content } = matter(rawContent) as GrayMatterFile<string>;

  return {
    title: data.title,
    slug: data.id,
    date: data.date,
    content,
  };
};