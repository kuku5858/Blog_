import React, { useState, useEffect } from "react";

import { submitComment } from "../services";

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      storeData:
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email"),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmitComment = () => {
    setError(false);

    // const { value: comment } = commentEl.current;
    // const { value: name } = nameEl.current;
    // const { value: email } = emailEl.current;
    // const { checked: storeData } = storeDataEl.current;

    const { name, email, comment, storeData } = formData;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = "";
          formData.email = "";
        }
        formData.comment = "";
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Writte a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          value={formData.comment}
          onChange={onInputChange}
          cols="25"
          rows="10"
          placeholder="Comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-1 focus:ring-gray-200 bg-gray-100 text-gray-700 resize-none"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onInputChange}
          className="p-2 outline-none w-full rounded-md focus:ring-1 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onInputChange}
          className="p-2 outline-none w-full rounded-md focus:ring-1 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer text-sm"
            htmlFor="storeData"
          >
            {" "}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-600">*All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmitComment}
          className="transition duration-500 ease p-2 rounded-md text-pink-900 border-2 border-pink-900 hover:bg-pink-900 hover:text-white"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-md float-right font-semibold text-green-400">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
