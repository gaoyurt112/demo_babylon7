<template>
    <div class="popOver total" style="top: 120px;left: 50%;" v-if="loaded">
        <div class="popOver_header">
            <div class="title">容量监测</div>
        </div>
        <div class="popOver_content">
            <div class="switchBtn">
                <div :class="btnStatus == 0 ? 'switchBtn_item active' : 'switchBtn_item'" @click="switchBtn(0)">
                    <div class="icon"><img src="@/assets/images/rongliangjiance/icon.png"></div>
                    <div class="content">U位统计</div>
                </div>
                <div :class="btnStatus == 1 ? 'switchBtn_item active' : 'switchBtn_item'" @click="switchBtn(1)">
                    <div class="icon"><img src="@/assets/images/rongliangjiance/icon.png"></div>
                    <div class="content">功率统计</div>
                </div>
            </div>
            <!-- U位统计 -->
            <div class="Uwei" v-if="btnStatus == 0">
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwtotal" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwtotal)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwtotal) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Uwtotal) }">U</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">总容量</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwyzy" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwyzy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwyzy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Uwyzy) }">U</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">已占用</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwsy" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwsy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwsy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Uwsy) }">U</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">剩余</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwlyl" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwlyl)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwlyl) }">54%</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">利用率</div>
                </div>
            </div>
            <!-- 功率统计 -->
            <div class="Gltj" v-if="btnStatus == 1">
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Gltotal" bg-ring-color="#ffffff30" :ring-color="progressColor(Gltotal)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Gltotal) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Gltotal) }">kWh</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">总功率</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Glyzy" bg-ring-color="#ffffff30" :ring-color="progressColor(Glyzy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Glyzy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Glyzy) }">kWh</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">已占用</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Glsy" bg-ring-color="#ffffff30" :ring-color="progressColor(Glsy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Glsy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Glsy) }">kWh</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">剩余</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Gllyl" bg-ring-color="#ffffff30" :ring-color="progressColor(Gllyl)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Gllyl) }">54%</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">利用率</div>
                </div>
            </div>
        </div>
    </div>

    <div class="popOver jigui" v-if="popData.popStatus" style="left: 82%;top: 35%;">
        <div class="popOver_header">
            <div class="title">{{ popData.title }}</div>
            <div class="close" @click="closePop()"></div>
        </div>
        <div class="popOver_content">
            <div class="switchBtn">
                <div :class="popData.popBtnStatus == 0 ? 'switchBtn_item active' : 'switchBtn_item'"
                    @click="popSwitchBtn(0)">
                    <div class="icon"><img src="@/assets/images/rongliangjiance/icon.png"></div>
                    <div class="content">U位统计</div>
                </div>
                <div :class="popData.popBtnStatus == 1 ? 'switchBtn_item active' : 'switchBtn_item'"
                    @click="popSwitchBtn(1)">
                    <div class="icon"><img src="@/assets/images/rongliangjiance/icon.png"></div>
                    <div class="content">功率统计</div>
                </div>
            </div>
            <!-- U位统计 -->
            <div class="Uwei" v-if="popData.popBtnStatus == 0">
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwtotal" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwtotal)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwtotal) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Uwtotal) }">U</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">总容量</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwyzy" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwyzy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwyzy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Uwyzy) }">U</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">已占用</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwsy" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwsy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwsy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Uwsy) }">U</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">剩余</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Uwlyl" bg-ring-color="#ffffff30" :ring-color="progressColor(Uwlyl)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Uwlyl) }">54%</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">利用率</div>
                </div>
            </div>
            <!-- 功率统计 -->
            <div class="Gltj" v-if="popData.popBtnStatus == 1">
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Gltotal" bg-ring-color="#ffffff30" :ring-color="progressColor(Gltotal)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Gltotal) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Gltotal) }">kWh</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">总功率</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Glyzy" bg-ring-color="#ffffff30" :ring-color="progressColor(Glyzy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Glyzy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Glyzy) }">kWh</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">已占用</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Glsy" bg-ring-color="#ffffff30" :ring-color="progressColor(Glsy)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Glsy) }">12345</div>
                                        <div class="dw" :style="{ color: progressColor(Glsy) }">kWh</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">剩余</div>
                </div>
                <div class="progress_item">
                    <div class="progress_box">
                        <div class="svg-module">
                            <div class="module-content">
                                <svg-line :rate="Gllyl" bg-ring-color="#ffffff30" :ring-color="progressColor(Gllyl)"
                                    :stroke-width="30" stroke-linecap="butt" :part="25" :part-gap="20">
                                    <div>
                                        <div class="num" :style="{ color: progressColor(Gllyl) }">54%</div>
                                    </div>
                                </svg-line>
                            </div>
                        </div>
                    </div>
                    <div class="title">利用率</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, computed, onBeforeUnmount, reactive } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
