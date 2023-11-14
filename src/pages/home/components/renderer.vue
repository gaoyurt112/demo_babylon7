<template>
    <!-- <button class="btn" v-show="false">切换场景</button> -->
    <!-- <button class="btn" v-show="true" @click="player()">切换第一人称</button> -->
    <canvas id="renderCanvas" ref="canvas"></canvas>
    <router-view></router-view>
</template>
       
<script setup>
import { onMounted, ref, watch, provide, computed } from 'vue'
import { createScene, ArcCamera, HemisLight, freeCamera, ArcCamera2, DirectionLight } from '@/core/engine';
import { loadModel } from '@/core/loader';
// 引入拾取器
// import { Picker } from '@/core/picker'
import { Vector3, Color3, AxesViewer, TransformNode, HighlightLayer, MeshBuilder, PBRMaterial, SceneLoader, SceneSerializer, StandardMaterial, Texture } from "@babylonjs/core"
import { Inspector } from '@babylonjs/inspector';
import { debounce } from 'lodash'
// 路由
import { useRouter, useRoute } from 'vue-router';
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
// 引入材质js
import { createWallMat, createMainBusAMat, createMainBusBMat, createDoorMat, createGreenMat, createBlueMat, createYellowMat, createCyanMat } from '@/utils/material.js'
// 引入mitt
import emitter from '@/utils/eventBus.js'
// 引入lottie动画
import { LottieTexture } from "babylonjs-lottie"
// 引入温湿度
import { createTemper, createWater } from '@/utils/GUI.js'

// 引入api
import { homeData } from '@/api/home.js'

import { useRenderLoop } from '@/utils/switchScene.js'

import basePng from '@/assets/images/底图.png'


const store = loadStore()
const { loaded } = storeToRefs(store)

const router = useRouter()

// 渲染器
let canvas = ref(null);
// 机房场景
let scene1 = null
// 机柜场景
let scene2 = null
// 机房相机
let camera1 = null
// 机柜相机
let camera2 = null

let playerCamera = null

let sceneObj = {
    scene: null,
    scene2: null,
    camera: null,
}

let isLoaded = ref(false)

provide('scene', sceneObj)
provide('loaded', isLoaded)


// provide('机柜场景', scene2)
// provide('机房相机', camera1)

