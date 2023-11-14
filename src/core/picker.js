// 相机运动动画
import { cameraFly, deviceOut, deviceIn } from './animation.js'
import { slelectHighLight, multiHighLight, slelectSourceHighLight, multiSourceHighLight } from './highLight.js'
import { Color3, PointerEventTypes, Vector3 } from '@babylonjs/core'
import { useRenderLoop } from '@/utils/switchScene.js'
import { getRackData } from '@/api/zichansousuo/index.js'


// 首页点击
export function homePicker(scene, func) {
    // console.log(scene, func, 'hhhh');
    scene.onPointerPick = function (evt, pickResult) {
        // console.log(evt);
        // console.log(pickResult);
        if (pickResult.hit && evt.button == 0) {
            // 创建三种设备正则
            // let jiguiReg = new RegExp(/^rack_/)
            // let cjxReg = new RegExp(/^pdu_[a-z][0-9][0-9]_[ab]$/)
            // let jmktReg = new RegExp(/^air_/)
            //选中精密空调操作
            if (/^air_/.test(pickResult.pickedMesh.name)) {
                // console.log('选中精密空调');
                if (pickResult.pickedMesh.name[4] <= 2) {
                    cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.6436, -1.5683, 0.7001, func)
                } else if (pickResult.pickedMesh.name[4] >= 3) {
                    cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.6436, 1.5683, 0.7001, func)
                }
                slelectHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
            } else if (/^pdu_[a-z][0-9][0-9]_[ab]$/.test(pickResult.pickedMesh.name)) {
                // console.log('选中插接箱');
                cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224, func)
                slelectHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
            } else if (/^rack_/.test(pickResult.pickedMesh.name)) {
                // console.log('选中机柜');
                scene.effectLayers[0].removeAllMeshes()
                let jgPos = pickResult.pickedMesh.parent.getHierarchyBoundingVectors().max.add(pickResult.pickedMesh.parent.getHierarchyBoundingVectors().min).scale(0.5)
                // console.log(jgPos);
                cameraFly(scene.cameras[0], 60, jgPos, 0.3296, -0.0100, 0.7224, func)
                // 遍历node节点下的所有mesh添加高亮
                let meshArr = pickResult.pickedMesh.parent.getChildMeshes()
                meshArr.forEach(item => {
                    multiHighLight(scene, item, new Color3(0, 0.902, 1))
                })
            } else if (/^smoke_/.test(pickResult.pickedMesh.name)) {
                cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224, func)
                slelectHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
            } else if (/^monitor_/.test(pickResult.pickedMesh.name)) {
                scene.effectLayers[0].removeAllMeshes()
                let mointorPos = pickResult.pickedMesh.parent.getHierarchyBoundingVectors().max.add(pickResult.pickedMesh.parent.getHierarchyBoundingVectors().min).scale(0.5)
                cameraFly(scene.cameras[0], 60, mointorPos, 0.3296, -0.0100, 0.7224, func)
                // slelectHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                let meshArr = pickResult.pickedMesh.parent.getChildMeshes()
                meshArr.forEach(item => {
                    multiHighLight(scene, item, new Color3(0, 0.902, 1))
                })
            }
        }
    }
}

// 插接箱模型拾取函数
export function CjxPicker(scene, tcStatus) {
    scene.onPointerPick = function (evt, pickResult) {
        // console.log(pickResult.hit);
        if (pickResult.hit && evt.button == 0) {
            //匹配模型名称是否为插接箱
            let cjxReg = new RegExp('pdu_[a-z]\\d{2}_[ab]_clone');
            if (cjxReg.test(pickResult.pickedMesh.name) && pickResult.pickedMesh.name.length == 15) {
                console.log(pickResult.pickedMesh);
                // 镜头拉近
                cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3, -0.0050, 0.5213, () => { tcStatus.value = true })
                // 插接箱高亮
                slelectSourceHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
            }
        }
    }
}

// 容量监测模型拾取方法
export function rljcPicker(scene, data) {
    scene.onPointerPick = function (evt, pickResult) {
        // console.log(pickResult);
        if (pickResult.hit && evt.button == 0) {
            // 判断是否选中机柜
            if (/^rack_/.test(pickResult.pickedMesh.name)) {
                // 相机飞行动画
                cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224, () => { data.popStatus = true })
                slelectSourceHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                // 修改标题名称
                data.title = `机柜${pickResult.pickedMesh.name.slice(5, 6).toUpperCase()}-${pickResult.pickedMesh.name.slice(6, 8)}`
                // 根据机柜名称请求数据
            }
        }
    }
}



