/*
 * Copyright 2024-2024 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios, {AxiosInstance} from "axios";


const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
});

request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const {url, params, headers} = config;
    if (!params) {
        config.params = {};
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && !url?.includes('/v1/user/login')) {
        config.url = '/v1/user/login';
    } else if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
        config.url = url?.includes('/v1/user/login') ? '/' : url;
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
    // 检查 isSuccess 字段
    if (response.data.isSuccess) {
        // 如果 isSuccess 为 true，返回 data 数据
        return response.data.data;
    } else {
        // 如果 isSuccess 为 false，抛出异常
        const error = new Error(response.data.message || '请求失败');
        return Promise.reject(error);
    }
}, function (error: Error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(error);
});

export default request;