// 引入进度条
import SvgLine from "@/components/circleProgress/index.vue";
import { MeshBuilder, Color4, Vector3, TransformNode } from '@babylonjs/core';
import { transJigui } from '@/utils/material.js'
import { rljcPicker } from '@/core/picker.js'
import { cameraFly, meshGrowUp } from '@/core/animation.js'

export default defineComponent({
    components: {
        SvgLine
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
        // console.log(sceneObj);

        // 弹窗数据
        let popData = reactive({
            // 弹窗状态
            popStatus: false,
            // 弹窗按钮状态
            popBtnStatus: 0,
            // 标题
            title: ''
        })


        // 关闭弹窗
        const closePop = () => {
            // 关闭弹窗
            popData.popStatus = false
            // 容量监测相机
            cameraFly(sceneObj.camera, 120, new Vector3(0.093, 0.071, 0.054), 1.8593, 0.7100, 1.0613)
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
        }

        // 切换按钮状态
        let btnStatus = ref(0)


        // 按钮切换方法
        let switchBtn = (num) => {
            btnStatus.value = num
        }

        // 弹窗按钮切换方法
        let popSwitchBtn = (num) => {
            popData.popBtnStatus = num
        }

        // U位统计
        let Uwtotal = ref(0.2)
        let Uwyzy = ref(0.6)
        let Uwsy = ref(0.4)
        let Uwlyl = ref(0.88)


        // 功率统计
        let Gltotal = ref(0.4)
        let Glyzy = ref(0.2)
        let Glsy = ref(0.34)
        let Gllyl = ref(0.46)



        //进度条颜色
        let progressColor = computed(() => {
            return function (value) {
                if (value >= 0 && value <= 0.25) {
                    return '#3ef87b'
                } else if (value > 0.25 && value <= 0.5) {
                    return '#3ec1f8'
                } else if (value > 0.5 && value <= 0.75) {
                    return '#f8c63e'
                } else if (value > 0.75) {
                    return '#f85d3e'
                }
            }

        })

        let othersGroup;
        let pduGroup;
        let transJiguiGroup = null
        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                if (loaded.value) {
                    transJiguiGroup = new TransformNode('transJiguiGroup', sceneObj.scene)
                    othersGroup = sceneObj.scene.transformNodes.find(item => item.name == 'others_group')
                    pduGroup = sceneObj.scene.transformNodes.find(item => item.name == 'pdu_group')
                    // 创建容量数据组
                    createTransJigui()
                    cameraFly(sceneObj.camera, 120, new Vector3(0.093, 0.071, 0.054), 1.8593, 0.7100, 1.0613)
                    rljcPicker(sceneObj.scene, popData)
                    // setTimeout(() => {
                    //     isEntering.value = true
                    // }, 50)
                }
            }, { immediate: true })
        })


        // 记录所有机柜坐标
        let jiguiPosition = []
        let jgSize = null
        // 创建透明机柜transformnode方便销毁
        // 获取机柜尺寸和坐标，添加透明机柜并隐藏现有模型
        function createTransJigui() {
            othersGroup.getChildMeshes(false).forEach(item => {
                item.setEnabled(false)
            })
            pduGroup.getChildMeshes(false).forEach(item => {
                item.setEnabled(false)
            })
            // 获取机柜尺寸
            let jg = sceneObj.scene.transformNodes.find(item => item.name == 'rack_a01')
            // let jgSize = jg.getHierarchyBoundingVectors().max.subtract(jg.getHierarchyBoundingVectors().min).scale(0.1)
            jgSize = jg.getHierarchyBoundingVectors().max.subtract(jg.getHierarchyBoundingVectors().min)
            // console.log(jgSize, 'size');
            // 机柜透明材质
            let transJiguiMaterial = transJigui(sceneObj.scene)
            sceneObj.scene.transformNodes.forEach(item => {
                if (/^rack_[a-z][0-9][0-9]$/.test(item.name)) {
                    // 记录每个机柜坐标
                    let itemPosition = item.getHierarchyBoundingVectors().max.add(item.getHierarchyBoundingVectors().min).scale(0.5)
                    // 添加机柜信息到数组
                    jiguiPosition.push({ name: item.name, position: itemPosition })
                    // 1.隐藏所有机柜
                    item.setEnabled(false)
                    // 创建透明机柜mesh
                    let transparentJigui = new MeshBuilder.CreateBox(`${item.name}`, { width: jgSize.x, height: jgSize.y, depth: jgSize.z - 0.01 }, sceneObj.scene)
                    transparentJigui.position = itemPosition
                    transparentJigui.material = transJiguiMaterial
                    transparentJigui.enableEdgesRendering()
                    transparentJigui.edgesColor = new Color4(0.36, 0.36, 0.36, 0.5)
                    transparentJigui.edgesWidth = 0.2
                    // 置入透明机柜组
                    transparentJigui.setParent(transJiguiGroup)
                }
            })
            createRlBox()
        }



        function createRlBox() {
            let RlGroup = new TransformNode('rlGroup', sceneObj.scene)
            // 创建一个0-0.20373730635037646之间的随机数
            jiguiPosition.forEach(item => {
                const random = Math.random() * 100
                function getColor() {
                    if (random <= 25) {
                        return sceneObj.scene.getMaterialByName('greenMat')
                    } else if (random > 25 && random <= 50) {
                        return sceneObj.scene.getMaterialByName('blueMat')
                    } else if (random > 50 && random <= 75) {
                        return sceneObj.scene.getMaterialByName('yellowMat')
                    } else {
                        return sceneObj.scene.getMaterialByName('cyanMat')
                    }
                }
                // 创建容量块
                // let rlBox = new MeshBuilder.CreateBox(`${item.name}_rl`, { width: jgSize.x - 0.01, height: random - 0.001, depth: jgSize.z - 0.01 }, sceneObj.scene)
                let rlBox = new MeshBuilder.CreateBox(`${item.name}_rl`, { width: jgSize.x - 0.01, height: 0.002027, depth: jgSize.z - 0.011 }, sceneObj.scene)
                rlBox.position = new Vector3(item.position.x, -0.198, item.position.z)
                rlBox.material = getColor()
                rlBox.isPickable = false
                rlBox.setParent(RlGroup)
                // 设置轴心为-1/2高度
                // rlBox.setPivotPoint(new Vector3(0, -(random / 2), 0))
                rlBox.setPivotPoint(new Vector3(0, -0.001013, 0))
                // console.log(rlBox.getPivotPoint());
                meshGrowUp(rlBox, random)
            })
        }

        function createGlBox() {
            let GlGroup = new TransformNode('glGroup', sceneObj.scene)
            // 创建一个0-0.20373730635037646之间的随机数
            jiguiPosition.forEach(item => {
                const random = Math.random() * 100
                function getColor() {
                    if (random <= 25) {
                        return sceneObj.scene.getMaterialByName('greenMat')
                    } else if (random > 25 && random <= 50) {
                        return sceneObj.scene.getMaterialByName('blueMat')
                    } else if (random > 50 && random <= 75) {
                        return sceneObj.scene.getMaterialByName('yellowMat')
                    } else {
                        return sceneObj.scene.getMaterialByName('cyanMat')
                    }
                }
                // 创建容量块
                let glBox = new MeshBuilder.CreateBox(`${item.name}_gl`, { width: jgSize.x - 0.01, height: 0.002027, depth: jgSize.z - 0.011 }, sceneObj.scene)
                glBox.position = new Vector3(item.position.x, -0.198, item.position.z)
                glBox.material = getColor()
                glBox.isPickable = false
                glBox.setParent(GlGroup)
                glBox.setPivotPoint(new Vector3(0, -0.001013, 0))
                meshGrowUp(glBox, random)
            })
        }

        // 按钮切换
        watch(btnStatus, (newVal, oldVal) => {
            if (newVal == 1) {
                sceneObj.scene.getTransformNodeByName('rlGroup').dispose()
                createGlBox()
            } else if (newVal == 0) {
                sceneObj.scene.getTransformNodeByName('glGroup').dispose()
                createRlBox()
            }
        })






        // 离开页面前操作
        onBeforeUnmount(() => {
            // // 删除所有透明机柜和数据块
            transJiguiGroup.dispose()
            if (sceneObj.scene.getTransformNodeByName('rlGroup') != null) {
                sceneObj.scene.getTransformNodeByName('rlGroup').dispose()
            } else if (sceneObj.scene.getTransformNodeByName('glGroup') != null) {
                sceneObj.scene.getTransformNodeByName('glGroup').dispose()
            }
            // 恢复原有机柜
            sceneObj.scene.transformNodes.forEach(item => {
                if (/^rack_/.test(item.name)) {
                    item.setEnabled(true)
                }
            })
            // 删除透明机柜材质
            let tansMat = sceneObj.scene.getMaterialByName('jiguiTransMat')
            tansMat.dispose()
            othersGroup.getChildMeshes(false).forEach(item => {
                item.setEnabled(true)
            })
            pduGroup.getChildMeshes(false).forEach(item => {
                item.setEnabled(true)
            })
            // 解绑点击事件
            sceneObj.scene.onPointerPick = null
        })





        return {
            isEntering,
            isLeaving,
            loaded,
            closePop,
            btnStatus,
            switchBtn,
            Uwtotal,
            Uwyzy,
            Uwsy,
            Uwlyl,
            Gltotal,
            Glyzy,
            Glsy,
            Gllyl,
            progressColor,
            popSwitchBtn,
            popData
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
.popOver {
    width: 531px;
    height: 212px;
    background: url('@/assets/images/rongliangjiance/容量监测.png') no-repeat;
    position: absolute;

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

        // 关闭按钮
        .close {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            margin-top: 5px;
            background: url('@/assets/images/rongliangjiance/close.png') no-repeat;
            background-position: center;
            float: right;
            // background-color: rgba(250, 235, 215, 0.315);
            cursor: pointer;
        }
    }

    .popOver_content {
        width: 100%;
        height: 148px;
        // background-color: rgba(127, 255, 212, 0.356);
        margin-top: 4px;
        position: relative;

        // 切换按钮
        .switchBtn {
            position: absolute;
            top: 35px;
            left: 26px;

            .switchBtn_item {
                width: 115px;
                height: 24px;
                // background-color: #ffffff;
                border: 1px solid #9CFCFC;
                cursor: pointer;

                .icon {
                    float: left;
                    width: 24px;
                    height: 24px;
                    background-color: #3ef8f848;
                }

                .content {
                    font-size: 12px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #F3FAFF;
                }
            }

            .switchBtn_item:nth-child(1) {
                margin-bottom: 20px;
            }

            .active {
                border: 1px solid #3EF8F8;

                .content {
                    color: #3EF8F8 !important;
                }

            }
        }

        // U位统计
        .Uwei {
            height: 95px;
            width: 358px;
            // background-color: #ffffff4b;
            position: absolute;
            top: 23px;
            right: 15px;
            display: flex;
            justify-content: space-between;

            .progress_item {
                height: 100%;
                width: 76px;
                // background-color: #9CFCFC;

                // 进度条
                .progress_box {
                    width: 100%;
                    height: 76px;

                    // 进度条
                    .progress {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-content: space-around;
                        width: 100%;
                        height: 100%;
                        // background-color: #071727;
                        overflow: hidden;

                        .num,
                        .dw {
                            height: 15px;
                            color: #3EF8F8;
                            font-size: 12px;
                            font-family: '思源';
                            font-weight: 700;
                            text-align: center;
                            line-height: 15px;
                        }
                    }

                    .svg-module {
                        width: 100%;
                        height: 100%;
                    }



                    // .module-title::before,
                    // .module-title::after {
                    //     content: "";
                    //     position: absolute;
                    //     z-index: -1;
                    //     top: 0;
                    //     width: 50%;
                    //     height: 100%;
                    //     background-image: linear-gradient(to bottom, #061223, #042c4c);
                    // }

                    // .module-title::before {
                    //     left: 0;
                    //     transform: skew(-45deg);
                    //     transform-origin: left bottom;
                    // }

                    // .module-title::after {
                    //     right: 0;
                    //     transform: skew(45deg);
                    //     transform-origin: right bottom;
                    // }
                }

                .title {
                    font-size: 12px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #ffffff;
                    line-height: 24px;
                }
            }
        }

        .Gltj {
            height: 95px;
            width: 358px;
            // background-color: #ffffff4b;
            position: absolute;
            top: 23px;
            right: 15px;
            display: flex;
            justify-content: space-between;

            .progress_item {
                height: 100%;
                width: 76px;
                // background-color: #9CFCFC;

                // 进度条
                .progress_box {
                    width: 100%;
                    height: 76px;

                    // 进度条
                    .progress {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-content: space-around;
                        width: 100%;
                        height: 100%;
                        // background-color: #071727;
                        overflow: hidden;

                        .num,
                        .dw {
                            height: 15px;
                            color: #3EF8F8;
                            font-size: 12px;
                            font-family: '思源';
                            font-weight: 700;
                            text-align: center;
                            line-height: 15px;
                        }
                    }

                    .svg-module {
                        width: 100%;
                        height: 100%;
                    }



                    // .module-title::before,
                    // .module-title::after {
                    //     content: "";
                    //     position: absolute;
                    //     z-index: -1;
                    //     top: 0;
                    //     width: 50%;
                    //     height: 100%;
                    //     background-image: linear-gradient(to bottom, #061223, #042c4c);
                    // }

                    // .module-title::before {
                    //     left: 0;
                    //     transform: skew(-45deg);
                    //     transform-origin: left bottom;
                    // }

                    // .module-title::after {
                    //     right: 0;
                    //     transform: skew(45deg);
                    //     transform-origin: right bottom;
                    // }
                }

                .title {
                    font-size: 12px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #ffffff;
                    line-height: 24px;
                }
            }
        }
    }
}






// .leftq,
// .rightq {
//     position: absolute;
//     top: 50px;
//     width: 500px;
//     height: 400px;
//     background-color: rgba(0, 255, 255, 0.418);
//     transition: transform 0.5s ease-out;
// }


// .leftq {
//     left: 0;
//     transform: translateX(-100%);
// }

// .rightq {
//     right: 0;
//     transform: translateX(100%);
// }

// .slide-in {
//     transform: translateX(0);
// }

// .slide-out {
//     transform: translateX(100%);
// }

// .slide-out2 {
//     transform: translateX(-100%);
// }
</style>