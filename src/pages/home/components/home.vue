<template>
    <div class="left_container" :class="{ 'slide-in': isEntering, 'slide-out2': isLeaving }">
        <!-- 设备概况 -->
        <PopOver class="sbgk" title='设备概况'>
            <div class="sbgk_container">
                <div class="sbgk_item">
                    <div class="icon jg_icon"></div>
                    <div class="content">
                        <div class="title">机柜</div>
                        <div class="number">{{ deviceData.jg }}</div>
                        <div class="dw">台</div>
                    </div>
                </div>
                <div class="sbgk_item">
                    <div class="icon fwq_icon"></div>
                    <div class="content">
                        <div class="title">服务器</div>
                        <div class="number">{{ deviceData.server }}</div>
                        <div class="dw">台</div>
                    </div>
                </div>
                <div class="sbgk_item" style="margin-top: 10px;">
                    <div class="icon lyq_icon"></div>
                    <div class="content">
                        <div class="title">路由器</div>
                        <div class="number">{{ deviceData.route }}</div>
                        <div class="dw">台</div>
                    </div>
                </div>
                <div class="sbgk_item" style="margin-top: 10px;">
                    <div class="icon jhj_icon"></div>
                    <div class="content">
                        <div class="title">交换机</div>
                        <div class="number">{{ deviceData.jhj }}</div>
                        <div class="dw">台</div>
                    </div>
                </div>
            </div>
        </PopOver>
        <!-- 动环资产 -->
        <PopOver class="dhzc" title="动环资产">
            <div class="dhzc_container">

                <div class="dhzc_container_item" v-for="(item, index) in dhzcData" :key="index">
                    <div class="title">{{ item.title }}</div>
                    <div class="jdt">
                        <div class="dotLine">
                            <div class="dotBox" :style="{ left: (item.value / deviceTotal) * 100 + '%' }">
                                <div class="ripples dhLAN">
                                    <div class="ripples2 dhLAN">
                                    </div>
                                </div>
                                <div class="circle circleLAN"></div>
                            </div>
                        </div>
                        <!-- 进度条 -->
                        <div class="line" :style="{ width: (item.value / deviceTotal) * 100 + '%' }"></div>
                        <!-- 数字 -->
                        <div class="number" :style="{ left: (item.value / deviceTotal) * 100 + 5 + '%' }">{{ item.value }}
                        </div>
                    </div>
                </div>

            </div>
        </PopOver>
        <!-- UPS -->
        <PopOver class="ups" title="UPS">
            <div class="ups_container">
                <div class="ups_item">
                    <div class="icon dy_icon"></div>
                    <div class="content">
                        <div class="title">电压</div>
                        <div class="number1">500.4V</div>
                        <div class="number2">500.4V</div>
                    </div>
                </div>
                <div class="ups_item">
                    <div class="icon pl_icon"></div>
                    <div class="content">
                        <div class="title">频率</div>
                        <div class="number1">50Hz</div>
                        <div class="number2">50Hz</div>
                    </div>
                </div>
                <div class="ups_item" style="margin-top: 10px;">
                    <div class="icon dcrl_icon"></div>
                    <div class="content">
                        <div class="title">电池容量</div>
                        <div class="number1">500.4V</div>
                        <div class="number2">500.4V</div>
                    </div>
                </div>
                <div class="ups_item" style="margin-top: 10px;">
                    <div class="icon dcwd_icon"></div>
                    <div class="content">
                        <div class="title">电池温度</div>
                        <div class="number1">20.5℃</div>
                    </div>
                </div>
            </div>
        </PopOver>
    </div>
    <div class="right_container" :class="{ 'slide-in': isEntering, 'slide-out': isLeaving }">
        <!-- 运行环境 -->
        <PopOver class="yxhj" title="运行环境">
            <div class="yxhj_container">
                <div class="yxhj_item jgdl">
                    <div class="title">机柜电流</div>
                    <div class="content">200.5A</div>
                </div>
                <div class="yxhj_item wd">
                    <div class="title">温度</div>
                    <div class="content">{{ yxhjData.tempreture }}℃</div>
                </div>
                <div class="yxhj_item qtdl" style="margin-top: 15px;">
                    <div class="title">其他电流</div>
                    <div class="content">200.5A</div>
                </div>
                <div class="yxhj_item sd" style="margin-top: 15px;">
                    <div class="title">湿度</div>
                    <div class="content">{{ yxhjData.wet }}%</div>
                </div>
            </div>
        </PopOver>
        <!-- 告警列表 -->
        <PopOver class="gjlb" title="告警列表">
            <div class="gjlb_container">
                <div class="table_header">
                    <div class="table_header_item xh">序号</div>
                    <div class="table_header_item gjsj">告警事件</div>
                    <div class="table_header_item level">等级</div>
                    <div class="table_header_item time">告警时间</div>

                </div>
                <div class="table_body">
                    <div class="table_body_item" v-for="(item, index) in alarmList" :key="index"
                        @click="alarmItemClick(item.model_name)">
                        <div class="table_body_content xh">{{ item.data_id }}</div>
                        <div class="table_body_content gjsj">{{ item.alarm_things }}</div>
                        <div class="table_body_content level">{{ (item.alarm_level == '1' && '紧急') || (item.alarm_level ==
                            '2'
                            && '重要') || (item.alarm_level == '3' && '一般') || (item.alarm_level == '4' && '提醒') }}</div>
                        <div class="table_body_content time">{{ item.operate_time }}</div>
                    </div>
                </div>
            </div>
        </PopOver>
        <!-- 告警统计 -->
        <PopOver class="gjtj" title="告警统计">
            <div class="gjtj_container" id="gjtj_container"></div>
        </PopOver>
    </div>
    <DevicePop style="position: absolute;top: 10%;left: 57%;" v-if="tcStatus" @closePop="deviceClose">

    </DevicePop>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, reactive, computed, provide, onBeforeUnmount } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
