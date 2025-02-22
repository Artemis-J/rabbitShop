//axios基础封装
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import router from '@/router';

const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// 添加请求拦截器(统一控制)
httpInstance.interceptors.request.use(function (config) {
    // 1.从pinia获取token数据
    const userStore = useUserStore();
    // 2.按照后端的要求拼接token数据
    const token = userStore.userInfo.token;
    console.log(token);
    
    if(token){
      config.headers.Authorization = `Bearer ${token}`;//模板照写，一点不能错
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器,统一错误提示
httpInstance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const userStore = useUserStore();
    ElMessage({
      type:'warning',
      message:error.response.data.message
    })
    // 401token失效处理
    if(error.response.status === 401){
      userStore.clearUserInfo();
      router.push('/login');
    }
    return Promise.reject(error);
  });

  export default httpInstance;

 