import { Animation, CubicEase, Vector3, BezierCurveEase } from '@babylonjs/core'
import { useRenderLoop } from '@/utils/switchScene.js'
/*
通用相机定位

 @camera 场景相机
 @frame 帧数
 @position 相机目标位置
 @radius 弧度
 @alpha 阿尔法角
 @beta  贝塔角
 @func 可选参数，动画结束后触发
*/
export function cameraFly(camera, frame, position, radius, alpha, beta, func) {
    // 位置
    Animation.CreateAndStartAnimation('cameraMove', camera, 'target', 60, frame, camera.target, position, 0, new CubicEase());
    // 位置
    Animation.CreateAndStartAnimation('cameraMove', camera, 'radius', 60, frame, camera.radius, radius, 0, new CubicEase());
    // 
    Animation.CreateAndStartAnimation('cameraMove', camera, 'alpha', 60, frame, camera.alpha, alpha, 0, new CubicEase());
    // 
    Animation.CreateAndStartAnimation('cameraMove', camera, 'beta', 60, frame, camera.beta, beta, 0, new CubicEase(), func);
}


/* 
容量监测模型上升动画

@mesh 动画目标模型
@height 上升高度
*/
export function meshGrowUp(mesh, height) {
    Animation.CreateAndStartAnimation('meshGrowUp', mesh, 'scaling', 60, 80, mesh.scaling, new Vector3(1, height, 1), 0, new CubicEase(), () => {

    });
}

/*
开门动画

@camera 场景相机
@mesh 需要操作的模型
*/
export function doorOpen(camera, mesh) {
    // 位置
    Animation.CreateAndStartAnimation('cameraMove', camera, 'target', 60, 80, camera.target, new Vector3(0.3, 0.24, 0.160), 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
    });
    // 位置
    Animation.CreateAndStartAnimation('cameraMove', camera, 'radius', 60, 80, camera.radius, 1.0723, 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
    });
    // 
    Animation.CreateAndStartAnimation('cameraMove', camera, 'alpha', 60, 80, camera.alpha, 3.5139, 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
    });
    // 
    Animation.CreateAndStartAnimation('cameraMove', camera, 'beta', 60, 80, camera.beta, 1.5780, 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
        // 开门动画
        Animation.CreateAndStartAnimation('doorOpen', mesh, 'rotation.y', 60, 60, mesh.rotation.y, Math.PI / 1.5, 0, new CubicEase(), () => {
            console.log('动画执行完毕');
        });
    });
}

/*
关门动画

@camera 场景相机
@mesh 需要操作的模型
@sceneObj 场景数据
@isScene1 场景
*/
export function doorClose(camera, mesh, sceneObj, isScene1) {
    // 关门动画
    Animation.CreateAndStartAnimation('doorOpen', mesh, 'rotation.y', 60, 60, mesh.rotation.y, 0, 0, new CubicEase(), () => {
        // console.log('动画执行完毕');
    });
    // 位置
    Animation.CreateAndStartAnimation('cameraMove', camera, 'target', 60, 80, camera.target, new Vector3(0.346, 0.129, 0.157), 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
    });
    // 位置
    Animation.CreateAndStartAnimation('cameraMove', camera, 'radius', 60, 80, camera.radius, 5.0000, 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
    });
    // 
    Animation.CreateAndStartAnimation('cameraMove', camera, 'alpha', 60, 80, camera.alpha, 3.5875, 0, new CubicEase(), () => {
        // 动画完成后的回调函数
        // console.log('动画完成');
    });
    // 
    Animation.CreateAndStartAnimation('cameraMove', camera, 'beta', 60, 80, camera.beta, 1.2073, 0, new CubicEase(), () => {
        // 切换场景1
        let engine = sceneObj.scene.getEngine();
        let { switchScene } = useRenderLoop(sceneObj.scene, engine)
        switchScene(sceneObj.scene)
        isScene1.value = 'scene1'
        console.log(sceneObj.scene);
        console.log(engine.activeRenderLoops, 'renderloop')
        // 清除scene2的设备模型
        sceneObj.scene2.meshes.filter(item => /^equip/.test(item.name)).forEach(item => {
            item.dispose()
        })
    });
}
/* 
设备推出动画

@mesh 需要操作的模型
*/
export function deviceOut(mesh) {
    console.log('推出');
    Animation.CreateAndStartAnimation('deviceOut', mesh, 'position.x', 60, 60, mesh.position.x, -0.136, 0, new CubicEase(), () => {

    });
}
/*
设备推入动画

@mesh 需要操作的模型
*/
export function deviceIn(mesh) {
    console.log('进入');
    Animation.CreateAndStartAnimation('deviceIn', mesh, 'position.x', 60, 60, mesh.position.x, -0.075, 0, new CubicEase(), () => {

    });
}
/*
高亮闪烁动画

@objects 高亮模型数组
@hl 高亮层
*/
export function highLight(objects, hl) {
    const highlightData = objects.map(obj => ({
        object: obj,
        value: 2, // 初始强度
        decreasing: true, // 初始状态为减弱
    }));

    function updateHighlight() {
        highlightData.forEach(data => {
            const { object, value, decreasing } = data;

            if (decreasing) {
                data.value -= 0.1;
                hl.setEffectIntensity(object, data.value);

                if (data.value <= 0) {
                    data.decreasing = false;
                }
            } else {
                data.value += 0.1;
                hl.setEffectIntensity(object, data.value);

                if (data.value >= 2) {
                    data.decreasing = true;
                }
            }
            // console.log(data.value);
        });
    }

    const interval = setInterval(updateHighlight, 100);

    // 返回定时器引用，以便稍后停止高亮效果
    return interval;
}
