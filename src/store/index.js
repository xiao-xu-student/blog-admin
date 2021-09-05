import Vue from "vue";
import VueX from "vuex";
import tab from "./tab";


Vue.use(VueX)

const store=new VueX.Store({
   modules:{
       tab
   }
})

export default store