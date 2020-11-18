import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { errorAlert } from './alert'
import Vue from 'vue'
import router from '../router'

// 导出ajax请求


// 开发环境
let baseUrl = '/aa'

// 上线模式
// let baseUrl =''


// 图片
Vue.prototype.$imgPre='http://localhost:3000'



// 请求拦截
axios.interceptors.request.use(req=>{
    if(req.url != baseUrl+'/api/userlogin'){
        req.headers.authorization = store.state.user.token
    }
    return req
})

// 设置响应拦截
axios.interceptors.response.use(res=>{
    console.log('请求的地址是',res.config.url)
    console.log(res)
    if(res.data.code != 200){
        errorAlert(res.data.msg)
    }


    if(res.data.msg === "登录已过期或访问权限受限"){
        errorAlert(res.data.msg)
        store.dispatch('changeUser', {})
        router.push('/login')
    }
    return res
})

export const reqMenuAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:qs.stringify(form)
    })
}


export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:'get',
        params:{
            istree:true
        }
    })
}
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}

export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:qs.stringify(form)
    })
}

// 角色列表请求
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get'
    })
}
// 角色添加请求
export const reqRoleAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 角色删除
export const reqRoleDel = (id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:{
            id:id
        }
    })
}
// 获取一条角色数据
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

// 角色修改
export const reqRoleUpdate=(form)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:qs.stringify(form)

    })
}

// 管理员请求列表
export const reqManageList=(data)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:data
    })
}
// 管理员添加
export const reqManageAdd=(form)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(form)
    })
}

// 管理员删除
export const reqManageDel=(uid)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:qs.stringify({
            uid:uid
        })
    })
}

// 管理员获取一条请求
export const reqManageDetail=(uid)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:{
            uid:uid
        }
    })
}

// 修改管理员
export const reqManageUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:'post',
        data:qs.stringify(form)
    })
}


// 获取总数
export const reqManageTotal=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get'
    })
}

// 管理员登录
export const reqManageLogin=(user)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:"post",
        data:qs.stringify(user)
    })
}


// 商品分类添加
export const reqcateAdd = (cate) => {

    let d = new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }

    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data:d
    })
}

// 商品分类请求列表
export const reqcateList=(p)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:p
    })
}
// 商品删除请求
export const reqcateDel=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}

// 商品分类获取详情
export const reqcateDetail=(id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

// 商品分类修改
export const reqcateUpdata=(cate)=>{
    let d = new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:d
    })
}

// 商品规格请求列表
export const reqspecsList=(data)=>{
    return axios({
        url:baseUrl+ '/api/specslist',
        method:'get',
        params:data
    })
}

// 商品规格添加
export const reqspecsAdd=(specs)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:qs.stringify(specs)
    })
}
// 商品规格删除
export const reqspecsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:qs.stringify({
            id:id
        })
    })
}

// 请求总数
export const reqspecsTotal = ()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get'
    })
}
// 商品规格请求一条数据
export const reqspecsDetail=(id)=>{
    return axios({
        url:'/api/specsinfo',
        method:'get',
        params:id
    })
}
