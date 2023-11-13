<template>
    <div v-if="isScene1 == 'scene1'">
        <div class="zcss_container">
            <div class="zcss_header">
                资产搜索
            </div>
            <div class="zcss_body">
                <div class="zcss_item">
                    <div class="item_name">设备名称:</div>
                    <el-input style="width: 184px;height: 26px;" v-model="searchParams.equipName" placeholder="请输入设备名称" />
                </div>
                <div class="zcss_item">
                    <div class="item_name">设备类型:</div>
                    <el-select v-model="searchParams.equipTypeName" size="small" placeholder="请选择设备类型">
                        <el-option label="机柜" value="机柜" />
                        <el-option label="摄像头" value="摄像头" />
                        <el-option label="交换机" value="交换机" />
                        <el-option label="工作站" value="工作站" />
                        <el-option label="服务器" value="服务器" />
                        <el-option label="路由器" value="路由器" />
                        <el-option label="UPS" value="UPS" />
                        <el-option label="电池组" value="电池组" />
                        <el-option label="精密空调" value="精密空调" />
                        <el-option label="温湿计" value="温湿计" />
                        <el-option label="漏水" value="漏水" />
                        <el-option label="门禁" value="门禁" />
                        <el-option label="烟感" value="烟感" />
                        <el-option label="存储设备" value="存储设备" />
                    </el-select>
                </div>
                <div class="zcss_item">
                    <div class="item_name">设备状态:</div>
                    <el-select v-model="searchParams.equipStatus" size="small" placeholder="请选择设备状态">
                        <el-option label="运行" value="true" />
                        <el-option label="故障" value="false" />
                    </el-select>
                </div>
                <div class="zcss_item">
                    <div class="item_name">区域:</div>
                    <el-select v-model="searchParams.area" size="small" placeholder="请选择设备区域">
                        <el-option label="A区" value="A" />
                        <el-option label="B区" value="B" />
                        <el-option label="C区" value="C" />
                    </el-select>
                </div>
                <!-- <div class="zcss_item">
                <div class="item_name">负责人:</div>
                <el-select v-model="formData.device_master" size="small" placeholder=" ">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </div> -->
                <button class="btn qk" @click="clearSearchParams()">清空</button>
                <button class="btn tj" @click="deviceSearch()">搜索</button>
            </div>
        </div>
        <div class="search_result" v-if="zcssStatus">
            <div class="result_header">
                <div class="title">资产搜索</div>
                <div class="close" @click="zcssClose()"></div>
            </div>
            <div class="result_body">
                <el-scrollbar height="368px" always>
                    <el-tree :data="treeListData" node-key="$treeNodeId" :default-expanded-keys="[1, 10]" empty-text="暂无数据"
                        :default-expand-all="treeExpand" @node-click="nodeClick" />
                </el-scrollbar>
            </div>
        </div>
    </div>
    <!-- 返回 -->
    <div class="back" v-if="isScene1 == 'scene2'" @click="sceneBack()"></div>
    <!-- 设备详情弹窗 -->
    <DevicePop style="position: absolute;top: 25%;right: 15%;" v-if="tcStatus" @closePop="deviceClose">
    </DevicePop>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, reactive, onUnmounted, provide, onBeforeUnmount } from 'vue'
import { slelectHighLight, multiHighLight } from '@/core/highLight.js'
import { Color3, Vector3, } from '@babylonjs/core';
import { DeviceSearchPicker, devicePicker } from '@/core/picker.js'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { getTreeData } from '@/api/zichansousuo/index.js'
import { cameraFly, doorOpen, doorClose, deviceIn } from '@/core/animation.js'
import DevicePop from '@/components/devicePop/index.vue'
import { useRenderLoop } from '@/utils/switchScene.js'

