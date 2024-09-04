import React, { useState } from "react";
import { addCategory, updateCategory } from "../../api/categoryAPI";

const CategoryForm = ({ category, onSave }) => {
  const [name, setName] = useState(category ? category.name : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };
    if (category) {
      await updateCategory(category.id, categoryData);
    } else {
      await addCategory(categoryData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{category ? "Update Category" : "Add Category"}</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        {category ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
