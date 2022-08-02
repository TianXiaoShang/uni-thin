const tokenKey = 'TOKEN';
const tokenTemporary = 'TOKENTEMPORARY';

const getToken = function() {
    const token = uni.getStorageSync(tokenKey);
    return token ? token : false;
}

const setToken = function(token) {
    uni.setStorageSync(tokenKey, token);
}
const setTokenTemporary = function(token) {
    uni.setStorageSync(tokenTemporary, token);
}

const clearToken = function() {
    uni.removeStorageSync(tokenKey);
}

const clearTokenTemporary = function() {
    uni.removeStorageSync(tokenTemporary);
}

export {
    getToken,
    setToken,
    clearToken,
    setTokenTemporary,
    clearTokenTemporary
};