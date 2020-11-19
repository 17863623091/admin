import {reqspecsList ,reqspecsTotal} from '../../utils/http'
const state = {
    list:[],
    size:2,
    page:1,
    total:0
}

const mutations = {
    changeList(state,arr){
        state.list=arr
    },
    changePage(state,page){
        state.page = page
    },
    changeTotal(state,total){
        state.total = total
    }

}

const actions={
    // 请求list
    reqList(context,bool){
        let parmas = bool?{}:{size:context.state.size,page:context.state.page}
        reqspecsList(parmas).then(res=>{
            let list = res.data.list?res.data.list:[]
            // 请求当前页数据，如果当前页中list没有数据了，则访问上一页数据
            if(list.length==0&&context.state.page>1){
                // commit  修改page的页码，使其访问上一页数据
                context.commit('changePage',context.state.page-1)
                // 访问数据
                context.dispatch('reqList')
                return
            }
            list.forEach(item=>{
                console.log(item)
                // 若使用stringify,则转变成["[\"20\"","\"22\"","\"24\"]"]
                item.attrs = JSON.parse(item.attrs)
                //  格式：["20", "22", "24"]
                console.log(item.attrs)
            })

            context.commit('changeList', list)
        })
        
    },
    // 请求总数
    reqTotal(context){
        reqspecsTotal().then(res=>{
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    // 修改页码
    changePage(context,page){
        context.commit('changePage',page)
        context.dispatch('reqList')
    }
}
const getters={
    list(state){
        return state.list
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
} 