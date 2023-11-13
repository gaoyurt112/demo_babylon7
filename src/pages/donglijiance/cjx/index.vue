<template>
    <div class="popOver" v-if="popStatus">
        <div class="popOver_header">
            <div class="title">插接箱总体情况</div>
        </div>
        <div class="popOver_content">
            <div class="count">
                <div class="count_item total">98</div>
                <div class="count_item zy">90</div>
                <div class="count_item by">8</div>
            </div>
            <div class="fz">
                <div class="fz_item avg">9%</div>
                <div class="fz_item max">9%</div>
                <div class="fz_item min">9%</div>
            </div>
        </div>
    </div>
    <DevicePop style="position: absolute;top: 325px;left: 50%;transform: translateX(50%);" v-if="tcStatus"
        @closePop="deviceClose">
    </DevicePop>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, reactive, onBeforeUnmount, provide } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import DevicePop from '@/components/devicePop/index.vue'
// 引入相机动画
import { cameraFly } from '@/core/animation.js'
// 引入模型拾取函数
import { CjxPicker } from '@/core/picker'
import { Vector3, TransformNode } from '@babylonjs/core'


export default defineComponent({
    name: 'cjx',
    components: {
        DevicePop
    },
    setup() {
        // 页面进入离开状态
        let isEntering = ref(false)
        // console.log(isEntering.value);
        let isLeaving = ref(false)

        // 从store中获取loaded
        const store = loadStore()
        const { loaded } = storeToRefs(store)

        // 接收父组件传递的场景
        let sceneObj = inject('scene')
        // console.log(sceneObj, '插接箱');

        // 弹窗状态
        let popStatus = ref(false)

        // 弹窗状态默认不展示
        let tcStatus = ref(false)
        // 传递弹窗状态
        provide('tcStatus', tcStatus)

        // 插接箱假数据
        let cjxData = [{
            id: 'pdu_a01',
            value: 0.9
        },
        {
            id: 'pdu_a02',
            value: 0.8
        },
        {
            id: 'pdu_b03',
            value: 0.2
        },
        {
            id: 'pdu_c03',
            value: 0.3
        }
        ]

        // pdu数组
        let pduArr = reactive([])
        // pdu默认材质
        let pduDefaultMaterial = null

        onMounted(() => {
            // 监听页面进入
            watch(loaded, (newValue, oldValue) => {
                // 如果引擎已经渲染完毕
                if (loaded.value) {
                    sceneObj.scene.transformNodes.find(item => item.name == 'others_group').setEnabled(true)
                    // 相机动画
                    cameraFly(sceneObj.camera, 120, new Vector3(-0.01, 0.16, -0.07), 1.7245, -0.0050, 1.1213)
                    popStatus.value = true
                    // 获取插接箱组
                    let pduGroup = sceneObj.scene.transformNodes.find(item => item.name == 'pdu_group')
                    // 遍历插接箱组
                    pduArr = pduGroup.getChildMeshes()
                    // 获取默认材质
                    pduDefaultMaterial = sceneObj.scene.getMaterialById('VRayMtl1')
                    // 克隆pdu
                    clonePdu()
                    changeColor()
                    // 模型拾取
                    CjxPicker(sceneObj.scene, tcStatus)
                }
            }, { immediate: true })
        })




        // 进入页面先克隆所有的pud设备，隐藏pdu实例
        function clonePdu() {
            let pduClonArr = new TransformNode('pdu_cloneArr', sceneObj.scene)
            pduClonArr.scaling = new Vector3(10, 10, 10)
            let rootNode = sceneObj.scene.getMeshByName('__root__')
            // console.log(rootNode, 'hhhhhh');

            pduClonArr.parent = rootNode
            // 克隆当前pdu
            pduArr.forEach(pdu => {
                //    判断mesh和instancedmesh
                let pduClass = pdu.getClassName()
                if (pduClass == 'Mesh') {
                    // console.log('Mesh');
                    let cloneMesh = pdu.clone(`${pdu.name}_clone`)
                    cloneMesh.position = pdu.position
                    cloneMesh.parent = pduClonArr
                } else if (pduClass == 'InstancedMesh') {
                    // console.log('InstancedMesh');
                    // 克隆source
                    let cloneMesh = pdu.sourceMesh.clone(`${pdu.name}_clone`)
                    cloneMesh.position = pdu.position
                    cloneMesh.parent = pduClonArr
                }
            })
        }



        // 修改插接箱颜色
        function changeColor() {
            // 隐藏源mesh
            let pdu_arr = sceneObj.scene.transformNodes.find(item => item.name == 'pdu_group')
            pdu_arr.setEnabled(false)

            let pdu_cloneArr = sceneObj.scene.transformNodes.find(item => item.name == 'pdu_cloneArr')
            // 遍历数据
            cjxData.forEach(item => {
                // 遍历模型
                pdu_cloneArr.getChildMeshes().forEach(pdu => {
                    // console.log(pdu);
                    // console.log(item);
                    let regex = new RegExp(`^${item.id}_[ab]_clone`)
                    // 如果模型名称前7位等于数据id，匹配对应的模型名称_a和_b
                    if (regex.test(pdu.name)) {
                        // console.log(pdu, '满足');
                        // 修改材质颜色
                        if (item.value > 0 && item.value <= 0.25) {
                            pdu.material = sceneObj.scene.getMaterialByName('greenMat')
                        } else if (item.value > 0.25 && item.value <= 0.5) {
                            pdu.material = sceneObj.scene.getMaterialByName('blueMat')
                        } else if (item.value > 0.5 && item.value <= 0.75) {
                            pdu.material = sceneObj.scene.getMaterialByName('yellowMat')
                        } else if (item.value > 0.75 && item.value <= 1) {
                            pdu.material = sceneObj.scene.getMaterialByName('cyanMat')
                        }
                    }
                })
            })
        }


        // 恢复默认材质
        function resetMaterial(pduArr) {
            pduArr.forEach(pdu => {
                if (pdu.id.length === 9) {
                    pdu.material = pduDefaultMaterial
                }
            })
        }


        // 关闭弹窗
        function deviceClose() {
            tcStatus.value = false
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // 相机恢复初始
            cameraFly(sceneObj.camera, 120, new Vector3(-0.01, 0.16, -0.07), 1.7245, -0.0050, 1.1213)
        }


        // 页面离开时恢复材质
        onBeforeUnmount(() => {
            // 重置材质
            resetMaterial(pduArr)
            // 解绑模型点击事件
            sceneObj.scene.onPointerPick = null
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            tcStatus.value = false
            // 页面离开
            // 清除,显示隐藏模型
            sceneObj.scene.transformNodes.find(item => item.name == 'pdu_cloneArr').dispose()
            sceneObj.scene.transformNodes.find(item => item.name == 'pdu_group').setEnabled(false)
            sceneObj.scene.transformNodes.find(item => item.name == 'others_group').setEnabled(false)
        })


        return {
            isEntering,
            isLeaving,
            loaded,
            popStatus,
            cjxData,
            pduArr,
            tcStatus,
            deviceClose,
        }
    },

    // 组件销毁前调用动画
    beforeRouteLeave(to, from, next) {
        this.isEntering = false
        this.isLeaving = true
        setTimeout(() => {
            next()
        }, 600)
    },
})
</script>
<style lang="scss" scoped>
.popOver {
    width: 531px;
    height: 212px;
    background: url('@/assets/images/donglijiance/弹窗.png') no-repeat;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);

    .popOver_header {
        width: 100%;
        height: 31px;
        // background-color: rgba(240, 248, 255, 0.342);

        // 标题
        .title {
            float: left;
            font-size: 14px;
            font-family: '思源';
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            letter-spacing: 1.68px;
            line-height: 34px;
            margin-left: 35px;
        }

    }

    .popOver_content {
        width: 100%;
        height: 148px;
        // background-color: rgba(127, 255, 212, 0.356);
        margin-top: 4px;
        position: relative;

        .count {
            position: absolute;
            top: 45px;
            left: 56px;
            height: 20px;
            width: 270px;
            display: flex;
            justify-content: space-between;

            // background-color: #ffffff;
            .count_item {
                width: 35px;
                height: 100%;
                // background-color: aqua;
                line-height: 20px;
                font-size: 16px;
                font-family: '思源';
                font-weight: 400;
                text-align: center;
                color: #00ceed;
            }
        }

        .fz {
            width: 40px;
            height: 103px;
            // background-color: rgba(255, 255, 255, 0.3647058824);
            position: absolute;
            right: 39px;
            top: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .fz_item {
                width: 100%;
                height: 20px;
                font-size: 16px;
                font-family: '思源';
                font-weight: 400;
                text-align: right;
                color: #eef5ff;
                line-height: 20px;
            }
        }

    }
}












/* .leftq,
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