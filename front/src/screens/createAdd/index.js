import React, { useState } from "react";
import SelectCategory from "./components/SelectCategory";
import SelectSubCategory from "./components/SelectSubCategory";
import PostDetails from "./components/PostDetails";

export default function CreateAdd() {
  const [postStep, setPostStep] = useState(1);
  return (
    <div>
      {postStep === 1 ? (
        <SelectCategory />
      ) : postStep === 2 ? (
        <SelectSubCategory />
      ) : (
        postStep === 3 && <PostDetails />
      )}
    </div>
  );
}
