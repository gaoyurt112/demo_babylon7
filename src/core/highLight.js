import { HighlightLayer } from '@babylonjs/core'
import { Color3 } from "@babylonjs/core";

/* 
高亮方法 插接箱点击高亮，重复点击无效，点击其他高亮取消

@scene 场景
@mesh 高亮模型
@color 高亮颜色
*/
export function slelectHighLight(scene, mesh, color) {
    let meshClass = mesh.getClassName()  //获取mesh类型
    // console.log(meshClass);
    // 判断是mesh还是instanceMesh
    if (meshClass == 'Mesh') {
        if (scene.effectLayers[0].hasMesh(mesh)) {
            return
        } else {
            scene.effectLayers[0].removeAllMeshes() //清空所有高亮
            mesh.setEnabled(false) //选中的mesh隐藏
            let cloneMesh = mesh.clone(`${mesh.name}_clone`, null, false) //克隆mesh
            cloneMesh.parent = mesh.parent //设置父级
            cloneMesh.rotationQuaternion = mesh.rotationQuaternion //设置旋转
            cloneMesh.setEnabled(true) //显示克隆mesh
            scene.effectLayers[0].addMesh(cloneMesh, color) //添加高亮
        }
        // console.log('mesh');
    } else if (meshClass == 'InstancedMesh') {
        // 克隆源mesh
        let cloneMesh = mesh.sourceMesh.clone(`${mesh.name}_clone`, null, false)  //克隆sourcemesh
        if (scene.effectLayers[0].hasMesh(cloneMesh)) {
            return
        } else {
            scene.effectLayers[0].removeAllMeshes()   //清空所有高亮
            mesh.setEnabled(false) //选中的mesh隐藏
            cloneMesh.parent = mesh.parent //设置父级
            cloneMesh.position = mesh.position //设置位置
            cloneMesh.rotationQuaternion = mesh.rotationQuaternion //设置旋转
            cloneMesh.setEnabled(true)
            // console.log(cloneMesh);
            scene.effectLayers[0].addMesh(cloneMesh, color)
        }
        // console.log('instanceMesh');
    }
}


/*  
多mesh高亮 在页面离开时清除高亮

@scene 场景
@mesh 高亮模型
@color 高亮颜色
*/
export function multiHighLight(scene, mesh, color) {
    // scene.effectLayers[0].addMesh(mesh, color)
    let meshClass = mesh.getClassName()
    console.log(meshClass);
    if (meshClass == 'Mesh') {
        if (scene.effectLayers[0].hasMesh(mesh)) {
            return
        }
        // 如果为mesh直接高亮
        // scene.effectLayers[0].addMesh(mesh, color)
        // console.log('mesh');
        mesh.setEnabled(false)
        let cloneMesh = mesh.clone()
        cloneMesh.name = `${mesh.name}_clone`
        cloneMesh.parent = mesh.parent
        cloneMesh.rotationQuaternion = mesh.rotationQuaternion
        cloneMesh.setEnabled(true)
        scene.effectLayers[0].addMesh(cloneMesh, color)

    } else if (meshClass == 'InstancedMesh') {
        if (scene.effectLayers[0].hasMesh(mesh)) {
            return
        }
        // 如果为实例模型则复制源模型
        // console.log(mesh);
        // console.log(mesh.parent, 'parent');
        // 隐藏模型
        mesh.setEnabled(false)
        // 克隆源mesh
        let cloneMesh = mesh.sourceMesh.clone()
        cloneMesh.name = `${mesh.name}_clone`
        cloneMesh.parent = mesh.parent
        cloneMesh.position = mesh.position
        cloneMesh.rotationQuaternion = mesh.rotationQuaternion
        cloneMesh.setEnabled(true)
        scene.effectLayers[0].addMesh(cloneMesh, color)
    }
}




// 仅Mesh highLight
/* 
高亮方法 插接箱点击高亮，重复点击无效，点击其他高亮取消

@scene 场景
@mesh 高亮模型
@color 高亮颜色
*/
export function slelectSourceHighLight(scene, mesh, color) {
    // 判断是否已经有相同mesh
    if (scene.effectLayers[0].hasMesh(mesh)) {
        return
    } else {
        scene.effectLayers[0].removeAllMeshes()
        scene.effectLayers[0].addMesh(mesh, color)
    }
}


/*  
多mesh高亮 在页面离开时清除高亮

@scene 场景
@mesh 高亮模型
@color 高亮颜色
*/
export function multiSourceHighLight(scene, mesh, color) {
    scene.effectLayers[0].addMesh(mesh, color)
}