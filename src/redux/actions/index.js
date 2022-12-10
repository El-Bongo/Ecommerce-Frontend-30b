import { getAllCateg, getAllData } from "../slices/articlesSlice";
import { insertDataDetails } from "../slices/detailSlice";

// Gets

export const getAll = () => async (dispatch) => {
  await fetch("http://localhost:3001/articulo/getall", { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(getAllData(data));
    });
};
export const getAllCategories = () => async (dispatch) => {
  await fetch("http://localhost:3001/category/getall", { method: "GET" })
    .then(async (dataJson) => await dataJson.json())
    .then((data) => {
      dispatch(getAllCateg(data));
    })
    .catch((error) => console.log(error));
};

export const getSingleArticle = (id) => async (dispatch) => {
  await fetch("http://localhost:3001/articulo/" + id, { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(insertDataDetails(data));
    });
};

// Posts
export const postArticle = (item) => () => {
  fetch("http://localhost:3001/articulo/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const despachar = (id) => {
  fetch("http://localhost:3001/orders/update/" + id, {
    method: "POST",
    body: JSON.stringify({ despachada: true }),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};
