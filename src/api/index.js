import requests from './request'
import MockRequest from "./MockRequest";

export const requestCategoryList=()=>requests({url:'product/getBaseCategoryList',method:'get'})

export const requestListContainer=()=>MockRequest({url:'/banner',method:'get'})