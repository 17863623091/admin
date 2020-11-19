import {reqgoodsList,reqgoodsTotal} from '../../utils/http'

const state = {
    list:[],
    page:1,
    size:2,
    total:0
}

const mutations = {
    changeList(state,arr){
        state.list = arr
    },
    changeTotal(state,num){
        state.total = num 
    },
    changePage(state,page){
        state.page = page
    }
}

const actions={
    // 请求列表
    reqList(context){
        reqgoodsList({size:context.state.size,page:context.state.page}).then(res=>{
            console.log(res)
            let list = res.data.list?res.data.list:[]

            if(list.length===0&&context.state.page>1){
                context.commit('changePage', context.state.page-1)
                context.dispatch('reqList')
                return
            }
            context.commit('changeList',list)
        })
    },
    // 请求总数
    reqTotal(context){
        reqgoodsTotal().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 改变页码,重新获取当前页的数据
    changePage(context,page){
        context.commit('changePage',page)
        context.dispatch('reqList')
    }
}

const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}