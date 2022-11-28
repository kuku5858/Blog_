import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services/index";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white rounded-md p-8 mb-6">
      <h5 className="font-semibold mb-6 mt-2">Categories</h5>
      {categories?.map((category) => (
        <div key={category.slug} className="cursor-pointer border-b border-gray-200 pb-0.5 mt-8">
          <Link href={`/category/${category.slug}`} className="">
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