onMounted(async () => {
    if (canvas.value !== null) {
        // 创建场景
        const myScene = await createScene(canvas.value);
        console.log(myScene);
        /**    机房场景     */
        // 机房场景
        scene1 = myScene[0]
        sceneObj.scene = scene1
        // 场景1背景颜色
        scene1.clearColor = new Color3(0.15, 0.15, 0.15)

        // 相机
        camera1 = await ArcCamera(scene1);
        sceneObj.camera = camera1

        // 第一人称相机
        // playerCamera = await freeCamera(scene1)



        // 机柜场景
        scene2 = myScene[1]
        sceneObj.scene2 = scene2
        // 相机
        camera2 = await ArcCamera2(scene2);
        // 灯光
        await HemisLight(scene2, 3)
        scene2.clearColor = new Color3(0.32, 0.32, 0.32)

        // 判断是否完全渲染完毕,渲染完毕后跳转路由至第一个组件，解决模型加载过慢导致其他组件获取不到scene
        scene1.executeWhenReady(e => {
            scene1.onAfterRenderObservable.addOnce(e => {
                // 渲染后
                console.log('渲染完毕');
                // 路由跳转
                // router.push('/blue')
                isLoaded.value = true
                loaded.value = true
                // 传递场景给layout组件
                emitter.emit('scene', sceneObj)
            })
        })

        // 加载机房场景模型
        const mods = await loadModel('', '/mods/', 'room7.glb', scene1)
        mods.meshes[0].scaling = new Vector3(-0.1, 0.1, 0.1)

        let baseGroundMaterial = new StandardMaterial("groundMat", scene1)
        baseGroundMaterial.diffuseTexture = new Texture(basePng, scene1);
        baseGroundMaterial.diffuseTexture.uScale = 140
        baseGroundMaterial.diffuseTexture.vScale = 180

        // 创建一个ground
        let baseGround = new MeshBuilder.CreateGround('baseGround', { width: 100, height: 100 }, scene1)
        baseGround.position.y = -0.213
        baseGround.material = baseGroundMaterial

        // 灯光
        await HemisLight(scene1, 0.25)
        await DirectionLight(scene1)

        // 机柜场景模型
        const mods2 = await loadModel('', '/mods/', '机柜.glb', scene2)
        // console.log(mods2, 'mods2');
        mods2.meshes[0].scaling = new Vector3(25, 25, 25)
        mods2.meshes[2].rotationQuaternion = null
        mods2.meshes[2].rotation.x = Math.PI / 2
        mods2.meshes.forEach(item => {
            item.isPickable = false
        })


        // 监察器
        Inspector.Show(scene1, { globalRoot: document.body })
        // 坐标辅助
        // const axis = new AxesViewer(scene2, 1)
        // 创建高亮图层
        const hl = new HighlightLayer('hl1', scene1)
        const hl2 = new HighlightLayer('hl2', scene2)

        hl.renderingGroupId = 0 //调整渲染层级
        hl.blurHorizontalSize = 0.5;
        hl.blurVerticalSize = 0.5;
        // wallGroup.getChildMeshes(false).forEach(item => {
        //     hl.addExcludedMesh(sphere)
        // })






        // let lottieGround = new MeshBuilder.CreateGround('base', { width: 2.5, height: 2.5 }, scene1)
        // lottieGround.position.y = -0.01

        // // 创建lottie动画材质
        // let groundMaterial = new PBRMaterial('groundMaterial', scene1)
        // let lottieTexture = await LottieTexture.LoadFromUrlAsync("name", "/lottie/animation_llq0owiq.json", scene1, {} /*option*/)
        // groundMaterial.albedoTexture = lottieTexture
        // lottieGround.material = groundMaterial
        // groundMaterial.unlit = true

        // 材质
        let wallMat = createWallMat(scene1)
        let doorMat = createDoorMat(scene1)
        createGreenMat(scene1)
        createBlueMat(scene1)
        createYellowMat(scene1)
        createCyanMat(scene1)


        // 获取灯pbr材质
        let lightMaterial = scene1.getMaterialByName('phong2')
        let lightAlarmMaterial = lightMaterial.clone()
        lightAlarmMaterial.name = 'phong2_alarm'
        lightAlarmMaterial.albedoColor = new Color3(0.949, 0.055, 0.055)
        lightAlarmMaterial.emissiveColor = new Color3(0.949, 0.055, 0.055)

        // 场景2机柜材质透明模式修改
        let sceneJIguiMat = scene2.getMaterialByName('blinn3')
        sceneJIguiMat.transparencyMode = PBRMaterial.MATERIAL_ALPHATEST


        /**模型分类**/
        // 墙体
        let wallGroup = new TransformNode('wall', scene1)
        // 地面
        let groundGroup = new TransformNode('ground', scene1)

        // 门
        let doorGroup = new TransformNode('door', scene1)
        mods.meshes.forEach(item => {
            if (item.name.substring(0, 4) == 'wall') {
                item.setParent(wallGroup)
                item.isPickable = false //取消可选
                item.checkCollisions = true;
                // hl.addExcludedMesh(item)
            }
            if (item.name.substring(0, 6) == 'ground') {
                item.setParent(groundGroup)
                item.isPickable = false //取消可选
                item.checkCollisions = true;
                // hl.addExcludedMesh(item)
            }
            if (item.name.substring(0, 4) == 'door') {
                item.setParent(doorGroup)
                item.isPickable = false //取消可选
                item.checkCollisions = true;
                // hl.addExcludedMesh(item)
            }
            // if (item.name.substring(0, 4) == 'rack') {
            //     item.checkCollisions = true;
            // }
            if (item.name.substring(0, 3) == 'air') {
                item.checkCollisions = true;
            }
        })

        // 设备组
        let deviceGroup = scene1.transformNodes.find(item => item.name == 'device_group')
        deviceGroup.setEnabled(false) //默认隐藏


        // 将设备序列化引入scene2
        deviceGroup.getChildMeshes().forEach(item => {
            item.scaling = new Vector3(25, 25, 25)
            let devMesh = SceneSerializer.SerializeMesh(item)
            SceneLoader.ImportMesh("", "", "data:" + JSON.stringify(devMesh), scene2)
        })

        let scene2devGroup = new TransformNode('devGroup', scene2)
        scene2.meshes.forEach((item, index) => {
            if (/^device/.test(item.name)) {
                item.setParent(scene2devGroup)
                item.position = new Vector3(-0.047, index * 0.05, 0.16)
                item.setEnabled(false)
            }
        })


        // 光纤组
        let branch = scene1.transformNodes.find(item => item.name == 'branch_group')
        branch.getChildMeshes().forEach(item => {
            item.isPickable = false //取消可选
        })
        // 光线组默认隐藏
        branch.setEnabled(false)
        // 向父组件传递光纤组
        emitter.emit('branch', branch)

        // 母线组
        //#region
        let mainBus = new TransformNode('mainBus', scene1) //主母线组
        let mainBusAGroup = new TransformNode('mainBusA', scene1) //母线A组
        let mainBusBGroup = new TransformNode('mainBusB', scene1)  //母线B组
        // 材质
        let mainBusAMat = createMainBusAMat(scene1)
        let mainBusBMat = createMainBusBMat(scene1)
        mods.meshes.forEach(item => {
            // 母线A组
            if (item.name.substring(0, 10) == 'main_bus_a' || item.name.substring(0, 12) == 'branch_bus_a') {
                //    添加进母线A组
                item.setParent(mainBusAGroup) //母线A组
                item.material = mainBusAMat //母线材质
            }
            // 母线B组
            if (item.name.substring(0, 10) == 'main_bus_b' || item.name.substring(0, 12) == 'branch_bus_b') {
                item.setParent(mainBusBGroup) //母线B组
                item.material = mainBusBMat //母线材质
            }
            // 大插接箱
            if (item.name.substring(0, 8) == 'pdu_main') {
                item.setParent(mainBus) //大插接箱组
            }

        })

        // 添加进主母线组
        mainBusAGroup.setParent(mainBus)
        mainBusBGroup.setParent(mainBus)

        // 主母线禁止点击
        mainBus.getChildMeshes(false).forEach(item => {
            item.isPickable = false
        })
        // 母线组默认隐藏
        mainBus.setEnabled(false)
        // 向父组件传递主母线组
        emitter.emit('mainBus', mainBus)

        //#endregion

        // 插接箱组
        //#region
        let othersGroup = scene1.transformNodes.find(item => item.name == 'others_group')
        // 打印othersGroup中心点
        // console.log(othersGroup.getHierarchyBoundingVectors());

        othersGroup.getChildMeshes(false).forEach(item => {
            item.isPickable = false
        })
        othersGroup.setEnabled(false) //默认隐藏


        let pduGroup = scene1.transformNodes.find(item => item.name == 'pdu_group')
        pduGroup.setEnabled(false) //默认隐藏
        //#endregion

        // 烟感组
        let smokeGroup = scene1.transformNodes.find(item => item.name == 'smoke_group')
        smokeGroup.setEnabled(false)


        // 监控组
        let monitorGroup = scene1.transformNodes.find(item => item.name == 'monitor_group')
        monitorGroup.setEnabled(false)


        // 轨道相机组
        let railMonitor = scene1.transformNodes.find(item => item.name == 'monitor_rail')
        railMonitor.setEnabled(false)

        // 温湿度组
        let wsdGroup = scene1.transformNodes.find(item => item.name == 'tempGroup')
        wsdGroup.setEnabled(false)


        // 设置所有instancedMesh的visibility为1
        scene1.meshes.forEach(item => {
            let className = item.getClassName()
            if (className == 'InstancedMesh') {
                item.visibility = 1
            }
        })





        /**告警指示灯前置操作 */
        //  修改source2指示灯材质
        let rack_source2 = scene1.getMeshByName('rack_source2_primitive1')
        rack_source2.material = lightAlarmMaterial

        // 将机柜j01转为instancedMesh
        let j01_body = scene1.getMeshByName('rack_j01_primitive0')
        let j01_light = scene1.getMeshByName('rack_j01_primitive1')
        let j01_bodyIns = j01_body.createInstance('rack_j01_primitive0')
        let j01_lightIns = j01_light.createInstance('rack_j01_primitive1')

        // 获取j01节点
        let j01 = scene1.getTransformNodeByName('rack_j01')
        j01_bodyIns.parent = j01
        j01_lightIns.parent = j01

        // 源j01隐藏并修改名为source
        j01_body.name = 'rack_j01_primitive0_source'
        j01_light.name = 'rack_j01_primitive1_source'
        j01_body.setEnabled(false)
        j01_light.setEnabled(false)

        scene1.getTransformNodeByName('rack_source1').setEnabled(false)
        scene1.getTransformNodeByName('rack_source2').setEnabled(false)

        // 告警指示灯
        setInterval(() => {
            alarmLight()
            console.log('更新告警指示灯');
        }, 5000);

        // 引入蓝色地板贴图
        let blueGround_air = new StandardMaterial('blueGround_air', scene1)
        blueGround_air.diffuseTexture = new Texture('/mods/dizhuan_diff_3.jpg', scene1)
        let blueGround = new StandardMaterial('blueGround', scene1)
        blueGround.diffuseTexture = new Texture('/mods/dizhuan_diff_4.jpg', scene1)

        // 默认加载科技蓝主题
        blueTheme()


        // 获取引擎
        let engine = scene1.getEngine();
        // engine.runRenderLoop(function () {
        //     scene1.render();
        // });

        let { switchScene } = useRenderLoop(scene1, engine)
        switchScene(scene1)

        console.log(engine.activeRenderLoops, 'renderloop')

        /**画布自适应 */
        window.onresize = debounce(() => {
            if (engine === null) return
            engine.resize()
        }, 100)
    }
})



