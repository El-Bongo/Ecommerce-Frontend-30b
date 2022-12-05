import { getAllCateg, getAllData } from "../slices/articlesSlice";
import { insertDataDetails } from "../slices/detailSlice";

// Gets

export const getAll = () => async (dispatch) => {
  await fetch("https://ecommerce-frontend-30b.vercel.app/articulo/getall", { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(getAllData(data));
    });
};
export const getAllCategories = () => async (dispatch) => {
  await fetch("https://ecommerce-frontend-30b.vercel.app/category/getall", { method: "GET" })
    .then(async (dataJson) => await dataJson.json())
    .then((data) => {
      dispatch(getAllCateg(data));
    })
    .catch((error) => console.log(error));
};

export const getSingleArticle = (id) => async (dispatch) => {
  await fetch("https://ecommerce-frontend-30b.vercel.app/articulo/" + id, { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(insertDataDetails(data));
    });
};

// Posts
export const postArticle = (item) => () => {
  fetch("https://ecommerce-frontend-30b.vercel.app/articulo/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const despachar = (id) => {
  fetch("https://ecommerce-frontend-30b.vercel.app/orders/update/" + id, {
    method: "POST",
    body: JSON.stringify({ despachada: true }),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};
