import axios from 'axios';
import env from '../../config/dev.env';

export const baseURL = env === 'development'
    ? 'market/'
    : env === 'production'
        ? '/market/'
        : '/market/';
const http = axios;
const qs = require('qs');
http.defaults.baseURL = baseURL;
// http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 返回状态判断(添加响应拦截器)
http.interceptors.response.use((res) => {
    // // 对响应数据做些事
    if (res.data.serviceResult === 1) {
        return res.data;
    } else if (res.data.serviceResult === 2) {
        _this.$message.warning(res.data.resultInfo);
        return Promise.reject(res);
    }
    else if (res.data.serviceResult === 4) {
        _this.$message.warning(res.data.resultInfo);
        _this.$router.push({ name: 'login' });
        return Promise.reject(res);
    }
    // } else if (res.data.serviceResult === 2) {
    //     //     _this.$Notice.error({
    //     //         title: '失败',
    //     //         desc: '请检查表单是否填写正确'
    //     //     });
    // } else if (res.data.serviceResult === 2) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '请检查表单是否填写正确'
    //     });
    //     return Promise.reject(res);
    // } else if (res.data.serviceResult === 102) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '账号不存在'
    //     });
    // } else if (res.data.serviceResult === 103) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '密码不正确'
    //     });
    // } else if (res.data.serviceResult === 104) {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '命名重复'
    //     });
    // } else {
    //     _this.$Notice.error({
    //         title: '失败',
    //         desc: '系统繁忙,请稍后重试'
    //     });
    // }
    return Promise.reject(res);
}, (error) => {
    _this.$message.error('系统繁忙,请稍后重试');
    return Promise.reject(error);
});

// init
let _this = null;
export const init = (vm) => { _this = vm; };

// user
export const register = (data, options) => http.post('user/register.do', data, options);
export const login = (data, options) => http.post('user/login.do', data, options);
export const logout = (data, options) => http.post('user/logout.do', data, options);
export const getUserInfo = (options) => http.post('user/getUserInfo.do', options);
export const updatePassword = (data, options) => http.post('user/updatePassword.do', data, options);
export const updatePhone = (data, options) => http.post('user/updatePhone.do', data, options);
export const updateInformation = (data, options) => http.post('user/updateInformation.do', data, options);

// classify
export const getAllClassify = (options) => http.post('classify/getAllClassify.do', options);

// good
export const addGood = (data, options) => http.post('good/user/addGood.do', data, options);
export const updateGood = (data, options) => http.post('good/user/updateGood.do', data, options);
export const deleteGood = (data, options) => http.post('good/user/deleteGood.do', data, options);
export const getGoodByPage = (data, options) => http.post('good/user/getGoodByPage.do', data, options);
export const getGoodById = (data, options) => http.post('good/getGoodById.do', data, options);
export const getPageGoodByClassify = (data, options) => http.post('good/getPageGoodByClassify.do', data, options);
export const getUserOtherGood = (data, options) => http.post('good/getUserOtherGood.do', data, options);
export const uploadGoodImage = (data, options) => http.post('good/user/uploadGoodImage.do', data, options);

// order
export const addOrder = (data, options) => http.post('order/user/addOrder.do', data, options);
export const getPageOrderByBuyUserId = (data, options) => http.post('order/user/getPageOrderByBuyUserId.do', data, options);
export const getPageOrderBySoldUserId = (data, options) => http.post('order/user/getPageOrderBySoldUserId.do', data, options);
export const getPayUrl = (data, options) => http.post('order/user/getPayUrl.do', data, options);
export const deliver = (data, options) => http.post('order/user/deliver.do', data, options);
export const receipt = (data, options) => http.post('order/user/receipt.do', data, options);

// message
export const sendMessage = (data, options) => http.post('message/user/sendMessage.do', data, options);
export const readMessage = (data, options) => http.post('message/user/readMessage.do', data, options);
export const getMessageByPage = (data, options) => http.post('message/user/getPageMessageListByToUser.do', data, options);
export const getMessageById = (data, options) => http.post('message/user/getMessageById.do', data, options);
export const deleteMessage = (data, options) => http.post('message/user/deleteMessage.do', data, options);
