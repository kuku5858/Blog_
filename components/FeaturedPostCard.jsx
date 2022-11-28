import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const FeaturedPostCard = ({ post }) => {
  return (
    <div className="relative h-72">
      <div
        className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
        style={{ background: `url(${post.featuredImage.url})` }}
      />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-80 from-gray-400 via-gray-700 to-black w-full h-72" />
      <div className="flex flex-col gap-4 items-center justify-center p-6 absolute w-full h-full text-white">
        <p className="text-sm font-semibold">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
        <p className="text-center text-lg font-bold">{post.title}</p>
        <div className="flex justify-center items-center gap-3 mt-10">
          <Image
            unoptimized
            width={30}
            height={30}
            src={post.author.photo.url}
            alt={post.author.name}
            className="rounded-full align-middle drop-shadow-lg"
          />
          <p>{post.author.name}</p>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
    </div>
  );
};

export default FeaturedPostCard;
