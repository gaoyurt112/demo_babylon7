<template>
    <!-- 视频框 -->
    <div class="video" v-if="popStatus">
        <div class="header">
            <div class="title">{{ tcTitle }}</div>
            <div class="close" @click="closePop()"></div>
        </div>
        <div class="sp">
            <video :src="videoAddress" style="width: 100%;height: 100%;"></video>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, onBeforeUnmount } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { monitorPicker } from '@/core/picker'
import { Vector3, Color3, MeshBuilder, BezierCurveEase, Animation, CubicEase } from "@babylonjs/core"
import { GradientMaterial } from '@babylonjs/materials'
import { cameraFly } from '@/core/animation.js'


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

        // 弹窗标题
        let tcTitle = ref('')

        // 弹窗状态
        let popStatus = ref(false)

        // 关闭弹窗
        function closePop() {
            popStatus.value = false
        }

        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                if (loaded.value) {
                    sceneObj.scene.transformNodes.find(item => item.name == 'monitor_group').setEnabled(true)
                    // 显示摄像头
                    displayMonitor(true)
                    // 摄像头点击事件
                    monitorPicker(sceneObj.scene, popStatus, tcTitle)
                    // 创建锥体
                    CreateCylinder()
                    cameraFly(sceneObj.camera, 120, new Vector3(-0.01, 0.16, -0.07), 1.7245, -0.0050, 1.1213)
                    // setTimeout(() => {
                    //     isEntering.value = true
                    // }, 50)
                }
            }, { immediate: true })
        })

        //显示摄像头
        function displayMonitor(bool) {
            sceneObj.scene.transformNodes.find(item => item.name == 'monitor_group').getChildMeshes(false).forEach(item => {
                item.setEnabled(bool)
                item.renderingGroupId = 2
            })
        }

        //   
        let stopRotation = false

        // 获取摄像头数量并创建圆锥
        function CreateCylinder() {
            // 获取摄像头mesh数组
            let moniterArr = sceneObj.scene.transformNodes.find(item => item.name == 'monitor_group').getChildren()
            // 遍历并创建圆锥体添加入父级
            moniterArr.forEach(item => {
                let monitorHead = item.getChildren()
                console.log(monitorHead);
                const cylinder = new MeshBuilder.CreateCylinder(`${item.name}_cylinder`, { diameterTop: 0, height: 0.25, diameterBottom: 0.25, tessellation: 100 }, sceneObj.scene);
                cylinder.setParent(monitorHead[2])
            })


            // 创建锥形材质
            const ConeMat = new GradientMaterial('ConeMat', sceneObj.scene)
            ConeMat.topColor = new Color3(1, 0, 0); //顶部颜色
            ConeMat.bottomColor = new Color3(0.9, 0.5, 0.5); //底部颜色
            ConeMat.topColorAlpha = 0.4; //顶部透明
            ConeMat.bottomColorAlpha = 0.3; //底部透明
            ConeMat.offset = 0.3; //偏移
            ConeMat.scale = 15; //缩放
            ConeMat.smoothness = 1.2; //光滑度
            ConeMat.backFaceCulling = false; //取消背面剔除
            ConeMat.needDepthPrePass = true; //深度预通过
            ConeMat.disableLighting = true
            ConeMat.alphaMode = 1

            // 设置圆锥1位置
            let monitor1_Cone = sceneObj.scene.getMeshByName('monitor_01_cylinder')
            monitor1_Cone.position = new Vector3(-0.373, -0.279, -0.205)
            monitor1_Cone.rotationQuaternion = null
            monitor1_Cone.rotation.x = - Math.PI / 3.37
            monitor1_Cone.rotation.y = -Math.PI / 2.12
            monitor1_Cone.rotation.z = Math.PI / 1.12
            monitor1_Cone.material = ConeMat
            // monitor1_Cone.renderingGroupId = 1
            monitor1_Cone.scaling.x = 2.5
            // 摄像头旋转动画
            monitorRotate(sceneObj.scene.getMeshByName('monitor_01_primitive2'), Math.PI / 5, -Math.PI / 8.5, 180)


            let monitor2_Cone = sceneObj.scene.getMeshByName('monitor_02_cylinder')
            monitor2_Cone.position = new Vector3(-0.415, 0.236, -0.209)
            monitor2_Cone.rotationQuaternion = null
            monitor2_Cone.rotation.x = - Math.PI / 3.04
            monitor2_Cone.rotation.y = Math.PI / 1.91
            monitor2_Cone.rotation.z = -Math.PI / 9.43
            monitor2_Cone.material = ConeMat
            // monitor2_Cone.renderingGroupId = 1
            monitor2_Cone.scaling.x = 2.5
            // 摄像头旋转动画
            monitorRotate(sceneObj.scene.getMeshByName('monitor_02_primitive2'), Math.PI / 8.5, -Math.PI / 4.2, 180)

            let monitor3_Cone = sceneObj.scene.getMeshByName('monitor_03_cylinder')
            monitor3_Cone.position = new Vector3(0.379, -0.276, -0.182)
            monitor3_Cone.rotationQuaternion = null
            monitor3_Cone.rotation.x = Math.PI / 3.26
            monitor3_Cone.rotation.y = -Math.PI / 2.07
            monitor3_Cone.rotation.z = Math.PI / 1.06
            monitor3_Cone.material = ConeMat
            // monitor3_Cone.renderingGroupId = 1
            monitor3_Cone.scaling.x = 2.5
            // 摄像头旋转动画
            monitorRotate(sceneObj.scene.getMeshByName('monitor_03_primitive2'), Math.PI / 7.5, -Math.PI / 4.5, 180)
        }


        // 创建一个循环旋转动画
        function monitorRotate(mesh, rotation1, rotation2, duration) {
            if (stopRotation) {
                // 如果标志为 true，则停止递归
                // console.log('离开停止');
                return;
            }
            // 创建一个动画序列，旋转到 rotation1
            Animation.CreateAndStartAnimation('monitorRotate', mesh, 'rotation.z', 60, duration, mesh.rotation.z, rotation1, 0, new CubicEase(), () => {
                // 第一个动画完成后，切换目标旋转角度到 rotation2，然后递归调用 monitorRotate 函数
                const tempRotation = rotation1;
                rotation1 = rotation2;
                rotation2 = tempRotation;
                monitorRotate(mesh, rotation1, rotation2, duration);
            });
            // console.log('正在监控');
        }



        // 清除圆锥和材质
        function destoryCone() {
            // 清除锥体
            sceneObj.scene.getMeshByName('monitor_01_cylinder').dispose()
            sceneObj.scene.getMeshByName('monitor_02_cylinder').dispose()
            sceneObj.scene.getMeshByName('monitor_03_cylinder').dispose()
            // 清除材质
            sceneObj.scene.getMaterialByName('ConeMat').dispose()
        }

        //设置监控视频地址
        let videoAddress = ref('')
        // 当点击指定摄像头时，根据摄像头名称设置相应地址


        // 离开页面清除操作
        onBeforeUnmount(() => {
            // 解绑点击事件
            sceneObj.scene.onPointerPick = null
            // 隐藏摄像头
            displayMonitor(false)
            // 关闭弹窗
            popStatus.value = false
            // 清除圆锥和材质
            destoryCone()
            stopRotation = true
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            popStatus,
            closePop,
            tcTitle
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
.video {
    width: 960px;
    height: 578px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url('@/assets/images/anfangjiance/框体.png') no-repeat;

    .header {
        width: 100%;
        height: 30px;

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

    .sp {
        width: 100%;
        height: 536px;
        margin-top: 5px;
    }
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