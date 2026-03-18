import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // posts 폴더 내의 파일 이름을 가져오고 .md 확장자만 필터링합니다.
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));
  const allPostsData = fileNames.map((fileName) => {
    // ".md" 확장자를 제거하여 id를 생성합니다.
    const id = fileName.replace(/\.md$/, '');

    // 마크다운 파일을 문자열로 읽어옵니다.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter를 사용하여 포스트의 메타데이터 섹션을 파싱합니다.
    const matterResult = matter(fileContents);

    // 데이터를 id와 합칩니다.
    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string }),
    };
  });

  // 날짜별로 포스트를 정렬합니다.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));

  // 다음과 같은 배열을 반환합니다.
  // [
  //   {
  //     params: {
  //       slug: 'hello-world'
  //     }
  //   },
  //   ...
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // gray-matter를 사용하여 포스트의 메타데이터 섹션을 파싱합니다.
  const matterResult = matter(fileContents);

  // remark를 사용하여 마크다운을 HTML 문자열로 변환합니다.
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 데이터를 id 및 contentHtml과 합칩니다.
  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
