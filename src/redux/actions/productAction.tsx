import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductType } from "../../assets/types/sliceTypes";

const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk<ProductType[]>(
  "getAllProducts",
  async () => {
    const response = await axios.get<ProductType[]>(`${BASE_URL}/products`);
    return response.data;
  }
);
