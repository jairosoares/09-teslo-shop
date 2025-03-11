import { User } from "@auth/interfaces/user.interfaces";

export interface ProductsResponse {
  count:    number;
  pages:    number;
  products: Product[];
}

export interface Product {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       Size[];
  gender:      Gender;
  tags:        string[];
  images:      string[];
  user:        User;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  XS = "XS",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}

export enum Email {
  Test1GoogleCOM = "test1@google.com",
}

export enum FullName {
  TestOne = "Test One",
}

export enum Role {
  Admin = "admin",
}
