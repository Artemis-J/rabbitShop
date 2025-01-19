import httpInstance from "@/utils/http";

/*获取商品详情*/
export const getDetail = (id)=>{
    return httpInstance({
        url:'/goods',
        params:{
            id
        }
    })
}

export const getHotGoodsAPI = ({id,type,limit =3})=>{
    return httpInstance({
        url: '/goods/hot',
        params:{
            id,
            type,
            limit
        }
    })
}