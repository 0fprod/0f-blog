import { readFileSync } from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import { Project } from "@/models/Project";

export const parseProject = (filepath: string): Project => {
  const rawContent = readFileSync(filepath, 'utf8');
  const { data } = matter(rawContent) as GrayMatterFile<string>;

  return {
    title: data.title,
    date: data.date,
    description: data.description,
    imageAlt: data.image_alt,
    imageUrl: data.image,
    url: data.url,
    repository: data.repository,
    tags: data.tags,
  };
}