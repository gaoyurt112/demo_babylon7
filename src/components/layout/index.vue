<!-- layout组件 -->
<template>
    <!-- 标题 -->
    <div class="title" :class="{ 'slide-in': isEntering }">
        <div class="title_bg"></div>
        <div class="title_ft">
            <!-- 标题 -->
            <div class="titleInfo">智慧机房数据可视化</div>
        </div>
        <!-- 日期显示 -->
        <div class="dateInfo">
            <span class="date">{{ dateStr }}</span>
            <span class="week">{{ weekStr }}</span>
            <span class="time">{{ timeStr }}</span>
        </div>
        <!-- 切换主题 -->
        <div class="theme" @click="changeTheme()" title="切换风格"></div>

        <!-- 进入系统 -->
        <div class="setting">
            <div class="setting_icon"></div>
            <div class="setting_text">进入后台</div>
        </div>
        <!-- 用户名称 -->
        <div class="userName">
            用户名称
        </div>
        <!-- 退出 -->
        <div class="logout">
        </div>
    </div>
    <!-- 底部菜单 -->
    <div class=" bottom" :class="{ 'slide-in': isEntering }">
        <div class="centerBox">
            <!-- 一级菜单 -->

            <div class="menu">
                <div class="menu_item" :class="firstRoute == 'home' ? 'home_active' : 'home'">
                    <div class="menu_icon" @click="routerPush('/home')">
                    </div>
                    <div class="menu_text">主控面板</div>
                </div>
                <div class="menu_item" :class="firstRoute == 'dljc' ? 'dljc_active' : 'dljc'"
                    @mouseover="dljc_subMenu = true" @mouseleave="dljc_subMenu = false">
                    <div class="menu_icon">
                    </div>
                    <div class="menu_text">动力监测</div>
                    <div class="subMenu" v-if="dljc_subMenu" @mouseleave="dljc_subMenu = false">
                        <div class="subMenu_item" :class="secondRoute == 'cjx' ? 'cjx_active' : 'cjx'"
                            @click="routerPush('/dljc/cjx')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">插接箱</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'ups' ? 'ups_active' : 'ups'"
                            @click="routerPush('/dljc/ups')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">UPS</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'dc' ? 'dc_active' : 'dc'"
                            @click="routerPush('/dljc/dc')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">电池</div>
                        </div>
                    </div>
                </div>
                <div class="menu_item" :class="firstRoute == 'hjjc' ? 'hjjc_active' : 'hjjc'"
                    @mouseover="hjjc_subMenu = true" @mouseleave="hjjc_subMenu = false">
                    <div class="menu_icon">
                    </div>
                    <div class="menu_text">环境监测</div>
                    <div class="subMenu" v-if="hjjc_subMenu" @mouseleave="hjjc_subMenu = false">
                        <div class="subMenu_item" :class="secondRoute == 'wsd' ? 'wsd_active' : 'wsd'"
                            @click="routerPush('/hjjc/wsd')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">温湿度</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'wdyt' ? 'wdyt_active' : 'wdyt'"
                            @click="routerPush('/hjjc/wdyt')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">温度云图</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'ls' ? 'ls_active' : 'ls'"
                            @click="routerPush('/hjjc/ls')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">漏水</div>
                        </div>
                    </div>
                </div>
                <div class="menu_item" :class="firstRoute == 'rljc' ? 'rljc_active' : 'rljc'">
                    <div class="menu_icon" @click="routerPush('/rljc')">
                    </div>
                    <div class="menu_text">容量监测</div>
                </div>

                <div class="menu_item" :class="firstRoute == 'afjc' ? 'afjc_active' : 'afjc'"
                    @mouseover="afjc_subMenu = true" @mouseleave="afjc_subMenu = false">
                    <div class="menu_icon">
                    </div>
                    <div class="menu_text">安防监测</div>
                    <div class="subMenu" v-if="afjc_subMenu" @mouseleave="afjc_subMenu = false">
                        <div class="subMenu_item" :class="secondRoute == 'sp' ? 'sp_active' : 'sp'"
                            @click="routerPush('/afjc/sp')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">视频</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'mj' ? 'mj_active' : 'mj'"
                            @click="routerPush('/afjc/mj')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">门禁</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'yg' ? 'yg_active' : 'yg'"
                            @click="routerPush('/afjc/yg')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">烟感</div>
                        </div>
                    </div>
                </div>
                <div class="menu_item" :class="firstRoute == 'zcss' ? 'zcss_active' : 'zcss'">
                    <div class="menu_icon" @click="routerPush('/zcss')">
                    </div>
                    <div class="menu_text">资产搜索</div>
                </div>
                <div class="menu_item" :class="firstRoute == 'znkz' ? 'znkz_active' : 'znkz'"
                    @mouseover="znkz_subMenu = true" @mouseleave="znkz_subMenu = false">
                    <div class="menu_icon">
                    </div>
                    <div class="menu_text">智能控制</div>
                    <div class="subMenu" v-if="znkz_subMenu" @mouseleave="znkz_subMenu = false">
                        <div class="subMenu_item" :class="secondRoute == 'jg' ? 'jg_active' : 'jg'"
                            @click="routerPush('/znkz/jg')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">机柜</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'gdxj' ? 'gdxj_active' : 'gdxj'"
                            @click="routerPush('/znkz/gdxj')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">轨道相机</div>
                        </div>
                        <div class="subMenu_item" :class="secondRoute == 'jmkt' ? 'jmkt_active' : 'jmkt'"
                            @click="routerPush('/znkz/jmkt')">
                            <div class="subMenu_icon"></div>
                            <div class="subMenu_text">精密空调</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 图层控制 -->
            <div class="layerControl">
                <div :class="mxLayer ? 'mxLyer_active' : 'mxLyer'" title="展示母线" @click="mxLayerControl()"></div>
                <div :class="gxLayer ? 'gxLayer_active' : 'gxLayer'" title="展示光纤" @click="gxLayerControl()"></div>
            </div>
        </div>
    </div>
