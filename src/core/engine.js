// 巴比伦引擎
import { WebGPUEngine, Engine, Scene, ArcRotateCamera, DirectionalLight, HemisphericLight, Vector3, Color3, FreeCamera, ShadowGenerator, CascadedShadowGenerator } from "@babylonjs/core";
import { debounce } from 'lodash'

/*
创建场景

@canvas 画布
*/
export async function createScene(canvas) {
    let engine = null;
    const isWebGPUSupported = await WebGPUEngine.IsSupportedAsync; //是否支持WebGPU
    // console.log(isWebGPUSupported); //是否支持WebGPU
    // 可以使用简化的辅助函数 EngineFactory
    if (isWebGPUSupported) {
        // 如果支持WebGPU，使用WebGPU引擎
        engine = new WebGPUEngine(canvas, { stencil: true });
        await engine.initAsync(); // 初始化WebGPU引擎
    } else {
        // 如果不支持WebGPU，使用WebGL引擎
        engine = new Engine(canvas, true, { stencil: true });
    };

    // 场景1
    const scene = new Scene(engine)

    // 场景2
    const scene2 = new Scene(engine)

    // console.log(scene, scene2);

    // 返回两个场景
    return [scene, scene2]
}

/*
场景1弧形相机
 
@scene 场景
*/
export async function ArcCamera(scene) {
    const engine = scene.getEngine()
    const canvas = engine.getRenderingCanvas()
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0.177, -0.227, 0.216), scene);
    camera.attachControl(canvas, true);
    camera.alpha = 0.7100
    camera.beta = 0.5897
    camera.wheelDeltaPercentage = 0.05;// 滚轮敏感度
    camera.upperRadiusLimit = 5;// 最远观测距离
    camera.lowerRadiusLimit = 0.5; // 最近观测距离
    // 修改相机的视锥体参数
    camera.fov = Math.PI / 3;  // 设置视野为60度
    camera.minZ = 0.01;           // 设置近剪裁平面
    camera.maxZ = 200;         // 设置远剪裁平面
    camera.maxBeta = 1.2964; // 设置相机最大alpha值
    camera.upperBetaLimit = 1.3001; // 设置相机最大beta值
    return camera
}


/*
场景2弧形相机
 
@scene 场景
*/
export async function ArcCamera2(scene) {
    const engine = scene.getEngine()
    const canvas = engine.getRenderingCanvas()
    const camera = new ArcRotateCamera("camera2", 3.5875, 1.2073, 5.0000, new Vector3(0.346, 0.129, 0.157), scene);
    // camera.attachControl(canvas, true);
    camera.detachControl()
    // camera.alpha = 3.4918
    // camera.beta = 1.4605
    // camera.radius = 1.1376
    // camera.target = new Vector3(0.369, 0.190, 0.160)
    camera.wheelDeltaPercentage = 0.05;// 滚轮敏感度
    camera.upperRadiusLimit = 5;// 最远观测距离
    camera.lowerRadiusLimit = 0.2; // 最近观测距离
    // 修改相机的视锥体参数
    camera.fov = Math.PI / 3;  // 设置视野为60度
    camera.minZ = 0.01;           // 设置近剪裁平面
    camera.maxZ = 200;         // 设置远剪裁平面
    // camera.maxBeta = 1.2964; // 设置相机最大alpha值
    // camera.upperBetaLimit = 1.3001; // 设置相机最大beta值
    return camera
}

/*
第一人称相机
 
@scene 场景
*/
export async function freeCamera(scene) {
    const engine = scene.getEngine()
    const canvas = engine.getRenderingCanvas()
    const freeCamera = new FreeCamera("FreeCamera", new Vector3(0, 0.18, 0), scene);
    freeCamera.attachControl(canvas, true);
    freeCamera.minZ = 0.01;
    freeCamera.maxZ = 200;
}

/*
场景灯光
 
@scene 场景
*/
export async function HemisLight(scene, intensity) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = intensity; //灯光强度
}

export async function DirectionLight(scene) {
    const light = new DirectionalLight("sunlight", new Vector3(0.191, -1, 0.3), scene);
    light.intensity = 8; //灯光强度
    light.specular = new Color3(0, 0, 0)

    // // 投影
    // const shadowGenerator = new ShadowGenerator(2048, light)
    // console.log(scene.meshes);
    // // 开启物体接收阴影
    // scene.meshes.forEach(item => {
    //     item.receiveShadows = true
    // })

    // // 投影列表
    // let sdList = scene.meshes.filter(item => !(item.name.includes('base')))
    // console.log(sdList);

    // shadowGenerator.getShadowMap().renderList = sdList
    // shadowGenerator.filter = ShadowGenerator.FILTER_PCF


    // 投影2
    const shadowGenerator = new CascadedShadowGenerator(2048, light)
    scene.meshes.forEach(item => {
        item.receiveShadows = true
    })
    let sdList = scene.meshes.filter(item => !(item.name.includes('base')))
    // console.log(sdList);
    shadowGenerator.getShadowMap().renderList = sdList
    shadowGenerator.filter = CascadedShadowGenerator.FILTER_PCF
    shadowGenerator.autoCalcDepthBounds = true
    shadowGenerator.bias = 0.005
    shadowGenerator.normalBias = 0.002

}