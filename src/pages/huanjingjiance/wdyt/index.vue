<template>
    <div id="heatmap" style="width: 500px;height: 500px;position: absolute;top: 0;">
    </div>
    <div class="popOver" v-if="popStatus">
        <div class="popOver_header">
            <div class="title">温度云图</div>
            <div class="close" @click="closePop()"></div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, onBeforeUnmount, reactive } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { MeshBuilder, Vector3, Mesh, HtmlElementTexture, StandardMaterial } from '@babylonjs/core'
// import { DynamicTexture } from '@babylonjs/materials'
import Heatmap from 'heatmap.js'
import { cameraFly } from '@/core/animation.js'
import { getwsdData } from '@/api/huanjingjiance/wsd.js'
import { createTemper } from '@/utils/GUI.js'

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
        // console.log(sceneObj);

        // 弹窗状态
        let popStatus = ref(true)

        // 关闭弹窗
        const closePop = () => {
            popStatus.value = false
        }

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
                if (loaded.value) {
                    displayWsd(true)
                    // 温度云图相机
                    cameraFly(sceneObj.camera, 120, new Vector3(0.093, 0.071, 0.054), 1.8593, 0.7100, 1.0613)
                    getWsdData()
                    createTemper(sceneObj.scene, wsdData)
                    // 天花板mesh
                    upPlane()
                    // 初始化温度云图数据
                    initValue()
                }
            }, { immediate: true })
        })

        // 创建天花板mesh
        function upPlane() {
            let upPlane = new MeshBuilder.CreatePlane('upPlane', { width: 2.006, height: 1.872 }, sceneObj.scene)
            upPlane.position = new Vector3(-0.008, 0.228, 0.001)
            upPlane.rotation = new Vector3(Math.PI / 2, 0, 0)
            upPlane.isPickable = false
            upPlane.renderingGroupId = 3
        }

        // 热力图
        let points = [];

        function initValue() {
            let len = 30
            while (len--) {
                let val = Math.floor(Math.random() * 100)
                // max = Math.max(max, val)
                let point = {
                    x: Math.floor(Math.random() * 500),
                    y: Math.floor(Math.random() * 400),
                    value: val
                }
                points.push(point)
            }
            initHeatmap()
        }



        function initHeatmap() {
            // 创建一个heatmap实例对象
            // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
            let heatmapInstance = Heatmap.create({
                container: document.getElementById('heatmap'),
                gradient: {//渐变颜色
                    "0": "rgba(255,255,255,1)",//value为0的颜色
                    "0.3": "#82ff6d",//value为500的颜色
                    "0.8": "#f3ff6d",//value为1000的颜色
                    "1": "#ff6d6d",//value为2000的颜色
                },
                // radius: 10,
                maxOpacity: 1,
                minOpacity: 0,
                blur: 1,
                radius: 70, //半径
                // opacity:0.5, //透明
                // maxOpacity, //热图中最大值具有的最大不透明度
                // minOpacity, //热图中最小值的最小不透明度
                // onExtremaChange, //传递回调以接收极值更改更新
                // blur, //将应用于所有数据点的模糊因子。模糊因子越高，渐变将越平滑
                // xField, //数据点中x坐标的属性名称
                // yField, //数据点中y坐标的属性名称
                // valueField //数据点中y坐标的属性名称
            });
            let data = {
                max: 100,     //数据对比(max和min进行数据对比，从而展示热力颜色)
                min: 0,
                data: points
            }

            heatmapInstance.setData(data)
            // 天花板
            let upPlane = sceneObj.scene.getMeshByName('upPlane')
            // 热力图canvas
            let heatCanvas = document.querySelector('.heatmap-canvas')
            // 将热力图canvas转为材质
            const heatTexture = new HtmlElementTexture("heat", heatCanvas, { scene: sceneObj.scene });
            // console.log(heatTexture);
            const mat2 = new StandardMaterial("mater", sceneObj.scene);
            mat2.diffuseTexture = heatTexture;
            mat2.diffuseTexture.hasAlpha = true
            mat2.emissiveTexture = heatTexture;
            mat2.useAlphaFromDiffuseTexture = true
            mat2.disableLighting = true
            // console.log(mat2);
            upPlane.material = mat2;
        }


        // 显示温湿度传感器
        function displayWsd(bool) {
            sceneObj.scene.transformNodes.find(item => item.name == 'tempGroup').setEnabled(bool)
        }


        // 页面离开前恢复操作
        onBeforeUnmount(() => {
            displayWsd(false)
            // 删除upPlane
            let upPlane = sceneObj.scene.getMeshByName('upPlane')
            upPlane.dispose()
            sceneObj.camera.useAutoRotationBehavior = false

            // 清除温湿度模型
            sceneObj.scene.meshes.filter(item => /^wsd_/.test(item.name)).forEach(item => {
                item.dispose()
            })
            // 清除材质
            sceneObj.scene.materials.filter(item => /^AdvancedDynamicTextureMaterial for wsd/.test(item.name)).forEach(item => {
                item.dispose()
            })
            // 清除贴图
            sceneObj.scene.textures.filter(item => item.name == 'wsdTexture').forEach(item => {
                item.dispose()
            })
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            popStatus,
            closePop,
            upPlane,


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
    background: url('@/assets/images/huanjingjiance/温度云图.png') no-repeat;
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

        // 关闭按钮
        .close {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            margin-top: 5px;
            background: url('@/assets/images/huanjingjiance/close.png') no-repeat;
            background-position: center;
            float: right;
            // background-color: rgba(250, 235, 215, 0.315);
            cursor: pointer;
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