// 引入ui组件
import PopOver from '@/components/popOver/index.vue'
import DevicePop from '@/components/devicePop/index.vue'
// 引入highCharts
import Highcharts from "highcharts/highstock"
// 引入相机动画
import { cameraFly } from '@/core/animation.js'
// 引入模型拾取函数
import { homePicker } from '@/core/picker'
// 引入接口
import { homeData } from '@/api/home.js'
// 引入gui
import { homeAlarmGUI } from '@/utils/GUI.js'
// 高亮方法
import { slelectHighLight, multiHighLight } from '@/core/highLight.js'
import { Color3, Vector3 } from '@babylonjs/core'

export default defineComponent({
    // 注册组件
    name: 'home',
    components: {
        PopOver,
        DevicePop
    },
    setup() {
        // 进入动画
        let isEntering = ref(false)
        // 离开动画
        let isLeaving = ref(false)

        // 从store中获取loaded
        const store = loadStore()
        const { loaded } = storeToRefs(store)

        // 接收父组件传递的场景
        let sceneObj = inject('scene')
        // console.log(sceneObj);

        // 弹窗状态默认不展示
        let tcStatus = ref(false)
        // 传递弹窗状态
        provide('tcStatus', tcStatus)

        // 环形图数据
        let pieData = reactive([
            {
                name: '紧急',
                y: 1,
            },
            {
                name: '重要',
                y: 1,
            },
            {
                name: '一般',
                y: 1,
            },
            {
                name: '提醒',
                y: 1,
            }
        ])

        // 动环资产数据
        let dhzcData = reactive([
            {
                title: 'U  P  S',
                value: 0
            },
            {
                title: '电池组',
                value: 0
            },
            {
                title: '机柜',
                value: 0
            },
            {
                title: '精密空调',
                value: 0
            },
            {
                title: '温湿计',
                value: 0
            },
            {
                title: '漏水',
                value: 0
            },
            {
                title: '摄像头',
                value: 0
            },
            {
                title: '门禁',
                value: 0
            },
            {
                title: '烟感',
                value: 0
            },
        ])

        // 计算设备总数
        let deviceTotal = computed(() => {
            let total = 0
            dhzcData.forEach((item) => {
                total += item.value
            })
            return total
        })

        // 运行环境数据
        let yxhjData = reactive({
            jgdl: '',
            tempreture: '',
            qtdl: '',
            wet: ''
        })

        // 设备概况数据
        let deviceData = reactive({
            jg: 0,
            server: 0,
            route: 0,
            jhj: 0
        })

        // 告警列表数据
        let alarmList = reactive([])

        // 告警列表点击事件
        function alarmItemClick(modelName) {
            console.log(modelName);
            let pickedMesh;
            if (/^air_/.test(modelName)) {
                console.log('选中精密空调');
                pickedMesh = sceneObj.scene.getMeshByName(modelName)
                if (modelName[4] <= 2) {
                    cameraFly(sceneObj.camera, 60, pickedMesh.absolutePosition, 0.6436, -1.5683, 0.7001, () => {
                        tcStatus.value = true
                    })
                } else if (modelName[4] >= 3) {
                    cameraFly(sceneObj.camera, 60, pickedMesh.absolutePosition, 0.6436, 1.5683, 0.7001, () => {
                        tcStatus.value = true
                    })
                }
                slelectHighLight(sceneObj.scene, pickedMesh, new Color3(0, 0.902, 1))
            } else if (/^pdu_[a-z][0-9][0-9]_[ab]$/.test(modelName)) {
                console.log('选中插接箱');
                pickedMesh = sceneObj.scene.getMeshByName(modelName)
                cameraFly(sceneObj.camera, 60, pickedMesh.absolutePosition, 0.3296, -0.0100, 0.7224, () => {
                    tcStatus.value = true
                })
                slelectHighLight(sceneObj.scene, pickedMesh, new Color3(0, 0.902, 1))
            } else if (/^rack_/.test(modelName)) {
                console.log('选中机柜');
                sceneObj.scene.effectLayers[0].removeAllMeshes()
                pickedMesh = sceneObj.scene.getTransformNodeByName(modelName)
                let jgPos = pickedMesh.getHierarchyBoundingVectors().max.add(pickedMesh.getHierarchyBoundingVectors().min).scale(0.5)
                console.log(jgPos);
                cameraFly(sceneObj.camera, 60, jgPos, 0.3296, -0.0100, 0.7224, () => {
                    tcStatus.value = true
                })
                // 遍历node节点下的所有mesh添加高亮
                let meshArr = pickedMesh.getChildMeshes()
                meshArr.forEach(item => {
                    multiHighLight(sceneObj.scene, item, new Color3(0, 0.902, 1))
                })
            }
        }

        // 获取home页数据
        async function getHomeData() {
            const res = await homeData()
            console.log(res);
            // 运行环境数据
            res.data.data.deviceRunInfo.forEach(item => {
                if (item.indexName == '温度') {
                    yxhjData.tempreture = item.indexValue
                } else if (item.indexName == '湿度') {
                    yxhjData.wet = item.indexValue
                }
            })
            // 设备概况数据
            res.data.data.equipTypeNumInfo.forEach(item => {
                if (item.equip_type_name == '机柜') {
                    deviceData.jg = item.count
                } else if (item.equip_type_name == '服务器') {
                    deviceData.server = item.count
                } else if (item.equip_type_name == '"路由器"') {
                    deviceData.route = item.count
                } else if (item.equip_type_name == '"交换机"') {
                    deviceData.jhj = item.count
                }
            })
            // 动环资产数据
            res.data.data.equipTypeNumInfo.forEach(item => {
                dhzcData.forEach(item2 => {
                    if (item2.title.replace(/\s+/g, "") == item.equip_type_name) {
                        item2.value = item.count
                    }
                })
            })
            // 告警列表数据
            // 清空alarmList
            alarmList.length = 0
            res.data.data.equipAlarmList.forEach(item => {
                alarmList.push(item)
            })

            // 告警统计数据
            res.data.data.AlarmLevelNumInfo.forEach(item => {
                pieData.forEach(item2 => {
                    if (item2.name == item.dict_label) {
                        item2.y = item.count
                    }
                })
            })
        }

        // 展示烟感监控pdu
        function displayMonitor(bool) {
            // 烟感组
            sceneObj.scene.transformNodes.find(item => item.name == 'smoke_group').setEnabled(bool)
            // 监控组
            sceneObj.scene.transformNodes.find(item => item.name == 'monitor_group').setEnabled(bool)
            // pdu
            sceneObj.scene.transformNodes.find(item => item.name == 'pdu_group').setEnabled(bool)
            // 管线组
            sceneObj.scene.transformNodes.find(item => item.name == 'others_group').setEnabled(bool)
            // 温湿度传感器
            sceneObj.scene.transformNodes.find(item => item.name == 'tempGroup').setEnabled(bool)
            // 轨道相机
            sceneObj.scene.transformNodes.find(item => item.name == 'monitor_rail').setEnabled(bool)
        }



        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                // console.log('监听到了', newValue, oldValue);
                // 判断是否渲染完毕，路由是否进入
                if (loaded.value) {
                    // setInterval(() => {
                    // 获取首页数据
                    getHomeData()
                    // }, 3000);
                    displayMonitor(true)

                    setTimeout(() => {
                        isEntering.value = true
                    }, 50)
                    pieCharts(pieData)
                    cameraFly(sceneObj.camera, 120, new Vector3(0.177, -0.227, 0.216), 3.0000, 0.7100, 0.5897)
                    homePicker(sceneObj.scene, () => {
                        tcStatus.value = true
                    })

                }
            }, { immediate: true })
        })

        // 监听告警信息列表修改告警信息状态
        watch(alarmList, (newVal, oldVal) => {
            destoryTips()
            homeAlarmGUI(sceneObj.scene, alarmList)
        })

        // 3d环形图
        function pieCharts(data) {
            let quantity = 0; // 总数
            data.forEach((item) => {
                quantity += item.y;
            });

            data.forEach((item) => {
                item.bfb = parseInt((item.y / quantity) * 100);
                // item.h = item.bfb * 1.5 >= 70 ? 70 : item.bfb * 1.5
                item.h = parseInt(0.56 * item.bfb); // 最高高度60，根据比例渲染高度
                // console.log(props.dataList, "dataList----->>>");
            })

            // 修改3d饼图绘制过程
            let each = Highcharts.each,
                round = Math.round,
                cos = Math.cos,
                sin = Math.sin,
                deg2rad = Math.deg2rad;
            Highcharts.wrap(
                Highcharts.seriesTypes.pie.prototype,
                "translate",
                function (proceed) {
                    proceed.apply(this, [].slice.call(arguments, 1));
                    // Do not do this if the chart is not 3D
                    if (!this.chart.is3d()) {
                        return;
                    }
                    var series = this,
                        chart = series.chart,
                        options = chart.options,
                        seriesOptions = series.options,
                        depth = seriesOptions.depth || 0,
                        options3d = options.chart.options3d,
                        alpha = options3d.alpha,
                        beta = options3d.beta,
                        z = seriesOptions.stacking
                            ? (seriesOptions.stack || 0) * depth
                            : series._i * depth;
                    z += depth / 2;
                    if (seriesOptions.grouping !== false) {
                        z = 0;
                    }

                    series.data.forEach(point => {
                        var shapeArgs = point.shapeArgs,
                            angle;
                        point.shapeType = "arc3d";
                        var ran = point.options.h;
                        shapeArgs.z = z;
                        shapeArgs.depth = depth * 0.75 + ran;
                        shapeArgs.alpha = alpha;
                        shapeArgs.beta = beta;
                        shapeArgs.center = series.center;
                        shapeArgs.ran = ran;
                        angle = (shapeArgs.end + shapeArgs.start) / 2;
                        point.slicedTranslation = {
                            translateX: round(
                                cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
                            ),
                            translateY: round(
                                sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
                            ),
                        };
                    })
                }
            );
            (function (H) {
                H.wrap(Highcharts.SVGRenderer.prototype, "arc3dPath", function (proceed) {
                    // Run original proceed method
                    var ret = proceed.apply(this, [].slice.call(arguments, 1));
                    ret.zTop = (ret.zOut + 0.5) / 100;
                    return ret;
                });
            })(Highcharts);

            // 生成不同高度的3d饼图
            let chart = Highcharts.chart("gjtj_container", {
                chart: {
                    type: "pie",
                    animation: false,
                    backgroundColor: "transparent",
                    // margin: [-100, 25, 80, 0],
                    marginLeft: 30,
                    marginTop: -10,
                    options3d: {
                        enabled: true,
                        alpha: 70,
                    },
                    events: {
                        load: function () {
                            var each = Highcharts.each,
                                points = this.series[0].points;
                            points.forEach((p, i) => {
                                p.graphic.attr({
                                    translateY: -p.shapeArgs.ran,
                                });
                                p.graphic.side1.attr({
                                    translateY: -p.shapeArgs.ran,
                                });
                                p.graphic.side2.attr({
                                    translateY: -p.shapeArgs.ran,
                                });
                            });
                        },
                    },
                    options3d: {
                        enabled: true,
                        alpha: 70,
                        beta: 0,
                    },
                },
                legend: {
                    enabled: true, // 关闭图例
                    align: "right", //水平方向位置
                    verticalAlign: "top", //垂直方向位置
                    layout: "vertical",
                    x: 0,
                    y: 30,
                    symbolWidth: 10,
                    symbolHeight: 10,
                    itemMarginBottom: 30,
                    squareSymbol: true,
                    symbolRadius: 0,
                    useHTML: true,
                    labelFormatter: function () {
                        return (
                            '<div style="display: inline-block">' +
                            this.name +
                            '&nbsp;&nbsp;</div><div style="color: #00d7da;display: inline-block">' +
                            ((this.y / quantity) * 100).toFixed(0) + '%' +
                            '&nbsp;&nbsp;</div><div style="color: #00d7da;display: inline-block">' +
                            this.y +
                            '</div>'
                        )
                    },
                    itemStyle: {
                        color: "#f4f4f6",
                        fontSize: '12px',
                    },
                },

                accessibility: {
                    enabled: false,
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        innerSize: 150,
                        cursor: "pointer",
                        depth: 0,
                        opacity: 0.95,
                        size: "100%",
                        dataLabels: {
                            enabled: false,
                        },
                        showInLegend: true,//重点图例显示
                        colors: ["#C22828", "#EAE32A", "#2081BF", "#30C6AB"],
                    },
                },
                title: {
                    text: null,
                },
                //   去除版权信息
                credits: {
                    enabled: false,
                },
                tooltip: {
                    enabled: false,
                },
                series: [
                    {
                        type: "pie",
                        name: "Browser share",
                        data: data,
                    },
                ],
            });
            Highcharts.addEvent(chart, 'redraw', function () {
                var each = Highcharts.each,
                    points = chart.series[0].points;
                points.forEach((p, i) => {
                    // if (i !== 1 && i !== 2) 
                    p.graphic.attr({
                        translateY: -p.shapeArgs.ran
                    });
                    p.graphic.side1.attr({
                        translateY: -p.shapeArgs.ran
                    });
                    p.graphic.side2.attr({
                        translateY: -p.shapeArgs.ran
                    });
                })
            });
        }

        // 弹窗关闭
        function deviceClose() {
            tcStatus.value = false
            cameraFly(sceneObj.camera, 120, new Vector3(0.177, -0.227, 0.216), 3.0000, 0.7100, 0.5897)
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()

            // 删除所有带clone的
            let cloneArr = []
            sceneObj.scene.meshes.forEach((item) => {
                // console.log(item);
                if (/_clone$/.test(item.name)) {
                    cloneArr.push(item)
                }
            })

            // 删除克隆模型
            cloneArr.forEach(item => {
                // console.log(item.name.slice(0, -6));
                // 根据需要删除的模型查找源模型并显示
                let sourceMesh = sceneObj.scene.getMeshByName(item.name.slice(0, -6))
                console.log(sourceMesh, '源mesh');
                sourceMesh.setEnabled(true)
                // 销毁clone模型
                item.dispose()
                console.log(`清除了clone模型` + item.name);
            })

        }

        // 清除所有提示标志
        function destoryTips() {
            // 清除创建的guiplane
            if (sceneObj.scene.getMeshesById('homeTips_Plane')) {
                // 清除警示标记mesh
                let tips = sceneObj.scene.getMeshesById('homeTips_Plane')
                tips.forEach(item => {
                    item.dispose()
                })
                // 清除警示标记贴图
                sceneObj.scene.textures.filter(item => item.name == 'alarmTipsTexture').forEach(item => {
                    item.dispose()
                })
                // 清除警示标记材质
                sceneObj.scene.materials.filter(item => /^AdvancedDynamicTextureMaterial for homeTips_Plane/.test(item.name)).forEach(item => {
                    // console.log(item);
                    item.dispose()
                })
            }
        }

        onBeforeUnmount(() => {
            // 清除标志
            destoryTips()
            // 解绑点击事件
            sceneObj.scene.onPointerPick = null
            // 清除高亮
            sceneObj.scene.effectLayers[0].removeAllMeshes()
            // 关闭弹窗
            tcStatus.value = false,
                displayMonitor(false)
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            dhzcData,
            deviceTotal,
            tcStatus,
            deviceClose,
            yxhjData,
            deviceData,
            alarmList,
            pieData,
            alarmItemClick,
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
::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}

.left_container,
.right_container {
    position: absolute;
    top: 70px;
    width: 385px;
    height: 86%;
    // background-color: rgba(255, 255, 255, 0.13);
    transition: transform 0.5s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.left_container {
    left: 0;
    transform: translateX(-100%);

    // 设备监控
    .sbgk {
        .sbgk_container {
            width: 100%;
            // height: 175px;
            // background-color: rgba(0, 255, 255, 0.418);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: space-between;
            justify-content: space-evenly;
            padding: 10px 0 10px 0;

            .sbgk_item {
                width: 140px;
                height: 64px;
                // background-color: rgba(240, 248, 255, 0.377);
                display: flex;
                justify-content: space-between;

                .icon {
                    width: 70px;
                    height: 100%;
                    // background: url('@/assets/images/home/jg.png') no-repeat;
                }

                .jg_icon {
                    background: url('@/assets/images/home/jg.png') no-repeat;
                }

                .fwq_icon {
                    background: url('@/assets/images/home/fwq.png') no-repeat;
                }

                .lyq_icon {
                    background: url('@/assets/images/home/lyq.png') no-repeat;
                }

                .jhj_icon {
                    background: url('@/assets/images/home/jhj.png') no-repeat;
                }


                .content {
                    width: 65px;
                    height: 100%;

                    .title {
                        width: 100%;
                        height: 30px;
                        font-size: 14px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: left;
                        color: #ffffff;
                        line-height: 30px;
                        letter-spacing: 1.4px;
                    }

                    .number {
                        float: left;
                        height: 34px;
                        font-size: 18px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: left;
                        color: #ffd012;
                        line-height: 34px;
                    }

                    .dw {
                        float: left;
                        height: 34px;
                        font-size: 14px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: left;
                        color: #ffffff;
                        line-height: 34px;
                        margin-left: 15px;
                    }
                }
            }
        }
    }

    // 动环资产
    .dhzc {
        .dhzc_container {
            width: 100%;
            // height: 300px;
            // background-color: rgba(0, 255, 255, 0.418);

            .dhzc_container_item {
                height: 35px;
                width: 100%;
                display: flex;
                justify-content: space-between;

                .title {
                    width: 75px;
                    font-size: 14px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: left;
                    color: #ffffff;
                    line-height: 35px;
                    // background-color: #3ef87c4f;
                    text-align: justify;
                    text-align-last: justify;
                    margin-left: 10px;
                }

                .jdt {
                    width: 240px;
                    height: 100%;
                    // background-color: #ffffff5d;
                    position: relative;
                    margin-right: 50px;
                    display: flex;
                    align-items: center;

                    .dotLine {
                        width: 100%;
                        // background-color: red;
                        height: 3px;
                        position: absolute;
                    }

                    .dotBox {
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 999;
                        top: 2px;

                        .circle {
                            position: absolute;
                            border-radius: 75px;
                            height: 6px;
                            width: 6px;
                        }

                        .circleLV {
                            background: #8EFFCE !important;
                        }

                        .circleLAN {
                            background: #A5E8FF !important;
                        }

                        .ripples {
                            position: absolute;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            // border: 1px solid #A5E8FF;
                            animation: ripplesone 4s linear infinite;
                        }

                        .dhLV {
                            border: 1px solid #8EFFCE !important;
                        }

                        .dhLAN {
                            border: 1px solid #A5E8FF !important;
                        }

                        .ripples2 {
                            position: absolute;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            animation: ripplesone2 4s linear infinite;
                        }

                        @keyframes ripplesone {
                            0% {
                                transform: scale(1);
                                opacity: 0;
                            }

                            50% {

                                transform: scale(1.55);
                                opacity: 1;

                            }

                            100% {

                                transform: scale(1.8);
                                opacity: 0;

                            }
                        }

                        @keyframes ripplesone2 {
                            0% {
                                transform: scale(1);
                                opacity: 0;
                            }

                            50% {

                                transform: scale(1.15);
                                opacity: 1;

                            }

                            100% {

                                transform: scale(1.35);
                                opacity: 0;

                            }
                        }
                    }

                    .line {
                        height: 5px;
                        background-color: #24a8fc;
                        border-radius: 15px;
                    }

                    .number {
                        position: absolute;
                        font-family: '思源';
                        font-size: 14px;
                        font-weight: 400;
                        text-align: left;
                        color: #ffffff;
                        line-height: 35px;
                    }
                }
            }
        }
    }

    // ups
    .ups {
        .ups_container {
            width: 100%;
            // height: 255px;
            // background-color: rgba(0, 255, 255, 0.418);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: space-between;
            justify-content: space-evenly;
            padding: 10px 0 10px 0;

            .ups_item {
                width: 170px;
                height: 90px;
                // background-color: rgba(0, 255, 255, 0.267);

                .icon {
                    float: left;
                    width: 90px;
                    height: 100%;
                    // background: url('@/assets/images/home/ups_电压.png') no-repeat;
                }

                .dy_icon {
                    background: url('@/assets/images/home/ups_电压.png') no-repeat;
                }

                .pl_icon {
                    background: url('@/assets/images/home/ups_频率.png') no-repeat;
                }

                .dcrl_icon {
                    background: url('@/assets/images/home/ups_电池容量.png') no-repeat;
                }

                .dcwd_icon {
                    background: url('@/assets/images/home/ups_电池温度.png') no-repeat;
                }

                .content {
                    float: left;
                    display: flex;
                    flex-direction: column;


                    .title {
                        font-size: 14px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: left;
                        color: #fefefe;
                        line-height: 30px;
                        letter-spacing: 1.4px;
                        // background-color: #ffffff50;
                    }

                    .number1 {
                        font-size: 18px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: left;
                        color: #24a8fc;
                        line-height: 25px;
                        // background-color: #0d7be250;
                    }

                    .number2 {
                        font-size: 18px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: left;
                        color: #FFD012;
                        line-height: 25px;
                        // background-color: #ec202050;
                    }

                }

            }
        }
    }
}

.right_container {
    right: 0;
    transform: translateX(100%);

    // 运行情况
    .yxhj {
        .yxhj_container {
            width: 100%;
            // height: 175px;
            // background-color: rgba(253, 253, 253, 0.418);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding: 15px 0px 15px 0px;


            .yxhj_item {
                width: 174px;
                height: 50px;

                .title {
                    font-size: 14px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #ffffff;
                    letter-spacing: 2.8px;
                    line-height: 38px;
                }

                .content {
                    font-size: 18px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #3ef87b;
                    line-height: 0px;
                }
            }

            .jgdl {
                background: url('@/assets/images/home/机柜电流.png') no-repeat;
            }

            .wd {
                background: url('@/assets/images/home/温度.png') no-repeat;
            }

            .qtdl {
                background: url('@/assets/images/home/其他电流.png') no-repeat;
            }

            .sd {
                background: url('@/assets/images/home/湿度.png') no-repeat;
            }
        }
    }

    // 告警列表
    .gjlb {
        .gjlb_container {
            width: 100%;
            height: 300px;
            // background-color: rgba(0, 255, 255, 0.418);

            .table_header {
                width: 100%;
                height: 40px;
                // background-color: #ffffff50;
                display: flex;

                .table_header_item {
                    height: 100%;
                    font-size: 14px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #3ef8f8;
                    line-height: 40px;
                }

                .xh {
                    width: 10%;
                }

                .gjsj {
                    width: 40%;
                }

                .level {
                    width: 10%;
                }

                .time {
                    width: 40%;
                }
            }

            .table_body {
                width: 100%;
                height: 254px;
                // background-color: #ffffff50;
                overflow: scroll;

                .table_body_item {
                    width: 100%;
                    height: 30px;
                    display: flex;

                    .table_body_content {
                        font-size: 14px;
                        font-family: '思源';
                        font-weight: 400;
                        text-align: center;
                        color: #97f6f6;
                        line-height: 30px;
                    }

                    .xh {
                        width: 10%;
                    }

                    .gjsj {
                        width: 40%;
                    }

                    .level {
                        width: 10%;
                    }

                    .time {
                        width: 40%;
                    }
                }

                .table_body_item:nth-child(2n - 1) {
                    background-color: #3ef8f811;
                }

            }
        }
    }

    // 告警统计
    .gjtj {
        .gjtj_container {
            width: 100%;
            height: 255px;
            background: url('@/assets/images/home/piebg.png') no-repeat;
            background-position-x: -55px;
            background-position-y: 25px;
        }
    }
}

.slide-in {
    transform: translateX(0);
}

.slide-out {
    transform: translateX(100%);
}

.slide-out2 {
    transform: translateX(-100%);
}
</style>