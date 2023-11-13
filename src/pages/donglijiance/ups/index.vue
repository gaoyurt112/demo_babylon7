<template>
    <!-- <div>
        <div class="leftq" :class="{ 'slide-in': isEntering, 'slide-out2': isLeaving }"></div>
        <div class="rightq" :class="{ 'slide-in': isEntering, 'slide-out': isLeaving }"></div>
    </div> -->
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'

export default defineComponent({
    setup() {
        let isEntering = ref(false)
        // console.log(isEntering.value);
        let isLeaving = ref(false)

        // 从store中获取loaded
        const store = loadStore()
        const { loaded } = storeToRefs(store)

        // 监听父组件传递的isLoading
        // let loaded = inject('loaded')

        // 接收父组件传递的场景
        let sceneObj = inject('scene')
        console.log(sceneObj);

        watch(loaded, (newValue, oldValue) => {
            console.log('监听到了', newValue, oldValue);
            if (newValue == true) {
                // 如果渲染完毕加载ui,控制摄像机
                setTimeout(() => {
                    isEntering.value = true
                }, 50)
            }
        })

        // let camera = sceneObj.camera
        // console.log(camera);
        // // 设置相机目标
        // camera.alpha = 0.7100
        // camera.beta = 0.5897
        // // camera.useAutoRotationBehavior = true


        onMounted(() => {
            console.log(isEntering.value, '路由进入了');
            if (!loaded.value) {
                return
            } else if (loaded.value) {
                setTimeout(() => {
                    isEntering.value = true
                }, 50)
            }

        })

        return {
            isEntering,
            isLeaving,
            loaded
        }
    },
    // 组件销毁前调用动画
    beforeRouteLeave(to, from, next) {
        // console.log('路由离开');
        // console.log(this.isLeaving);
        this.isEntering = false
        this.isLeaving = true
        // console.log(this.isLeaving);
        setTimeout(() => {
            next()
        }, 600)
    },
})
</script>
<style>
.btn {
    width: 60px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 150px;
    z-index: 999;
}

.leftq,
.rightq {
    position: absolute;
    top: 50px;
    width: 500px;
    height: 400px;
    background-color: rgba(0, 255, 255, 0.418);
    transition: transform 0.5s ease-out;
}


.leftq {
    left: 0;
    transform: translateX(-100%);
}

.rightq {
    right: 0;
    transform: translateX(100%);
}

.slide-in {
    transform: translateX(0);
}

.slide-out {
    transform: translateX(100%);
}

.slide-out2 {
    transform: translateX(-100%);
}
</style>