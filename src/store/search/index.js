import {requestGetSearch} from "../../api";

const actions={
    async getSearch(context,params={}){
        let result= await requestGetSearch(params)
        if(result.code==200){
            context.commit('GETSEARCH',result.data)
        }
    }
}

const mutations={
    GETSEARCH(state,searchList){
        state.searchList=searchList
    }
}

const state={
    searchList:{}
}

const getters={
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}