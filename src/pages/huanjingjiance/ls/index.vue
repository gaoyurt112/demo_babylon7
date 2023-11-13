<template></template>

<script>
import { ref, onMounted, defineComponent, inject, watch, reactive, onBeforeUnmount } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { cameraFly } from '@/core/animation.js'
import { multiHighLight, multiSourceHighLight } from '@/core/highLight.js'
import { Color3, Vector3 } from '@babylonjs/core'
import { createWater } from '@/utils/GUI.js'

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
        // console.log(sceneObj)

        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                // console.log('监听到了', newValue, oldValue);
                if (loaded.value) {
                    cloneAir()
                    createWater(sceneObj.scene)
                    displayLs()

                    cameraFly(sceneObj.camera, 120, new Vector3(-0.01, 0.16, -0.07), 1.7245, -0.0050, 1.1213)
                }
            }, { immediate: true })
        })


        let lsData = reactive([
            {
                name: 'air_1',
                lsStatus: false
            },
            {
                name: 'air_2',
                lsStatus: true
            },
            {
                name: 'air_3',
                lsStatus: true
            },
            {
                name: 'air_4',
                lsStatus: false
            },
        ])



        // 创建精密空调clone对象
        function cloneAir() {
            // 遍历air并clone
            let airArr = sceneObj.scene.transformNodes.find(item => item.name == 'room_group')
            airArr.getChildMeshes(true).forEach(item => {
                if (/^air/.test(item.name)) {
                    // clone
                    let airClass = item.getClassName()
                    if (airClass == 'Mesh') {
                        let cloneMesh = item.clone(`${item.name}_clone`, null, true)
                        cloneMesh.parent = item.parent
                        cloneMesh.setEnabled(true)
                        item.setEnabled(false)
                    } else if (airClass == 'InstancedMesh') {
                        let cloneMesh = item.sourceMesh.clone(`${item.name}_clone`)
                        cloneMesh.position = item.position
                        cloneMesh.rotationQuaternion = item.rotationQuaternion
                        cloneMesh.parent = item.parent
                        cloneMesh.setEnabled(true)
                        item.setEnabled(false)
                    }
                }
            })
        }

        // 显示漏水信息
        function displayLs() {
            // 1.启用漏水信息mesh
            lsData.forEach(item => {
                // 获取漏水信息mesh
                let lsInfo = sceneObj.scene.getMeshByName(`${item.name}_clone_Plane`)
                // 显示漏水信息mesh
                lsInfo.setEnabled(true)
                lsInfo.renderingGroupId = 2
                // 获取漏水信息材质
                let lsTexture = sceneObj.scene.getTextureByName(`${item.name}_clone_lsTexture`)
                // 2.根据数据判断每一个漏水信息图片
                if (item.lsStatus) {
                    lsTexture.rootContainer.children[0].isVisible = false
                    lsTexture.rootContainer.children[1].isVisible = true
                    // 多个告警高亮
                    multiSourceHighLight(sceneObj.scene, lsInfo.parent, new Color3(1, 0, 0))
                } else if (item.lsStatus == false) {
                    lsTexture.rootContainer.children[0].isVisible = true
                    lsTexture.rootContainer.children[1].isVisible = false
                }
            })
        }

        // 监视漏水信息变化
        watch(lsData, (newValue, oldValue) => {
            // 1.清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // 2.重新获取漏水信息
            displayLs()
        })


        // 清除操作
        function restorOption() {
            lsData.forEach(item => {
                // 清除cloneMesh
                let lsClone = sceneObj.scene.getMeshByName(`${item.name}_clone`)
                lsClone.dispose()
                // 显示sourceMesh
                let sourceMesh = sceneObj.scene.getMeshByName(`${item.name}`)
                sourceMesh.setEnabled(true)
            })
        }


        // 页面离开重置页面操作
        onBeforeUnmount(() => {
            // 离开前隐藏漏水信息
            restorOption()
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            displayLs,
            restorOption,
            lsData
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