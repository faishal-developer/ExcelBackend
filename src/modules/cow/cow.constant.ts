import { ILocation, Ibreed, Icategory, Ilabel } from "./cow.interface";

export const location:ILocation[] = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Rajshahi",
  "Sylhet",
  "Comilla",
  "Rangpur",
  "Mymensingh",
];

export const breed:Ibreed[] = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
];

export const level:Ilabel[] = ["for sale", "sold out"];

export const category: Icategory[] = ["Dairy", "Beef", "DualPurpose"];

export const CowsSearchableFields=[
  "name",'location','breed','level','category'
]