// 第一人称相机
function player() {
    console.log('11');
    // 设置场景重力
    scene1.gravity = new Vector3(0, -0.9, 0);
    // 场景碰撞监测开启
    scene1.collisionsEnabled = true;
    // 切换相机
    scene1.setActiveCameraByName('FreeCamera')
    // 开启相机碰撞监测
    let player = scene1.getCameraByName('FreeCamera')
    player.checkCollisions = true;
    // 相机应用重力
    player.applyGravity = true;
    // 设置相机椭圆
    player.ellipsoid = new Vector3(0.015, 0.09, 0.015);
    // 设置相机速度
    player.speed = 0.01
    // 设置地面碰撞监测
    let ground = scene1.getMeshByName('ground_1')
    ground.checkCollisions = true;
    // 设置门碰撞

    // 设置墙体碰撞



}


/**告警故障指示灯
1获取告警数据
2循环告警数据判断否为机柜故障
3修改source源
 */
async function alarmLight() {
    let res = await homeData()
    let alarmSource = scene1.getMeshByName('rack_source2_primitive1')
    res.data.data.equipAlarmList.forEach(item => {
        if (/^rack/.test(item.model_name)) {
            // 根据告警机柜的名称修改机柜的状态灯
            if (item.handle_status == '未处理') {
                if (scene1.getMeshByName(`${item.model_name}_primitive1_alarm`)) {
                    return
                } else {
                    scene1.getMeshByName(`${item.model_name}_primitive1`).setEnabled(false) //隐藏原始状态灯
                    let alarmLight = alarmSource.createInstance(`${item.model_name}_primitive1_alarm`) //创建告警故障灯
                    alarmLight.parent = scene1.getTransformNodeByName(item.model_name) //设置父节点
                }
            } else if (item.handle_status == '已处理') {
                scene1.getMeshByName(`${item.model_name}_primitive1`).setEnabled(true)  //显示原始状态灯
                // 如果告警实例存在
                if (scene1.getMeshByName(`${item.model_name}_primitive1_alarm`)) {
                    // 删除添加的告警灯
                    scene1.getMeshByName(`${item.model_name}_primitive1_alarm`).dispose()
                }
            }
        }
    })
}


// 科技蓝主题
function blueTheme() {
    /**材质修改 */
    // 墙体蓝色
    scene1.getTransformNodeByName('wall').getChildMeshes(false).forEach(item => {
        item.material = scene1.getMaterialByName('wallMat')
    })
    // 门透明色
    scene1.getTransformNodeByName('door').getChildMeshes(false).forEach(item => {
        item.material = scene1.getMaterialByName('doorMat')
    })
    // 地板蓝色
    scene1.getTransformNodeByName('ground').getChildMeshes(false).forEach(item => {
        if (item.name == 'ground_air_1') {
            item.material = scene1.getMaterialByName('blueGround_air')
        } else if (item.name == 'ground_1') {
            item.material = scene1.getMaterialByName('blueGround')
        }
    })
}






</script>
       
<style scoped>
#renderCanvas {
    width: 100%;
    height: 100%;
}

.btn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
    width: 100px;
    height: 50px;
}

.blue {
    position: absolute;
    top: 0;
    left: 300px;
    color: #fff;
}

.green {
    position: absolute;
    top: 0;
    left: 400px;
    color: #fff;
}
</style>