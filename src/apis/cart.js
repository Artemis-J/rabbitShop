// 封装购物车相关接口
import httpInstance from "@/utils/http";

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return httpInstance({
        url: '/member/cart',
        method: 'GET',
        data: {
            skuId,
            count
        }
    })
}

export const findNewCartListAPI = () => {
    return httpInstance({
        url: '/member/cart'
    })
}