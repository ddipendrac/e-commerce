'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddProductForm = () => {
  const { handleSubmit, control } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      // Send the data to your API to add the product
      const response = await axios.post('/api/products', data);
      if (response.status === 200) {
        // Redirect to the product listing page or show success message
        router.push('/products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <div>
        <label>Price</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>

      <div>
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
      </div>

      <div>
        <label>Category</label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <div>
        <label>Image URL</label>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