export default defineComponent({
    components: {
        DevicePop
    },
    setup() {
        let isEntering = ref(false)
        let isLeaving = ref(false)

        // 从store中获取loaded
        const store = loadStore()
        const { loaded } = storeToRefs(store)

        let formData = reactive({
            device_name: '',
            device_type: '',
            device_status: '',
            device_master: ''
        })

        // const data = [
        //     {
        //         id: 1,
        //         label: '机柜A01',
        //         name: 'rack_a01',
        //         children: [
        //             {
        //                 id: 4,
        //                 label: 'Level two 1-1',
        //                 children: [
        //                     {
        //                         id: 9,
        //                         label: 'Level three 1-1-1',
        //                     },
        //                     {
        //                         id: 10,
        //                         label: 'Level three 1-1-2',
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        //     {
        //         id: 2,
        //         label: '机柜A02',
        //         name: 'rack_a02',
        //         children: [
        //             {
        //                 id: 5,
        //                 label: 'Level two 2-1',
        //             },
        //             {
        //                 id: 6,
        //                 label: 'Level two 2-2',
        //             },
        //         ],
        //     },
        //     {
        //         id: 3,
        //         label: '机柜A03',
        //         name: 'rack_a03',
        //         children: [
        //             {
        //                 id: 7,
        //                 label: 'Level two 3-1',
        //             },
        //             {
        //                 id: 8,
        //                 label: 'Level two 3-2',
        //             },
        //         ],
        //     }
        // ]



        // 接收父组件传递的场景
        let sceneObj = inject('scene')
        // console.log(sceneObj);

        // 树状结构表
        let treeListData = reactive([])
        // 获取树状表数据
        // async function treeData() {
        //     let res = await getTreeData()
        //     // console.log(res, '树状表');
        //     res.data.data.forEach(item => {
        //         treeListData.push(item)
        //     })
        // }

        // 搜索参数
        let searchParams = reactive({
            equipTypeName: '',
            equipName: '',
            equipStatus: '',
            area: '',
        })

        let treeExpand = ref(false)

        // 资产搜索弹窗
        let zcssStatus = ref(false)

        // 搜索方法
        async function deviceSearch() {
            // 清空树状表
            treeListData.length = 0
            zcssStatus.value = true
            let res = await getTreeData(searchParams)
            if (searchParams.equipTypeName != '' || searchParams.equipName != '' || searchParams.equipStatus != '') {
                treeExpand.value = true
            }
            res.data.data.forEach(item => {
                treeListData.push(item)
            })
        }

        function zcssClose() {
            zcssStatus.value = false
        }

        // 清空搜索条件
        function clearSearchParams() {
            searchParams.equipTypeName = ''
            searchParams.equipName = ''
            searchParams.equipStatus = ''
        }

        //弹窗 
        let tcStatus = ref(false)
        provide('tcStatus', tcStatus)

        // 当前场景
        let isScene1 = ref('scene1')

        // 场景返回按钮
        function sceneBack() {
            // 清除场景2高亮
            sceneObj.scene2.effectLayers[0].removeAllMeshes()
            if (currentOut.value != null) {
                // 模型推入
                deviceIn(currentOut.value)
            }
            // 清除机柜场景事件
            sceneObj.scene2.onPointerPick = null
            // 关门动画
            doorClose(sceneObj.scene2.cameras[0], sceneObj.scene2.getMeshByName('rack_door_1'), sceneObj, isScene1)
            //  关闭弹窗
            tcStatus.value = false
        }

        watch(isScene1, (newVal, oldVal) => {
            if (newVal == 'scene2') {
                // 开门动画
                // console.log('当前是scene2');
                devicePicker(sceneObj.scene2, tcStatus, currentOut)
                doorOpen(sceneObj.scene2.cameras[0], sceneObj.scene2.getMeshByName('rack_door_1'))
            } else {
                // console.log('当前是scene1');
            }
        })

        // 当前推出设备
        let currentOut = ref(null)

        // 设备弹窗关闭
        function deviceClose() {
            // 设备推入
            deviceIn(currentOut.value)
            // 清除高亮
            sceneObj.scene2.effectLayers[0].removeAllMeshes()
            // 关闭弹窗
            tcStatus.value = false
        }

        // 点击事件实例
        let instance = null

        // 树形节点点击事件
        async function nodeClick(data1, data2, data3, data4) {
            // 每次点击前清空高亮
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // console.log(data1);
            // console.log(data2);
            // 如果点击为模型节点
            if (data1.modelName) {
                // 点击机柜操作
                if (/^rack/.test(data1.modelName)) {
                    // 如果点击的节点名称是机柜则直接根据name定位模型
                    // console.log(data1.modelName);
                    let jiguiMesh = sceneObj.scene.getTransformNodeByName(data1.modelName)
                    jiguiMesh.getChildMeshes().forEach(item => {
                        // 点中设备高亮
                        multiHighLight(sceneObj.scene, item, new Color3(0, 0.902, 1))
                    })
                    // 获取机柜坐标
                    let jgPos = jiguiMesh.getHierarchyBoundingVectors().max.add(jiguiMesh.getHierarchyBoundingVectors().min).scale(0.5)
                    // console.log(jgPos);
                    cameraFly(sceneObj.camera, 60, jgPos, 0.3296, -0.0100, 0.7224)
                }
                // 点击精密空调操作
                else if (/^air/.test(data1.modelName)) {
                    // console.log('精密空调');
                    let jmkt = sceneObj.scene.getMeshByName(data1.modelName)
                    if (jmkt.name[4] <= 2) {
                        cameraFly(sceneObj.camera, 60, jmkt.absolutePosition, 0.6436, -1.5683, 0.7001)
                    } else if (jmkt.name[4] >= 3) {
                        cameraFly(sceneObj.camera, 60, jmkt.absolutePosition, 0.6436, 1.5683, 0.700)
                    }
                    slelectHighLight(sceneObj.scene, jmkt, new Color3(0, 0.902, 1))
                } else if (/^pdu_[a-z][0-9][0-9]_[ab]$/.test(data1.modelName)) {
                    let pdu = sceneObj.scene.getMeshByName(data1.modelName)
                    cameraFly(sceneObj.scene.cameras[0], 60, smoke.absolutePosition, 0.3296, -0.0100, 0.7224, func)
                    slelectHighLight(sceneObj.scene, pdu, new Color3(0, 0.902, 1))
                } else if (/^smoke_/.test(data1.modelName)) {
                    let smoke = sceneObj.scene.getMeshByName(data1.modelName)
                    cameraFly(sceneObj.scene.cameras[0], 60, smoke.absolutePosition, 0.3296, -0.0100, 0.7224, func)
                    slelectHighLight(sceneObj.scene, smoke, new Color3(0, 0.902, 1))
                }
            }

            // 如果点击的为非模型节点
            if (!data1.modelName) {
                // 如果类型为柜内设备
                if (data2.data.typeName == '柜内设备') {
                    //   获取父节点模型名称
                    let parentNode = data2.parent.data.modelName
                    let jiguiMesh = sceneObj.scene.getTransformNodeByName(parentNode)
                    jiguiMesh.getChildMeshes().forEach(item => {
                        // 点中设备高亮
                        multiHighLight(sceneObj.scene, item, new Color3(0, 0.902, 1))
                    })
                    // 获取机柜坐标
                    let jgPos = jiguiMesh.getHierarchyBoundingVectors().max.add(jiguiMesh.getHierarchyBoundingVectors().min).scale(0.5)
                    // console.log(jgPos);
                    cameraFly(sceneObj.camera, 60, jgPos, 0.3296, -0.0100, 0.7224)
                }
            }
        }

        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                if (loaded.value) {
                    // 显示设备
                    deviceDisplay(true)
                    // treeData()
                    // 如果渲染完毕加载ui,控制摄像机
                    instance = sceneObj.scene.onPointerObservable.add(DeviceSearchPicker(sceneObj, isScene1))
                    // setTimeout(() => {
                    //     isEntering.value = true
                    // }, 50)
                }
            }, { immediate: true })
        })

        // 设备显示隐藏操作
        function deviceDisplay(bool) {
            // 隐藏监控
            sceneObj.scene.transformNodes.find(item => item.name == 'monitor_group').setEnabled(bool)
            // 隐藏pdu
            sceneObj.scene.transformNodes.find(item => item.name == 'pdu_group').setEnabled(bool)
            // 隐藏管线
            sceneObj.scene.transformNodes.find(item => item.name == 'others_group').setEnabled(bool)
            // 隐藏烟感
            sceneObj.scene.transformNodes.find(item => item.name == 'smoke_group').setEnabled(bool)
            // 隐藏轨道相机
            sceneObj.scene.transformNodes.find(item => item.name == 'monitor_rail').setEnabled(bool)
        }




        // 离开页面前操作
        onBeforeUnmount(() => {
            //  清除scene1,scene2点击事件
            sceneObj.scene.onPointerObservable.remove(instance);
            sceneObj.scene2.onPointerPick = null
            // 清除高亮显示
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // 关闭弹窗
            tcStatus.value = false
            // 离开页面切换场景
            let engine = sceneObj.scene.getEngine();
            let { switchScene } = useRenderLoop(sceneObj.scene, engine)
            switchScene(sceneObj.scene)
            isScene1.value = 'scene1'
            // console.log(sceneObj.scene);
            // console.log(engine.activeRenderLoops, 'renderloop')
            // 清除scene2的设备模型
            sceneObj.scene2.meshes.filter(item => /^equip/.test(item.name)).forEach(item => {
                item.dispose()
            })
            // 隐藏设备
            deviceDisplay(false)
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            formData,
            // data,
            nodeClick,
            treeListData,
            deviceSearch,
            searchParams,
            clearSearchParams,
            treeExpand,
            sceneBack,
            isScene1,
            tcStatus,
            deviceClose,
            currentOut,
            zcssStatus,
            zcssClose
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
.zcss_container {
    width: 291px;
    height: 409px;
    position: absolute;
    top: 10%;
    left: 35px;
    background-color: rgba(5, 187, 187, 0.418);
    background: url('@/assets/images/zichansousuo/searchbox.png') no-repeat;

    .zcss_header {
        width: 88%;
        height: 31px;
        // background-color: #ffffff49;
        font-size: 14px;
        font-family: '思源';
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        letter-spacing: 1.68px;
        line-height: 32px;
        padding-left: 35px;
    }

    .zcss_body {
        width: 100%;
        height: 368px;
        // background-color: #ffffff6b;
        margin-top: 4px;
        position: relative;

        .zcss_item {
            width: 100%;
            height: 50px;
            // background-color: rgba(245, 207, 38, 0.411);
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .item_name {
                width: 60px;
                height: 100%;
                line-height: 50px;
                font-size: 14px;
                font-family: '思源';
                font-weight: 400;
                color: #97f6f6;
                text-align: right;
            }
        }

        .btn {
            width: 64px;
            height: 28px;
            border: none;
            background: url('@/assets/images/zichansousuo/btn.png') no-repeat;
            font-size: 14px;
            font-family: '思源';
            font-weight: 400;
            text-align: center;
            color: #97f6f6;
            line-height: 28px;
            position: absolute;
        }

        .qk {
            bottom: 20px;
            right: 110px
        }

        .tj {
            bottom: 20px;
            right: 20px
        }
    }
}

.search_result {
    width: 291px;
    height: 409px;
    position: absolute;
    top: 10%;
    left: 340px;
    background-color: rgba(5, 187, 187, 0.418);
    background: url('@/assets/images/zichansousuo/searchbox.png') no-repeat;

    .result_header {
        width: 100%;
        height: 31px;
        // background-color: #ffffff49;

        .title {
            float: left;
            width: 100px;
            height: 35px;
            font-size: 14px;
            font-family: '思源';
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            letter-spacing: 1.68px;
            line-height: 32px;
            padding-left: 35px;
        }

        .close {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            margin-top: 5px;
            background: url('@/assets/images/donglijiance/close.png') no-repeat;
            background-position: center;
            float: right;
            // background-color: rgba(250, 235, 215, 0.315);
            cursor: pointer;
        }
    }

    .result_body {
        width: 100%;
        height: 368px;
        // background-color: #ffffff6b;
        margin-top: 4px;
    }
}


.back {
    width: 40px;
    height: 40px;
    background: url('@/assets/images/zichansousuo/back.png') no-repeat;
    position: absolute;
    top: 100px;
    left: 50px;
    background-size: 100%;
    opacity: 0.5;
    cursor: pointer;
}



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