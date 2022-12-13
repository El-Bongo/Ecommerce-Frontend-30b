import { getUser, getUsers } from "../slices/adminPanel";
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

export const getAllUser = () => async (dispatch) => {
  const resp = await fetch("http://localhost:3001/users/getAll");
  const data = await resp.json();
  dispatch(getUsers(data));
};

export const getOneUser = (id) => async (dispatch) => {
  const resp = await fetch(`http://localhost:3001/users/profile/${id}`);
  const data = await resp.json();
  dispatch(getUser(data));
};

export const restoreArticle = async(id) => {
  const resp = await fetch(`http://localhost:3001/articulo/restore/${id}`);
  const data = await resp.json();

  console.log(data)
};

// Posts
export const postArticle = (item) => () => {
  fetch("http://localhost:3001/articulo/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const createReview = (item) => () => {
  fetch("https://pf-30b-backend-production.up.railway.app/articulo/addReview", {
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

// Delete
export const deleteProduct = async (id) => {
  const resp = await fetch(`http://localhost:3001/articulo/delete/${id}`,{
    method: "DELETE",
  });
  const data = await resp.json();

  console.log(data);
};
