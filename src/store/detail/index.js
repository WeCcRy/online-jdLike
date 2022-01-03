import {requsetDetail,requestShopcart} from "../../api";
import {getUUID} from'../../utils/getUUID'
const state={
    goodDetail:{
        data:{
            categoryView:{},
            skuInfo:{},
            spuSaleAttrList:{}
        }
    },
    uuid_token:getUUID()
}
const actions={
    async getDetail(context,skuid){
        let result=await requsetDetail(skuid)
        if(result.code==200){
            context.commit('GETDETAIL',result)
        }
    },
    async addShopcart(context,{skuid,skuNum}){
        await requestShopcart(skuid,skuNum)
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