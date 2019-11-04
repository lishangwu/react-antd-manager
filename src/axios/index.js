import JsonP from 'jsonp'
import axios from 'axios'
import { Modal, message } from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        // let baseApi = 'https://www.easy-mock.com/mock/5d6c185d3efa773f8b0bf8e0/mockapi'
        // let baseApi_imooc = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        // if(options.cu){
        //     baseApi = baseApi_imooc
        //     message.warning('改变url :' + options.cu)
        // }
        // let baseApi = 'http://localhost:3001/reactmanager'
        let baseApi = 'http://47.93.97.5:3002/reactmanager'
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    let res = response.data;
                    if (res.code == '0'){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}