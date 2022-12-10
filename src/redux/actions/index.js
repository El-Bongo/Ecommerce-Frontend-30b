import { getUser, getUsers } from "../slices/adminPanel";
import { getAllCateg, getAllData } from "../slices/articlesSlice";
import { insertDataDetails } from "../slices/detailSlice";

// Gets

export const getAll = () => async (dispatch) => {
  await fetch(
    "https://pf-30b-backend-production.up.railway.app/articulo/getall",
    { method: "GET" }
  )
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(getAllData(data));
    });
};
export const getAllCategories = () => async (dispatch) => {
  await fetch(
    "https://pf-30b-backend-production.up.railway.app/category/getall",
    { method: "GET" }
  )
    .then(async (dataJson) => await dataJson.json())
    .then((data) => {
      dispatch(getAllCateg(data));
    })
    .catch((error) => console.log(error));
};

export const getSingleArticle = (id) => async (dispatch) => {
  await fetch(
    "https://pf-30b-backend-production.up.railway.app/articulo/" + id,
    { method: "GET" }
  )
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(insertDataDetails(data));
    });
};

export const getAllUser = () => async (dispatch) => {
  const resp = await fetch("https://pf-30b-backend-production.up.railway.app/users/getAll"); 
  const data = await resp.json();
  dispatch(getUsers(data))
};

export const getOneUser = (id) => async (dispatch) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/users/profile/${id}`); 
  const data = await resp.json();
  dispatch(getUser(data))
};

// Posts
export const postArticle = (item) => () => {
  fetch("https://pf-30b-backend-production.up.railway.app/articulo/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const despachar = (id) => {
  fetch(
    "https://pf-30b-backend-production.up.railway.app/orders/update/" + id,
    {
      method: "POST",
      body: JSON.stringify({ despachada: true }),
      headers: new Headers({ "content-type": "application/json" }),
    }
  ).then((res) => console.log(res));
};
