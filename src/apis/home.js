import httpInstance from "@/utils/http";
import localInstance from "@/utils/local";

//获取banner
export function getBannerAPI(params = {}) {
    //默认为1，商品为2
    const { distributionSite = '1' } = params;
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}

//获取新鲜好物
export const findNewAPI = () => {
    return httpInstance({
        url: 'home/new'
    })
}

//获取人气推荐
export const findHotAPI = () => {
    return httpInstance({
        url: 'home/hot'
    })
}

//产品列表
export const getGoodsAPI = () => {
    return localInstance({
        url: '/api/categories-products'

    })
}