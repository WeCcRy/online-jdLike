import {requestCartList} from "../../api";

const state={
    cartList:[]
}
const actions={
    async getCartList(context){
        let result=await requestCartList()
        if(result.code==200){
            context.commit('GETCARTLIST',result.data)
        }
    }
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const getters={
    cartList(){
        return state.cartList[0]||{}
    },
    cartInfoList(){
        return state.cartList.cartInfoList||[]
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}