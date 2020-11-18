export const state={
    // vuex仓库中的token等用户信息，浏览器一刷新就没有了，{}代表用户信息没有了，要从本地存储获取
    user:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{}
}

export const mutations={
    changeUserInfo(state,obj){
        state.user = obj
        if(obj.token){
            sessionStorage.setItem('user',JSON.stringify(obj))
        }else{
            sessionStorage.removeItem('user')
        }
    }
}

export const getters={
    user(state){
        return state.user
    }
}