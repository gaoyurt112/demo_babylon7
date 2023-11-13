<template>
    <DevicePop style="position: absolute;top: 10%;left: 60%;" v-if="tcStatus" @closePop="deviceClose">
    </DevicePop>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, onBeforeUnmount, reactive, provide } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { smokeGui } from '@/utils/GUI.js'
import { multiHighLight } from '@/core/highLight.js'
import { Color3, Vector3 } from '@babylonjs/core'
import { cameraFly, highLight } from '@/core/animation.js'
import DevicePop from '@/components/devicePop/index.vue'
import { smokePicker } from '@/core/picker.js'

export default defineComponent({
    components: {
        DevicePop
    },
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

        // 烟感假数据
        let smokeData = reactive([
            {
                name: 'smoke_01',
                status: '正常'
            }, {
                name: 'smoke_02',
                status: '异常'
            }, {
                name: 'smoke_03',
                status: '异常'
            }
        ])

        // 弹窗
        let tcStatus = ref(false)
        provide('tcStatus', tcStatus)

        // 关闭弹窗
        function deviceClose() {
            tcStatus.value = false
            cameraFly(sceneObj.camera, 120, new Vector3(0.177, -0.227, 0.216), 3.0000, 0.7100, 0.5897)
            // 清除高亮
            // sceneObj.scene.effectLayers[0].removeAllMeshes()
        }



        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                if (loaded.value) {
                    // 初始化相机
                    cameraFly(sceneObj.camera, 120, new Vector3(0.177, -0.227, 0.216), 3.0000, 0.7100, 0.5897)
                    // 显示烟感
                    displaySmoke(true)
                    // 异常高亮
                    errorHighLight()
                    // 警示GUI
                    smokeGui(sceneObj.scene, smokeData)
                    // 拾取方法
                    smokePicker(sceneObj.scene, tcStatus)
                    // setTimeout(() => {
                    //     isEntering.value = true
                    // }, 50)
                }
            }, { immediate: true })
        })

        // 显示烟感
        function displaySmoke(bool) {
            sceneObj.scene.transformNodes.find(item => item.name == 'smoke_group').setEnabled(bool)
        }

        // 异常高亮定时器
        let interval = null
        // 异常高亮
        function errorHighLight() {
            let meshArr = []
            smokeData.forEach(item => {
                if (item.status == '异常') {
                    multiHighLight(sceneObj.scene, sceneObj.scene.getMeshByName(item.name), new Color3(1, 0, 0))
                    // 高亮闪烁
                    meshArr.push(sceneObj.scene.getMeshByName(`${item.name}_clone`))
                }
            })
            console.log(meshArr, '高亮');
            interval = highLight(meshArr, sceneObj.scene.effectLayers[0])
        }

        //  监听烟感数据变化，发生变化就重新渲染
        watch(smokeData, (newVal, oldVal) => {
            // 清空警示标志
            destoryTips()
            // 清除高亮闪烁定时器
            clearInterval(interval)
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // 再次渲染高亮和警示标识
            smokeGui(sceneObj.scene, smokeData)
            errorHighLight()
        })


        // 清除警示
        function destoryTips() {
            // 清除创建的guiplane
            if (sceneObj.scene.getMeshesById('smokeTips_Plane')) {
                // 清除警示标记mesh
                let tips = sceneObj.scene.getMeshesById('smokeTips_Plane')
                tips.forEach(item => {
                    item.dispose()
                })
                // 清除警示标记贴图
                sceneObj.scene.textures.filter(item => item.name == 'alarmTipsTexture').forEach(item => {
                    item.dispose()
                })
                // 清除警示标记材质
                sceneObj.scene.materials.filter(item => /^AdvancedDynamicTextureMaterial for smokeTips_Plane/.test(item.name)).forEach(item => {
                    // console.log(item);
                    item.dispose()
                })
            }
        }

        onBeforeUnmount(() => {
            // 隐藏烟感
            displaySmoke(false)
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // 清除警示
            destoryTips()
            // 关闭弹窗
            tcStatus.value = false
            // 清除定时器
            clearInterval(interval)
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            displaySmoke,
            deviceClose,
            tcStatus,
            smokeData
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
<style lang="scss" scoped>
/* .btn {
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
} */
</style>