import {requestCategoryList,requestListContainer,requestFloorList} from "../../api";
const state={
    categoryList:[],
    listContainer:[],
    listFloor:[]
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
            context.commit('LISTCONTAINER',result.data)
        }
    },
    async getFloor(context){
        let result =await requestFloorList()
        if(result.code===200){
            context.commit('FLOORLIST',result.data)
        }
    }

}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    LISTCONTAINER(state,listContainer){
        state.listContainer=listContainer
    },
    FLOORLIST(state,listFloor){
        state.listFloor=listFloor
    }
}
const getters={}

export default {
    state,
    actions,
    mutations,
    getters
}