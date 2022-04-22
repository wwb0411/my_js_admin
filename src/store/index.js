//导入方法
import {createStore} from "vuex";
import VuexPersist from "vuex-persist";//导入持久化

const vuexLocal = new VuexPersist({
    storage: window.localStorage,//定义本地存储的路径数据
})


export default createStore({
    state:{

    },
    mutations:{

    },
    getters:{

    },
    plugins:[vuexLocal.plugin],
})