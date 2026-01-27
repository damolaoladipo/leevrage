import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "content/blog");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.json'));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.json$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.json`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const data = JSON.parse(fileContents);

    type Items = {
      [key: string]: string | object;
    };

    const items: any = {};

    function processImages(content: string) {
      return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
    }

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = processImages(data.detail || "");
      }

      if (field === "metadata") {
        items[field] = { ...data, coverImage: data.coverImage || null };
      }

      if (typeof data[field] !== "undefined") {
        items[field] = data[field];
      }
    });

    return items;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter(post => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

