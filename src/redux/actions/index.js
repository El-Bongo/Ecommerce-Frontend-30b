import { getUser, getUsers } from "../slices/adminPanel";
import { getAllCateg, getAllData } from "../slices/articlesSlice";
import { insertDataDetails } from "../slices/detailSlice";

import { getAllArticlesReviews, getArticleReviews } from "../slices/reviewsSlice";
import { getWishes } from "../slices/favoriteSlice"
import { getAddressData } from "../slices/addressSlice";

// Gets

export const getAll = () => async (dispatch) => {
  await fetch("https://pf-30b-backend-production.up.railway.app/articulo/getall", { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(getAllData(data));
    });
};
export const getAllCategories = () => async (dispatch) => {
  await fetch("https://pf-30b-backend-production.up.railway.app/category/getall", { method: "GET" })
    .then(async (dataJson) => await dataJson.json())
    .then((data) => {
      dispatch(getAllCateg(data));
    })
    .catch((error) => console.log(error));
};

export const getSingleArticle = (id) => async (dispatch) => {
  await fetch("https://pf-30b-backend-production.up.railway.app/articulo/" + id, { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(insertDataDetails(data));
    });
};

export const getAllUser = () => async (dispatch) => {
  const resp = await fetch("https://pf-30b-backend-production.up.railway.app/users/getAll");
  const data = await resp.json();
  dispatch(getUsers(data));
};

export const getReviews = (id) => async (dispatch) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/review/reviews/` + id, { method: "GET" });
  const data = await resp.json();
  dispatch(getArticleReviews(data));
};

export const getAllReviews = () => async (dispatch) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/review/allreviews/`, { method: "GET" });
  const data = await resp.json();
  dispatch(getAllArticlesReviews(data));
};

export const getOneUser = (id) => async (dispatch) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/users/profile/${id}`);
  const data = await resp.json();
  dispatch(getUser(data));
}

export const getWishlist = (id) => async (dispatch) => {
  await fetch(`https://pf-30b-backend-production.up.railway.app/wishlist/user/${id}`, { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(getWishes(data));
    });
};

export const restoreArticle = async(id) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/articulo/restore/${id}`);
  const data = await resp.json();

  console.log(data)
};

export const restoreUsers = async(id) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/users/restoreProfile/${id}`);
  const data = await resp.json();

  console.log(data)
};


export const deleteReview = (id) => {
  fetch("https://pf-30b-backend-production.up.railway.app/review/delete/" + id, { 
    method: 'DELETE',
   })
  .then((res) => console.log(res));
};



// Posts
export const postArticle = (item) => () => {
  fetch("https://pf-30b-backend-production.up.railway.app/articulo/create", {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const createReview = (item) => () => {
  fetch("https://pf-30b-backend-production.up.railway.app/review/addReview", {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const editReview = (id, item) => async (dispatch) => {
  fetch(`https://pf-30b-backend-production.up.railway.app/review/reviews/edit/${id}`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const reportReview = (id, item) => async (dispatch) => {
  fetch(`https://pf-30b-backend-production.up.railway.app/review/reviews/report/${id}`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};

export const despachar = (id) => {
  fetch("https://pf-30b-backend-production.up.railway.app/orders/update/" + id, {
    method: "POST",
    body: JSON.stringify({ despachada: true }),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};


export const wishlistAssign = (data) => {
  fetch(`https://pf-30b-backend-production.up.railway.app/wishlist/assign`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({ "content-type": "application/json" }),
  }).then((res) => console.log(res));
};


//deletes

export const deleteFromWishlist = (id) => {
  fetch(`https://pf-30b-backend-production.up.railway.app/wishlist/delete/${id}`, {
    method: "DELETE",
  }).then((res) => console.log(res));
};

// Delete
export const deleteProduct = async (id) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/articulo/delete/${id}`,{
    method: "DELETE",
  });
  const data = await resp.json();

  console.log(data);
};

export const startDeleteUser = async (id) => {
  const resp = await fetch(`https://pf-30b-backend-production.up.railway.app/users/deleteProfile/${id}`,{
    method: "DELETE",
  });
  const data = await resp.json();

  console.log(data);
};



export const postAddress = (item) => () => {
  fetch("https://pf-30b-backend-production.up.railway.app/address/insert",{
    method: "POST",
    body: JSON.stringify(item),
    headers: new Headers({ "content-type": "application/json" }),
    }).then((res) => console.log(res))
};

export const getAddresses = () => async (dispatch) => {
  await fetch("https://pf-30b-backend-production.up.railway.app/address/getAddress", { method: "GET" })
    .then((dataJson) => dataJson.json())
    .then((data) => {
      dispatch(getAddressData(data));
    });
};
