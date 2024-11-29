//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    //懒加载指令逻辑
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) { //元素插入到DOM之后调用
                //el:指令绑定的那个元素 img
                //binding：binding.value  指令等于号后面绑定的表达式的值  图片url
                console.log(el, binding.value);
                const baseUrl = "http://localhost:8080/img/"
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        console.log(isIntersecting);

                        if (isIntersecting) {
                            //进入视口区域，给src赋值
                            el.src = `${baseUrl}${binding.value}`;
                            stop();
                        }
                    },
                )

            }
        })
    }
}