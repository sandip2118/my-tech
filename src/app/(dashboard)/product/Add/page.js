'use client'
import React from "react";
import { useParams, useRouter } from "next/navigation";
import AddEditProduct from "@/components/product/AddEditProduct";

const ProductPage = () => {
  return (
    <AddEditProduct pageType="add" />
  );
};

export default ProductPage;
