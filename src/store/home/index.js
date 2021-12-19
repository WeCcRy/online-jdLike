import {requestCategoryList,requestListContainer} from "../../api";
const state={
    categoryList:[],
    listContainer:[]
}
const actions={
    async getCategory(context){
        let result=await requestCategoryList()
        if(result.code===200){
            context.commit('CATEGORYLIST',result.data)
        }
    },
    async getBanner(context){
        let result =await requestListContainer()
        if(result.code===200){
            context.commit('ListContainer',result.data)
        }
    }
}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    ListContainer(state,listContainer){
        state.listContainer=listContainer
    }
}
const getters={}

export default {
    state,
    actions,
    mutations,
    getters
}