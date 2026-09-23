import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { mdxComponents } from "./mdx-components";

const prettyCodeOptions: Partial<Options> = {
  theme: {
    light: "github-light",
    dark: "github-dark-default",
  },
  keepBackground: false,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, prettyCodeOptions],
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["no-underline", "hover:text-accent"],
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
