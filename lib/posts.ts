import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
  contentHtml: string;
}

export interface PostListItem {
  id: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
}

export function getSortedPostsData(): PostListItem[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string; tags?: string[] }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id: slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; description: string; tags?: string[] }),
  } as PostData;
}
