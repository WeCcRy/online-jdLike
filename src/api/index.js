import requests from './request'
import MockRequest from "./MockRequest";

export const requestCategoryList=()=>requests({url:'product/getBaseCategoryList',method:'get'})

export const requestListContainer=()=>MockRequest({url:'/banner',method:'get'})

export const requestFloorList=()=>MockRequest({url:'/floor',method:'get'})

export const requestGetSearch=(params)=>requests({url:'/list',method:'post',data:params})

export const requsetDetail=(skuid)=>requests({url:`/item/${skuid}`,method:'get'})

export const requestShopcart=(skuid,skuNum)=>requests({url:`/cart/addToCart/${skuid}/${skuNum}`,method:'post'})

export const requestCartList=()=>requests({url:'/cart/cartList',method:'get'})