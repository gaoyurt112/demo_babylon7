import { Vector3, Color3, StandardMaterial, PBRMaterial } from "@babylonjs/core"
import { GradientMaterial } from '@babylonjs/materials'

// 创建墙体蓝色半透明渐变材质
export function createWallMat(scene) {
    const wallMat = new GradientMaterial('wallMat', scene)
    wallMat.topColor = new Color3(0.33, 0.64, 0.98); //顶部颜色
    wallMat.bottomColor = new Color3(0.05, 0.30, 0.49); //底部颜色
    wallMat.topColorAlpha = 0.5; //顶部透明
    wallMat.bottomColorAlpha = 0.5; //底部透明
    wallMat.offset = 0.5; //偏移
    wallMat.scale = 60; //缩放
    wallMat.smoothness = 1; //光滑度
    wallMat.backFaceCulling = false; //取消背面剔除
    wallMat.needDepthPrePass = true; //深度预通过
    return wallMat
}

// 创建母线a组蓝色.needDepthPrePass
export function createMainBusAMat(scene) {
    const mainBusAMat = new StandardMaterial('mainBusAMat', scene)
    mainBusAMat.diffuseColor = new Color3(0.4, 0.8, 1)
    return mainBusAMat
}

// 创建母线b组紫色材质
export function createMainBusBMat(scene) {
    const mainBusBMat = new StandardMaterial('mainBusBMat', scene)
    mainBusBMat.diffuseColor = new Color3(0.92, 0.27, 1)
    return mainBusBMat
}

// 创建门透明白材质
export function createDoorMat(scene) {
    const doorMat = new StandardMaterial('doorMat', scene)
    doorMat.diffuseColor = new Color3(1, 1, 1)
    doorMat.alpha = 0.2
    return doorMat
}


// 创建pdu材质，绿，蓝，黄，澄
export function createGreenMat(scene) {
    const greenMat = new PBRMaterial('greenMat', scene)
    greenMat.emissiveColor = new Color3(0.24, 0.97, 0.48)
    return greenMat
}

export function createBlueMat(scene) {
    const blueMat = new PBRMaterial('blueMat', scene)
    blueMat.emissiveColor = new Color3(0.24, 0.75, 0.97)
    return blueMat
}

export function createYellowMat(scene) {
    const yellowMat = new PBRMaterial('yellowMat', scene)
    yellowMat.emissiveColor = new Color3(0.97, 0.77, 0.24)
    return yellowMat
}

export function createCyanMat(scene) {
    const cyanMat = new PBRMaterial('cyanMat', scene)
    cyanMat.emissiveColor = new Color3(0.97, 0.36, 0.24)
    return cyanMat
}

// 透明机柜材质
export function transJigui(scene) {
    const transJigui = new StandardMaterial('jiguiTransMat', scene)
    transJigui.diffuseColor = new Color3(1, 1, 1)
    transJigui.alpha = 0.2
    // transJigui.depthFunction = 517
    transJigui.backFaceCulling = false
    transJigui.needDepthPrePass = true
    return transJigui
}