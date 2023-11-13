import { MeshBuilder, Vector3, Mesh } from '@babylonjs/core'
import { Rectangle, AdvancedDynamicTexture, TextBlock, Image } from '@babylonjs/gui'

// 漏水标识
import lsImage from '@/assets/images/huanjingjiance/ls.png'
import lsRedImage from '@/assets/images/huanjingjiance/ls_red.png'

// 告警标识
import level1Img from '@/assets/images/home/紧急.png'
import level2Img from '@/assets/images/home/重要.png'
import level3Img from '@/assets/images/home/一般.png'
import level4Img from '@/assets/images/home/提醒.png'

/* 
温湿度GUI

@scene 场景
@data 漏水数据
*/
export function createTemper(scene, data) {
    // 遍历数据生成gui
    data.forEach((item, index) => {
        //   创建mesh
        let wsd = new MeshBuilder.CreateSphere(`wsd_${index}`, { diameter: 0.02 }, scene)
        wsd.position = new Vector3(item.vector.x, item.vector.y, item.vector.z)
        wsd.visibility = 0 //默认看不见
        wsd.isPickable = false
        // wsd.setEnabled(false) //默认隐藏

        // 创建平面
        let wsd_plane = new MeshBuilder.CreatePlane(`wsd${index}_plane`, { height: 0.15, width: 0.2 }, scene)
        wsd_plane.parent = wsd
        wsd_plane.position.y = 0.1;
        wsd_plane.billboardMode = Mesh.BILLBOARDMODE_ALL; //广告牌模式gui始终面向相机

        // 创建纹理模式GUI
        let wsd_Texture = AdvancedDynamicTexture.CreateForMesh(wsd_plane, 1024/*纹理宽度*/, 768/*纹理高度*/, false/*纹理是否捕捉移动事件*/);
        wsd_Texture.name = 'wsdTexture'
        // 创建容器
        let wsd_Container = new Rectangle()
        wsd_Container.name = `wsd_Container_${index}`
        wsd_Container.width = 1;
        wsd_Container.height = 1;
        wsd_Container.color = "#409eff";
        wsd_Container.thickness = 40; //边框宽度
        wsd_Container.background = "#212324b5";
        wsd_Container.cornerRadius = 25;
        wsd_Texture.addControl(wsd_Container);

        // 创建文字
        let title = new TextBlock()
        title.name = `wsd${index}_title`
        title.text = item.name
        title.color = 'white'
        title.fontSize = 120;
        title.top = '-230px'
        title.fontWeight = 800
        wsd_Container.addControl(title);

        let wd = new TextBlock()
        wd.name = `wsd${index}_wd`
        wd.text = `温度:${item.wd}℃`
        wd.color = 'white'
        wd.fontSize = 100;
        wd.top = '0px'
        wsd_Container.addControl(wd);

        let sd = new TextBlock()
        sd.name = `wsd${index}_sd`
        sd.text = `湿度:${item.sd}%`
        sd.color = 'white'
        sd.fontSize = 100;
        sd.top = '200px'
        wsd_Container.addControl(sd);
    })
}

/* 
漏水GUI

@scene 场景
*/
export function createWater(scene) {
    // 获取空调mesh
    // let airReg = new RegExp('^air_')
    scene.meshes.forEach((item, index) => {
        if (/^air.*clone$/.test(item.name)) {
            console.log(item, 'hhhh')
            // 创建平面
            let waterPlane = new MeshBuilder.CreatePlane(`${item.name}_Plane`, { height: 0.15, width: 0.15 }, scene)
            waterPlane.parent = item
            waterPlane.position.y = -0.2;
            waterPlane.billboardMode = Mesh.BILLBOARDMODE_ALL; //广告牌模式gui始终面向相机
            waterPlane.isPickable = false
            waterPlane.setEnabled(false)

            // 创建纹理模式GUI
            let waterTexture = AdvancedDynamicTexture.CreateForMesh(waterPlane, 1024/*纹理宽度*/, 1024/*纹理高度*/, false/*纹理是否捕捉移动事件*/);
            waterTexture.name = `${item.name}_lsTexture`

            // 默认漏水图标
            let ls = new Image(`${item.name}_ls`, lsImage);
            ls.width = 1;
            ls.height = 1;
            ls.rotation = 3.14

            // 漏水告警图标
            let ls_red = new Image(`${item.name}_ls_red`, lsRedImage);
            ls_red.width = 1;
            ls_red.height = 1;
            ls_red.rotation = 3.14
            ls_red.isVisible = false //默认不显示

            waterTexture.addControl(ls);
            waterTexture.addControl(ls_red);
        }
    })
}


