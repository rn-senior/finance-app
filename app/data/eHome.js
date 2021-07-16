import { Images } from "@config";

export const ECategories = [
  {
    title: "Clothing",
    icon: "gift",
  },
  {
    title: "Shoes",
    icon: "futbol",
  },
  {
    title: "Mobile",
    icon: "mobile-alt",
  },
  {
    title: "Laptop",
    icon: "laptop",
  },
  {
    title: "Accessories",
    icon: "headphones",
  },
  {
    title: "Activewear",
    icon: "hand-peace",
  },
];

export const EFeaturedShop = [
  {
    image: Images.branchApple,
    title: "Apple",
    rating: 4.5,
    totalRating: "(29)",
    description: "300 products",
  },
  {
    image: Images.branchSamsung,
    title: "Samsung",
    rating: 4.5,
    totalRating: "(10)",
    description: "300 products",
  },
];

export const EPopulars = [
  {
    id: 1,
    description: "10 Jul",
    title: "Agregamos nuevos medios de pagos",
    image: Images.productView,
    costPrice: "$39",
    salePrice: "$29",
    isFavorite: false,
    price: 29,
  },
  {
    id: 2,
    description: "24 Ago",
    title: "Agregamos nuevos medios de pagos",
    image: Images.productGrid02,
    costPrice: "$59",
    salePrice: "$39",
    isFavorite: true,
    price: 39,
  },
  // {
  //   id: 3,
  //   description: "Branch New + Home Deliv..",
  //   title: "White T-Shirt with simple logo and …",
  //   image: Images.productGrid03,
  //   costPrice: "$39",
  //   salePrice: "$19",
  //   isFavorite: false,
  //   price: 19,
  // },
  // {
  //   id: 4,
  //   description: "Branch New + Home Deliv..",
  //   title: "White T-Shirt with simple logo and …",
  //   image: Images.productGrid04,
  //   costPrice: "$59",
  //   salePrice: "$39",
  //   isFavorite: true,
  //   price: 39,
  // },

  // {
  //   id: 5,
  //   description: "Branch New + Home Deliv..",
  //   title: "White T-Shirt with simple logo and …",
  //   image: Images.productGrid05,
  //   costPrice: "$59",
  //   salePrice: "$39",
  //   isFavorite: true,
  //   price: 39,
  // },

  // {
  //   id: 6,
  //   description: "Free delivery (Ts&Cs apply)",
  //   title: "Adidas Originals Superstar trainers …",
  //   image: Images.productGrid01,
  //   costPrice: "",
  //   salePrice: "$49",
  //   isFavorite: true,
  //   price: 49,
  // },
];

export const EYourStores = [
  {
    value: "america",
    icon: "sort-amount-up",
    text: "United States",
    image: Images.us,
  },
  {
    value: "vietname",
    icon: "sort-amount-down",
    text: "VietNam",
    image: Images.vn,
  },
  {
    value: "singapore",
    icon: "sort-amount-up",
    text: "Singapore",
    image: Images.sg,
  },
  {
    value: "indonesia",
    icon: "sort-amount-up",
    text: "Indonesia",
    image: Images.id,
  },
  {
    value: "malaysia",
    icon: "sort-amount-up",
    text: "Malaysia",
    image: Images.my,
  },
  {
    value: "philippines",
    icon: "sort-amount-up",
    text: "Philippines",
    image: Images.ph,
  },
];
