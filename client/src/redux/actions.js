import axios from "axios";

export const SEARCH = "SEARCH";
export const SET_ERROR = "SET_ERROR";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const ADD_TO_CART = "ADD_TO_CART";
export const TOGGLE_SHOW_CART = "TOGGLE_SHOW_CART";

export const clearFilters = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS, payload: "" });
  };
};

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export const search = (name) => {
  return async function (dispatch) {
    try {
      let info = await axios.get(
        "http://localhost:3001/products/?name=" + name
      ); // ### RUTA PARA SOLICITAR EL GET
      return dispatch({
        type: SEARCH,
        payload: info.data,
      });
    } catch (error) {
      return "No pudimos encontrar ese producto";
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const allProducts = await axios.get("http://localhost:3001/products");
      dispatch({ type: GET_PRODUCTS, payload: allProducts.data });
    } catch (error) {
      alert("algo salió mal");
      console.log(error);
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const productById = await axios.get(
        `http://localhost:3001/products/${id}`
      );
      dispatch({ type: GET_PRODUCT_BY_ID, payload: productById.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterProducts = (day, categoryId) => {
  return async (dispatch) => {
    try {
      const filteredProducts = await axios.get(
        `http://localhost:3001/products?days=${day}&category=${categoryId}`
      );
      dispatch({ type: FILTERED_PRODUCTS, payload: filteredProducts.data });
    } catch (error) {
      dispatch({ type: FILTERED_PRODUCTS, payload: [] });
      console.log(error);
    }
  };
};

export const addCartProduct = (itemQuantity) => {
  return {
    type: ADD_TO_CART,
    payload: itemQuantity, 
  };
}

export const toggleShowCart = (show) => {
  return {
    type: TOGGLE_SHOW_CART,
    payload: show,
  };
};