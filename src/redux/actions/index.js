import { getAllCateg, getAllData } from "../slices/articlesSlice";
import { insertDataDetails } from "../slices/detailSlice";

// Gets

export const getAll = () => async (dispatch) =>{
  await fetch("https://pf-30b-backend.onrender.com/articulo/getall", { method: "GET" })
  .then((dataJson) => dataJson.json())
  .then((data) => {
    dispatch(getAllData(data));
  });
}
export const getAllCategories = () => async (dispatch) =>{
  await fetch("https://pf-30b-backend.onrender.com/category/getall", { method: "GET" })
  .then(async (dataJson) => await dataJson.json())
  .then((data) => {
    dispatch(getAllCateg(data))
  })
  .catch((error) => console.log(error))
}

export const getSingleArticle = (id) => async (dispatch) =>{
  await fetch("https://pf-30b-backend.onrender.com/articulo/" + id, { method: "GET" })
  .then((dataJson) => dataJson.json())
  .then((data) => {
    dispatch(insertDataDetails(data))
  });
}

// Posts
export const postArticle = (item) => () => {
  console.log(item)
  fetch("https://pf-30b-backend.onrender.com/articulo/createItem", {
      method: "POST",
      body: JSON.stringify(item),
      headers: new Headers({ "content-type": "application/json" }) 
  })
  .then((res) => console.log(res))
}
