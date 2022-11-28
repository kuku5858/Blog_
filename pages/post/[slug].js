import React from 'react'
import { useRouter } from 'next/router'
import { getPosts, getPostDetails } from '../../services'

import { PostDetail, Categories, PostWidget, Author, Comments, CommentForm, Loader } from "../../components/index"

const PostDetails = ( { post }) => {

  const router = useRouter();

    if(router.isFallback) {
        return <Loader />
    }

  // console.log(post[0])
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-col1-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={ post[0] }/>
          <Author author={post[0].author}/>
          <CommentForm slug={post[0].slug}/>
          <Comments slug={post[0].slug}/>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post[0].slug} categories={post[0].categories?.map((category) => category.slug)}/>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  // console.log(`posts: ${posts}`)
  return {
    props: { post: data },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}