</template>
       
       
<script>
import { ref, onMounted, defineComponent, watch, onBeforeUnmount } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
// 引入storeToRefs响应式state
import { storeToRefs } from 'pinia'
// 路由跳转
import { useRouter } from "vue-router";
// 引入mitt
import emitter from '@/utils/eventBus.js'

export default defineComponent({
    setup() {
        const router = useRouter()

        // 获取子组件传递场景
        let scene = null
        // // 获取scene
        emitter.on('scene', (val) => {
            console.log(val, 'layout')
            scene = val.scene
        })

        // 获取子组件传递光线组
        let branch = null
        emitter.on('branch', (val) => {
            console.log(val, 'branch')
            branch = val
        })

        // 获取子组件传递母线组
        let mainBus = null
        emitter.on('mainBus', (val) => {
            console.log(val, 'mainBus')
            mainBus = val
            // console.log(mainBus);
        })

        // 从store中获取loaded
        const store = loadStore()
        const { loaded } = storeToRefs(store)

        // 页面加载完成后，显示ui
        let isEntering = ref(false)

        // 监听store中的loaded
        watch(loaded, (newValue, oldValue) => {
            // console.log('监听到了', newValue, oldValue);
            if (newValue == true) {
                //如果渲染完毕加载ui,控制摄像机
                setTimeout(() => {
                    isEntering.value = true
                }, 50)
            }
        })

        onMounted(() => {
            // 获取日期
            getDateAndTime()
            // 清楚定时器
            clearInterval(timer)
            // 每秒更新一次时间
            timer = setInterval(() => {
                getDateAndTime()
            }, 1000)
        })

        // 组件销毁时清除定时器
        onBeforeUnmount(() => {
            clearInterval(timer)
        })

        // 获取当前日期
        let dateStr = ref('')
        let timeStr = ref('')
        let weekStr = ref('')
        // 定时器
        let timer = null

        // 获取日期和时间
        function getDateAndTime() {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let week = date.getDay()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
            let weekArr = ['日', '一', '二', '三', '四', '五', '六']
            let weekstr = weekArr[week]
            dateStr.value = `${year}年${month}月${day}日`
            timeStr.value = `${hour}:${minute}:${second >= 10 ? second : '0' + second}`
            weekStr.value = `星期${weekstr}`
        }

        // 一级路由
        let firstRoute = ref('')
        // 二级路由
        let secondRoute = ref('')
        // 监听路由变化
        watch(router.currentRoute, (newValue, oldValue) => {
            console.log(newValue, oldValue);
            firstRoute.value = newValue.fullPath.split('/')[1]
            secondRoute.value = newValue.name
            console.log(firstRoute.value);
        }, {
            immediate: true
        })

        // 路由跳转
        function routerPush(path) {
            router.push(path)
        }

        // 母线图层状态
        let mxLayer = ref(false)

        // 光纤图层状态
        let gxLayer = ref(false)

        // 展示母线
        function mxLayerControl() {
            mxLayer.value = !mxLayer.value
            if (mxLayer.value) {
                mainBus.setEnabled(true)
            } else {
                mainBus.setEnabled(false)
            }
        }
        // 展示光纤
        function gxLayerControl() {
            gxLayer.value = !gxLayer.value
            if (gxLayer.value) {
                branch.setEnabled(true)
            } else {
                branch.setEnabled(false)
            }
        }

        // 二级菜单弹窗状态
        let dljc_subMenu = ref(false)
        let hjjc_subMenu = ref(false)
        let afjc_subMenu = ref(false)
        let znkz_subMenu = ref(false)

        // 主题状态
        let currentTheme = ref('blue')

        // 主题切换功能
        function changeTheme() {
            // 记录按钮状态
            if (currentTheme.value == 'blue') {
                // 切换
                realTheme()
                currentTheme.value = 'real'
            } else if (currentTheme.value == 'real') {
                blueTheme()
                currentTheme.value = 'blue'
            }
        }


        // 科技蓝主题
        function blueTheme() {
            /**材质修改 */
            // 墙体蓝色
            scene.getTransformNodeByName('wall').getChildMeshes(false).forEach(item => {
                item.material = scene.getMaterialByName('wallMat')
            })
            // 门透明色
            scene.getTransformNodeByName('door').getChildMeshes(false).forEach(item => {
                item.material = scene.getMaterialByName('doorMat')
            })
            // 地板蓝色
            scene.getTransformNodeByName('ground').getChildMeshes(false).forEach(item => {
                if (item.name == 'ground_air_1') {
                    item.material = scene.getMaterialByName('blueGround_air')
                } else if (item.name == 'ground_1') {
                    item.material = scene.getMaterialByName('blueGround')
                }
            })

            /**灯光修改 */

        }

        // 写实主题
        function realTheme() {
            /**材质修改 */
            // 墙体蓝色
            scene.getTransformNodeByName('wall').getChildMeshes(false).forEach(item => {
                item.material = scene.getMaterialByName('lambert4')
            })
            // 门透明色
            scene.getTransformNodeByName('door').getChildMeshes(false).forEach(item => {
                item.material = scene.getMaterialByName('lambert7')
            })
            // 地板蓝色
            scene.getTransformNodeByName('ground').getChildMeshes(false).forEach(item => {
                if (item.name == 'ground_air_1') {
                    item.material = scene.getMaterialByName('lambert13')
                } else if (item.name == 'ground_1') {
                    item.material = scene.getMaterialByName('lambert14')
                }
            })
            /**灯光修改 */
        }


        return {
            isEntering,
            dateStr,
            timeStr,
            weekStr,
            routerPush,
            firstRoute,
            secondRoute,
            mxLayer,
            gxLayer,
            mxLayerControl,
            gxLayerControl,
            dljc_subMenu,
            hjjc_subMenu,
            afjc_subMenu,
            znkz_subMenu,
            currentTheme,
            changeTheme
        }
    }
})