/*
首页告警信息图片GUI

@scene 场景
@data 首页告警数据
*/
export function homeAlarmGUI(scene, data) {
    //    根据告警信息动态给相应的模型添加告警信息警示图片
    data.forEach(item => {
        let tipMesh;
        let alarmPlane = new MeshBuilder.CreatePlane('homeTips_Plane', { height: 0.05, width: 0.05 }, scene)
        // 判断未处理状态
        if (item.handle_status == '未处理') {
            if (/^rack_/.test(item.model_name)) {
                tipMesh = scene.getTransformNodeByName(item.model_name)
                alarmPlane.position = new Vector3(tipMesh.absolutePosition.x, 0.031, tipMesh.absolutePosition.z);
                alarmPlane.rotation.x = Math.PI
            } else if (/^pdu_/.test(item.model_name)) {
                tipMesh = scene.getMeshByName(item.model_name)
                alarmPlane.position = new Vector3(tipMesh.absolutePosition.x, 0.08, tipMesh.absolutePosition.z);
                alarmPlane.rotation.x = Math.PI
            } else if (/^air_/.test(item.model_name)) {
                tipMesh = scene.getMeshByName(item.model_name)
                alarmPlane.position = new Vector3(tipMesh.absolutePosition.x, 0.031, tipMesh.absolutePosition.z);
                alarmPlane.rotation.x = Math.PI
            }
        }

        // console.log(tipMesh, 'alarm');
        alarmPlane.renderingGroupId = 3
        // alarmPlane.parent = tipMesh
        // alarmPlane.position = tipposition;
        // alarmPlane.position.y = -0.025
        alarmPlane.billboardMode = Mesh.BILLBOARDMODE_ALL; //广告牌模式gui始终面向相机
        alarmPlane.isPickable = false
        // alarmPlane.setEnabled(false)

        // 创建纹理模式GUIAdvancedDynamicTextureMaterial 
        let alarmTexture = AdvancedDynamicTexture.CreateForMesh(alarmPlane, 1024/*纹理宽度*/, 1024/*纹理高度*/, false/*纹理是否捕捉移动事件*/);
        alarmTexture.name = 'alarmTipsTexture'

        // 紧急警示图标
        let level1 = new Image(`level1`, level1Img);
        level1.width = 1;
        level1.height = 1;
        level1.rotation = 3.14

        // 重要警示图标
        let level2 = new Image(`level2`, level2Img);
        level2.width = 1;
        level2.height = 1;
        level2.rotation = 3.14

        // 重要警示图标
        let level3 = new Image(`level3`, level3Img);
        level3.width = 1;
        level3.height = 1;
        level3.rotation = 3.14

        // 重要警示图标
        let level4 = new Image(`level4`, level4Img);
        level4.width = 1;
        level4.height = 1;
        level4.rotation = 3.14


        if (item.alarm_level == 1) {
            alarmTexture.addControl(level1);
        } else if (item.alarm_level == 2) {
            alarmTexture.addControl(level2);
        } else if (item.alarm_level == 3) {
            alarmTexture.addControl(level3);
        } else if (item.alarm_level == 4) {
            alarmTexture.addControl(level4);
        }
    })
}



/*烟感GUI

@scene 场景
@data 烟感告警数据
*/
export function smokeGui(scene, data) {
    data.forEach(item => {
        let tipMesh;
        let alarmPlane = new MeshBuilder.CreatePlane('smokeTips_Plane', { height: 0.003, width: 0.003 }, scene)
        if (item.status == '异常') {
            tipMesh = scene.getMeshByName(`${item.name}_clone`)
            // console.log(tipMesh);
            // 创建平面
            alarmPlane.position.y = -0.003;
            alarmPlane.renderingGroupId = 3
            alarmPlane.parent = tipMesh
            // alarmPlane.position = tipposition;
            // alarmPlane.position.y = -0.025
            alarmPlane.billboardMode = Mesh.BILLBOARDMODE_ALL; //广告牌模式gui始终面向相机
            alarmPlane.isPickable = false

            // 创建纹理模式GUIAdvancedDynamicTextureMaterial 
            let alarmTexture = AdvancedDynamicTexture.CreateForMesh(alarmPlane, 1024/*纹理宽度*/, 1024/*纹理高度*/, false/*纹理是否捕捉移动事件*/);
            alarmTexture.name = 'alarmTipsTexture'

            let level1 = new Image(`level1`, level1Img);
            level1.width = 1;
            level1.height = 1;
            level1.rotation = 3.14
            alarmTexture.addControl(level1);
        }
    })
}