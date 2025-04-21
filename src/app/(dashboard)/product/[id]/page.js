'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import AddEditProduct from "@/components/product/AddEditProduct";

const ProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log('++++++++++++++++++++++', id);

  return (
    <AddEditProduct pageType="edit" id={id} />
  );
};

export default ProductPage;
