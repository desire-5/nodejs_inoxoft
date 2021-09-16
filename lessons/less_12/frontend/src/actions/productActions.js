import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
    PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, 
    PRODUCT_SAVE_FAIL, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_REQUEST,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL
} from "../constants/productConstatnts";
import Axios from "axios";

//thunk
const listProducts = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await Axios.get('/products/');
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data});    
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL, payload:error.message});  
    }
}
const detailsProduct = (productId) => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAIL_REQUEST,payload:productId})
        const {data} = await Axios.get('/products/'+ productId);
        dispatch({type:PRODUCT_DETAIL_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:PRODUCT_DETAIL_FAIL, payload:error.message});
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
//TO DO api
}

const deleteProduct=(productId) => async (dispatch, useState) => {
   //TO DO api
    
}
export {listProducts, detailsProduct, saveProduct, deleteProduct}