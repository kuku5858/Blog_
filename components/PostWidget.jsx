import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment/moment";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ slug , categories }) => {
  const [recentPost, setRecentPost] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRecentPost(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRecentPost(result);
      });
    }
  }, [slug]);

  // console.log(`resent ${JSON.stringify(recentPost)}`);
  // console.log(`slug ${slug}`);
  return (
    <div className="bg-white rounded-md p-8 mb-8">
      <h5 className="font-semibold mb-6">
        {slug ? "Related posts" : "Recent posts"}
      </h5>
      {recentPost.map((post) => (
        <div
          key={post.slug}
          className="flex gap-4 items-center mb-6"
        >
          <img
            src={post.featuredImage.url}
            alt=""
            className="h-14 w-14 rounded-full"
          />

          <div>
            <span className="text-gray-500 text-sm">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
            <Link href={`/post/${post.slug}`}>
              <p className="text-gray-700 text-base cursor-pointer ">{post.title}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
