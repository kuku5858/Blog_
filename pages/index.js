import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components/index";
import { FeaturedPosts } from "../sections/index";

import { getPosts } from "../services/index";


export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-20 mb-8">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <FeaturedPosts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post} key={post.node.title} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  // console.log(`posts: ${posts}`)
  return {
    props: { posts },
  };
}