</script>
       
<style lang="scss" scoped>
/* 标题 */
.title {
    width: 100%;
    height: 100px;
    position: absolute;
    transition: transform 0.5s ease-out;
    top: 0px;
    transform: translateY(-100%);
    display: flex;
    justify-content: center;

    .title_bg {
        width: 100%;
        height: 65px;
        background: url('@/assets/images/layout/title_bg.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        z-index: -1;
    }

    .title_ft {
        width: 1200px;
        height: 100%;
        background: url('@/assets/images/layout/title_ft.png') no-repeat;
        position: absolute;
        z-index: -1;
        display: flex;
        z-index: -1;
        justify-content: center;
        align-items: center;

        // 标题
        .titleInfo {
            width: 429px;
            height: 64px;
            // background-color: rgba(255, 255, 255, 0.4039215686);
            font-size: 44px;
            font-family: '旁门正道';
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 64px;
            letter-spacing: 3.3px;
            text-shadow: 4px 5px 3px #08303f;
        }
    }

    // 日期显示
    .dateInfo {
        width: 280px;
        height: 20px;
        // background-color: #f0f8ff61;
        font-size: 14px;
        font-family: '思源';
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        top: 15px;
        left: 0px;

        span {
            margin-right: 20px;
        }
    }

    .theme {
        width: 25px;
        height: 25px;
        background: url('@/assets/images/layout/theme.png') no-repeat;
        background-size: contain;
        position: absolute;
        right: 340px;
        top: 16px;
    }

    // 进入管理系统
    .setting {
        width: 88px;
        height: 25px;
        position: absolute;
        right: 220px;
        top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        .setting_icon {
            width: 20px;
            height: 20px;
            background: url('@/assets/images/layout/setting.png') no-repeat;
            background-size: 100% 100%;
        }

        .setting_text {
            font-size: 14px;
            font-family: '思源';
            font-weight: 400;
            color: #ffffff;

        }
    }

    // 用户名称
    .userName {
        width: 120px;
        height: 25px;
        position: absolute;
        right: 90px;
        top: 15px;
        font-size: 14px;
        font-family: "思源";
        font-weight: 400;
        color: #ffffff;
    }

    // 退出
    .logout {
        width: 75px;
        height: 33px;
        background: url('@/assets/images/layout/exit.png') no-repeat;
        position: absolute;
        right: 0;
        top: 12px;
        cursor: pointer;
    }
}

/* 底部菜单 */
.bottom {
    width: 100%;
    height: 150px;
    position: absolute;
    background: url('@/assets/images/layout/bottom.png') no-repeat;
    /* background-color: #f0f8ff61; */
    background-position-x: center;
    background-position-y: bottom;
    transition: transform 0.5s ease-out;
    bottom: 0px;
    display: flex;
    justify-content: center;
    transform: translateY(100%);

    .centerBox {
        width: 1250px;
        height: 100%;
        // background-color: #ffffff57;
        position: relative;

        // 一级菜单
        .menu {
            width: 960px;
            height: 120px;
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);

            // 一级菜单公共样式
            .menu_item {
                width: 143px;
                height: 100%;
                // background-color: #ffffff94;
                float: left;
                margin-left: -23px;
                cursor: pointer;
                position: relative;

                .menu_icon {
                    width: 100%;
                    height: 96px;
                }

                .menu_text {
                    font-size: 14px;
                    font-family: '旁门正道';
                    font-weight: 400;
                    color: #ffffff;
                    letter-spacing: 1.4px;
                }

                .subMenu {
                    width: 317px;
                    height: 174px;
                    background: url('@/assets/images/layout/subMenu/subMenuBox.png') no-repeat;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: -149px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    .subMenu_item {
                        width: 64px;
                        height: 64px;
                        margin-bottom: 20px;
                        position: relative;

                        .subMenu_icon {
                            width: 100%;
                            height: 100%;
                            // background-color: #ffffff1e;
                            position: absolute;
                        }

                        .subMenu_text {
                            font-size: 14px;
                            font-family: '思源';
                            font-weight: 400;
                            text-align: center;
                            line-height: 90px;
                        }
                    }
                }
            }

            // 主控面板
            .home {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/home.png') no-repeat;
                }
            }

            .home:hover,
            .home_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/home_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }
            }

            // 动力监测
            .dljc {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/dljc.png') no-repeat;
                }
            }

            .dljc:hover,
            .dljc_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/dljc_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }

                // 动力检测子菜单
                .cjx {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/cjx.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .cjx:hover,
                .cjx_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/cjx_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .ups {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/ups.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .ups:hover,
                .ups_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/ups_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .dc {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/dc.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .dc:hover,
                .dc_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/dc_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }



            }

            // 环境监测
            .hjjc {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/hjjc.png') no-repeat;
                }
            }

            .hjjc:hover,
            .hjjc_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/hjjc_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }

                .wsd {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/wsd.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .wsd:hover,
                .wsd_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/wsd_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .wdyt {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/wdyt.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .wdyt:hover,
                .wdyt_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/wdyt_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .ls {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/ls.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .ls:hover,
                .ls_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/ls_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }
            }

            // 容量监测
            .rljc {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/rljc.png') no-repeat;
                }
            }

            .rljc:hover,
            .rljc_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/rljc_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }
            }

            // 安防监测
            .afjc {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/afjc.png') no-repeat;
                }
            }

            .afjc:hover,
            .afjc_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/afjc_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }

                .sp {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/sp.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .sp:hover,
                .sp_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/sp_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .mj {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/mj.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .mj:hover,
                .mj_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/mj_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .yg {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/yg.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .yg:hover,
                .yg_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/yg_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }
            }

            // 资产搜索
            .zcss {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/zcss.png') no-repeat;
                }
            }

            .zcss:hover,
            .zcss_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/zcss_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }
            }

            // 智能控制
            .znkz {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/znkz.png') no-repeat;
                }
            }

            .znkz:hover,
            .znkz_active {
                .menu_icon {
                    background: url('@/assets/images/layout/mainMenu/znkz_active.png') no-repeat;
                }

                .menu_text {
                    color: #fcd364;
                }

                .jg {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/jg.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .jg:hover,
                .jg_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/jg_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .gdxj {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/gdxj.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .gdxj:hover,
                .gdxj_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/gdxj_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }

                .jmkt {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/jmkt.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #78A7A7;
                    }
                }

                .jmkt:hover,
                .jmkt_active {
                    .subMenu_icon {
                        background: url('@/assets/images/layout/subMenu/jmkt_active.png') no-repeat;
                        background-size: 100% 100%;
                    }

                    .subMenu_text {
                        color: #3EF8F8;
                    }
                }
            }
        }

        // 图层控制
        .layerControl {
            // background-color: #ffffff;
            width: 35px;
            height: 80px;
            position: absolute;
            right: 60px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .mxLyer {
                width: 100%;
                height: 35px;
                background: url('@/assets/images/layout/layerControl/mx.png') no-repeat;
                background-size: cover;
            }

            .mxLyer_active {
                width: 100%;
                height: 35px;
                background: url('@/assets/images/layout/layerControl/mx_active.png') no-repeat;
                background-size: cover;
            }

            .gxLayer {
                width: 100%;
                height: 35px;
                background: url('@/assets/images/layout/layerControl/gx.png') no-repeat;
                background-size: cover;
            }

            .gxLayer_active {
                width: 100%;
                height: 35px;
                background: url('@/assets/images/layout/layerControl/gx_active.png') no-repeat;
                background-size: cover;
            }
        }
    }
}

/* 滑入动画 */
.slide-in {
    transform: translateY(0%);
}
</style>