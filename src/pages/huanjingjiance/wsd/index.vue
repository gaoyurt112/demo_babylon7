<template></template>

<script>
import { ref, onMounted, defineComponent, inject, watch, onBeforeUnmount, reactive } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { cameraFly } from '@/core/animation.js'
import { getwsdData } from '@/api/huanjingjiance/wsd.js'
import { createTemper } from '@/utils/GUI.js'
import { Vector3 } from '@babylonjs/core'

export default defineComponent({
    setup() {
        let isEntering = ref(false)
        // console.log(isEntering.value);
        let isLeaving = ref(false)

        // 从store中获取loaded
        const store = loadStore()
        const { loaded } = storeToRefs(store)

        // 接收父组件传递的场景
        let sceneObj = inject('scene')
        // console.log(sceneObj);

        // 温湿度传感器默认数据
        let wsdData = reactive([
            {
                name: 'TH01',
                wd: '26.5',
                sd: '45',
                vector: { x: 0.6, y: 0.3, z: 0 }
            },
            {
                name: 'TH02',
                wd: '26.5',
                sd: '45',
                vector: { x: 0.8, y: 0.3, z: 0 }
            }
        ])

        //获取温度湿度数据
        async function getWsdData() {
            let res = await getwsdData()
            // console.log(res);
        }


        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                // 如果从其他页面进入
                if (loaded.value) {
                    // setInterval(() => {
                    // 获取温湿度数据
                    getWsdData()
                    // }, 3000)
                    // 创建温湿度gui
                    createTemper(sceneObj.scene, wsdData)
                    // setTimeout(() => {
                    //     isEntering.value = true
                    // }, 50)
                    // 温湿度页面相机
                    cameraFly(sceneObj.camera, 120, new Vector3(0.213, -0.056, 0.086), 1.3598, 0.7049, 0.9626)

                }
            }, { immediate: true })
        })


        // 清除该页面操作
        function destoryWsd() {
            // 清除温湿度模型
            sceneObj.scene.meshes.filter(item => /^wsd_/.test(item.name)).forEach(item => {
                item.dispose()
            })
            // 清除材质
            sceneObj.scene.materials.filter(item => /^AdvancedDynamicTextureMaterial for wsd/.test(item.name)).forEach(item => {
                // console.log(item);
                item.dispose()
            })
            // 清除贴图
            sceneObj.scene.textures.filter(item => item.name == 'wsdTexture').forEach(item => {
                item.dispose()
            })
        }


        // 页面离开时恢复材质
        onBeforeUnmount(() => {
            destoryWsd()
        })

        return {
            isEntering,
            isLeaving,
            loaded,
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