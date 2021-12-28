import {requsetDetail} from "../../api";

const state={
    goodDetail:{
        categoryView:{},
        skuInfo:{},
        spuSaleAttrList:{}
    }
}
const actions={
    async getDetail(context,skuid){
        let result=await requsetDetail(skuid)
        if(result.code==200){
            context.commit('GETDETAIL',result)
        }
    }
}
const mutations={
    GETDETAIL(state,goodDetail){
        state.goodDetail=goodDetail
    }
}
const getters={
    categoryView(state){
        return state.goodDetail.data.categoryView||{}
    },
    skuInfo(state){
        return state.goodDetail.data.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodDetail.data.spuSaleAttrList||[]
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}