// 设备选择拾取方法
let cloneParent = '' //记录上一个选中mesh的parent
export function DeviceSearchPicker(sceneObj, isScene1) {
    return function (pointerInfo) {
        let timer = '';
        // 判断是都选中模型
        let pickResult = pointerInfo.pickInfo


        if (pointerInfo && pickResult?.hit && pointerInfo.event.button == 0) {
            // 判断单双击
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERTAP: {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        // console.log('单击');
                        // 清空所有cloneMesh
                        // console.log(pickResult.pickedMesh.parent.name, '2222');
                        // console.log(cloneParent, '1111');

                        // 判断是否为同一个mesh
                        if (pickResult.pickedMesh.parent.name == cloneParent) {
                            return
                        }


                        if (cloneParent != '') {
                            // 查找节点
                            sceneObj.scene.getTransformNodeByName(cloneParent).getChildMeshes().forEach(item => {
                                //显示隐藏mesh
                                item.setEnabled(true)
                                // 删除cloneMesh
                                if (/clone$/.test(item.name)) {
                                    item.dispose()
                                    // console.log(`删除了${item.name}`);
                                }
                            })
                        }
                        //选中精密空调操作
                        if (/^air_/.test(pickResult.pickedMesh.name)) {
                            // console.log('选中精密空调');
                            if (pickResult.pickedMesh.name[4] <= 2) {
                                cameraFly(sceneObj.scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.6436, -1.5683, 0.7001)
                            } else if (pickResult.pickedMesh.name[4] >= 3) {
                                cameraFly(sceneObj.scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.6436, 1.5683, 0.7001)
                            }
                            slelectHighLight(sceneObj.scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                            cloneParent = pickResult.pickedMesh.parent.name
                            // console.log(cloneParent);
                        } else if (/^pdu_[a-z][0-9][0-9]_[ab]$/.test(pickResult.pickedMesh.name)) {
                            // console.log('选中插接箱');
                            cameraFly(sceneObj.scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224)
                            slelectHighLight(sceneObj.scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                            cloneParent = pickResult.pickedMesh.parent.name
                            // console.log(cloneParent);
                        } else if (/^rack_/.test(pickResult.pickedMesh.name)) {
                            // console.log('选中机柜');
                            console.log(pickResult.pickedMesh);
                            sceneObj.scene.effectLayers[0].removeAllMeshes()
                            console.log(pickResult.pickedMesh.parent, 'parent');
                            let jgPos = pickResult.pickedMesh.parent.getHierarchyBoundingVectors().max.add(pickResult.pickedMesh.parent.getHierarchyBoundingVectors().min).scale(0.5)
                            console.log(jgPos);
                            cameraFly(sceneObj.scene.cameras[0], 60, jgPos, 0.3296, -0.0100, 0.7224)
                            // 遍历node节点下的所有mesh添加高亮
                            let meshArr = pickResult.pickedMesh.parent.getChildMeshes()
                            meshArr.forEach(item => {
                                multiHighLight(sceneObj.scene, item, new Color3(0, 0.902, 1))
                            })
                            cloneParent = pickResult.pickedMesh.parent.name
                            // console.log(cloneParent);
                        } else if (/^smoke_/.test(pickResult.pickedMesh.name)) {
                            cameraFly(sceneObj.scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224)
                            slelectHighLight(sceneObj.scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                            cloneParent = pickResult.pickedMesh.parent.name
                            // console.log(cloneParent);
                        } else if (/^monitor_/.test(pickResult.pickedMesh.name)) {
                            sceneObj.scene.effectLayers[0].removeAllMeshes()
                            let mointorPos = pickResult.pickedMesh.parent.getHierarchyBoundingVectors().max.add(pickResult.pickedMesh.parent.getHierarchyBoundingVectors().min).scale(0.5)
                            cameraFly(sceneObj.scene.cameras[0], 60, mointorPos, 0.3296, -0.0100, 0.7224)
                            // slelectHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                            let meshArr = pickResult.pickedMesh.parent.getChildMeshes()
                            meshArr.forEach(item => {
                                multiHighLight(sceneObj.scene, item, new Color3(0, 0.902, 1))
                            })
                            cloneParent = pickResult.pickedMesh.parent.name
                            // console.log(cloneParent);
                        } else if (/^TH/.test(pickResult.pickedMesh.name)) {
                            cameraFly(sceneObj.scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224)
                            slelectSourceHighLight(sceneObj.scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
                        }
                    }, 300);
                };
                    break;
                case PointerEventTypes.POINTERDOUBLETAP: {
                    clearTimeout(timer);
                    // console.log('双击');
                    if (/^rack_/.test(pickResult.pickedMesh.name)) {
                        // console.log(pickResult.pickedMesh.parent.name);
                        // 双击切换场景
                        // 请求接口，获取数据，根据数据clone模型并摆放位置
                        getRack_DevData(pickResult.pickedMesh.parent.name, sceneObj)
                        // 切换场景
                        let engine = sceneObj.scene.getEngine();
                        let { switchScene } = useRenderLoop(sceneObj.scene, engine)
                        switchScene(sceneObj.scene2)
                        isScene1.value = 'scene2'
                        console.log('双击咯');
                        // console.log(sceneObj.scene);
                        // console.log(engine.activeRenderLoops, 'renderloop')
                    }
                }
                    break;
            }
        }
    }
}

// 获取机柜设备方法
async function getRack_DevData(meshName, sceneObj) {
    let res = await getRackData(meshName)
    // console.log(res);
    res.data.data.forEach(item => {
        let dev1;
        if (item.deviceUHeight == 2) {
            dev1 = sceneObj.scene2.getMeshByName('device_1').clone(`equip_${item.deviceId}`)
        } else if (item.deviceUHeight == 3) {
            dev1 = sceneObj.scene2.getMeshByName('device_4').clone(`equip_${item.deviceId}`)
        } else if (item.deviceUHeight == 4) {
            dev1 = sceneObj.scene2.getMeshByName('device_5').clone(`equip_${item.deviceId}`)
        } else if (item.deviceUHeight == 5 || item.deviceUHeight == 6) {
            dev1 = sceneObj.scene2.getMeshByName('device_6').clone(`equip_${item.deviceId}`)
        }
        // console.log(dev1);
        // 一半高度为
        let halfDevH = (dev1.getBoundingInfo().boundingBox.maximumWorld.y - dev1.getBoundingInfo().boundingBox.minimumWorld.y) / 2
        // 1u高度为
        let uHeight = (sceneObj.scene2.getMeshByName('rack_body').getBoundingInfo().boundingBox.maximumWorld.y - sceneObj.scene2.getMeshByName('rack_body').getBoundingInfo().boundingBox.minimumWorld.y - 0.02) / 42
        // console.log(halfDevH);
        // console.log(uHeight);
        dev1.position = new Vector3(-0.075, uHeight * item.deviceStartIndex + 0.01 + halfDevH, -0.002)
        dev1.setEnabled(true)
        sceneObj.scene2.addMesh(dev1)
    })
}

// 机柜场景拾取方法
export function devicePicker(scene, tcStatus, currentOut) {
    let oldPick = null
    scene.onPointerPick = function (evt, pickResult) {
        console.log(pickResult);
        if (pickResult.hit && evt.button == 0) {
            console.log('击中目标');
            // 旧推出推回
            if (oldPick != null) {
                deviceIn(oldPick)
            }
            // 高亮
            slelectSourceHighLight(scene, pickResult.pickedMesh, new Color3(0, 1, 1))
            // 推出
            deviceOut(pickResult.pickedMesh)
            oldPick = pickResult.pickedMesh
            // 请求设备数据
            currentOut.value = pickResult.pickedMesh
            // 打开弹窗
            tcStatus.value = true
        }
    }
}

// 监控视频拾取方法
export function monitorPicker(scene, tcStatus, tcTitle) {
    scene.onPointerPick = function (evt, pickResult) {
        // console.log(pickResult);
        if (pickResult.hit && evt.button == 0) {
            //匹配模型名称是否为插接箱
            let monitorReg = new RegExp('^monitor');
            if (monitorReg.test(pickResult.pickedMesh.id)) {
                if (pickResult.pickedMesh.id.slice(0, 10) == 'monitor_01') {
                    tcTitle.value = 'A区监控画面'
                } else if (pickResult.pickedMesh.id.slice(0, 10) == 'monitor_02') {
                    tcTitle.value = 'B区监控画面'
                } else if (pickResult.pickedMesh.id.slice(0, 10) == 'monitor_03') {
                    tcTitle.value = 'C区监控画面'
                }
                tcStatus.value = true
            }
        }
    }
}

// 烟雾报警拾取方法
export function smokePicker(scene, tcStatus) {
    scene.onPointerPick = function (evt, pickResult) {
        // console.log(pickResult);
        if (pickResult.hit && evt.button == 0) {
            // 判断是否选中机柜
            if (/^smoke/.test(pickResult.pickedMesh.name)) {
                // 相机飞行动画
                cameraFly(scene.cameras[0], 60, pickResult.pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224, () => { tcStatus.value = true })
                // slelectHighLight(scene, pickResult.pickedMesh, new Color3(0, 0.902, 1))
            }
        }
    }
}