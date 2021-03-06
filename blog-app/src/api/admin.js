import axios from 'axios';
import {Message} from 'element-ui';


export const AdminLoginAPI = params => { return service.post('/login', params).then(res => res.data); };

// 文章列表接口
export const AdminArticleListAPI = (title, author, pageNumber, pageSize) => {
  return service.get('/article/list', {
    params: {
      title: title,
      author: author,
      pageNumber: pageNumber,
      pageSize: pageSize
    }
  });
};

// 更新文章接口
export const AdminArticleUpdateAPI = article => {return service.post('/article/update', article);};

// 删除文章接口
export const AdminArticleDeleteAPI = params => {return service.get('/article/delete', {params: params});};

// 批量删除文章接口
export const AdminArticleBatchDeleteAPI = params => { return service.get('/article/delete/batch', { params: params }); };


// 用户列表接口
export const AdminUserListAPI = params => {return service.get('/user/list', {params: params})};

// 添加用户接口
export const AdminUserAddAPI = user => {return service.post('/user/save', user)};

// 更新用户接口
export const AdminUserUpdateAPI = user => {return service.post('/user/update', user)};

// 删除用户接口
export const AdminUserDeleteAPI = params => {return service.get('/user/delete', {params: params})};

// 批量删除用户接口
export const AdminUserBatchDeleteAPI = params => { return service.get('/user/delete/batch', { params: params })};44


// 敏感词列表接口
export const AdminSensitiveWordListAPI = params => {return service.get('/sensitiveword/list', {params: params})};

// 添加敏感词接口
export const AdminSensitiveWordAddAPI = user => {return service.post('/sensitiveword/save', user)};

// 更新敏感词接口
export const AdminSensitiveWordUpdateAPI = user => {return service.post('/sensitiveword/update', user)};

// 删除敏感词接口
export const AdminSensitiveWordDeleteAPI = params => {return service.get('/sensitiveword/delete', {params: params})};

// 批量删除敏感词接口
export const AdminSensitiveWordBatchDeleteAPI = params => { return service.get('/sensitiveword/delete/batch', { params: params })};


// 分类列表接口
export const Admin_Category_List_API = params => {return service.get('/category/list', {params: params})};

// 添加分类接口
export const Admin_Category_Save_API = user => {return service.post('/category/save', user)};

// 更新分类接口
export const Admin_Category_Update_API = user => {return service.post('/category/update', user)};

// 删除分类接口
export const Admin_Category_Delete_API = params => {return service.get('/category/delete', {params: params})};

// 批量删除分类接口
export const Admin_Category_Batch_Delete_API = params => { return service.get('/category/delete/batch', { params: params })};


export const removeUser = params => { return service.get('/user/remove', { params: params }); };

export const batchRemoveUser = params => { return service.get('/user/batchremove', { params: params }); };

export const editUser = params => { return service.get('/user/edit', { params: params }); };

export const addUser = params => { return service.get('/user/add', { params: params }); };


const service = axios.create({
  baseURL: 'http://localhost:8888/admin',
  timeout: 100000
})

// request 拦截器
service.interceptors.request.use(config => {
  const token = sessionStorage.getItem("admin_user");
  if (token) {
    config.headers['Oauth-Token'] = token;
  }
  return config
}, error => {
  Promise.reject(error)
})


// respone 拦截器
service.interceptors.response.use(res => {

    const code = res.data.code;

    // 90001 Session 超时
    if (code === 90001) {
      Message({
        type: 'warning',
        showClose: true,
        message: '未登录或登录超时，请重新登录哦'
      })
      return Promise.reject('error');
    }

    //20001 用户未登录
    if (code === 20001) {
      Message({
        type: 'warning',
        showClose: true,
        message: '未登录或登录超时，请重新登录哦'
      })
      return Promise.reject('error');
    }

    //70001 权限认证错误
    if (code === 70001) {
      Message({
        type: 'warning',
        showClose: true,
        message: '你没有权限访问哦'
      })
      return Promise.reject('error');
    }

    return res;
  }
);
