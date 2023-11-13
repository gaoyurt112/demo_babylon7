<template>
    <div class="container">
        <div class="container_title">
            <div class="title">设备名称</div>
            <div class="close" @click="closePop()"></div>
        </div>
        <div class="container_body">
            <!-- 切换菜单 -->
            <div class="switchMenu">
                <div :class="currentMenu == 0 ? 'switchMenu_item active' : 'switchMenu_item'" @click="switchMenu(0)">
                    <div class="icon gjlb"></div>
                    <div class="title">告警列表</div>
                </div>
                <div :class="currentMenu == 1 ? 'switchMenu_item active' : 'switchMenu_item'" @click="switchMenu(1)">
                    <div class="icon yxcs"></div>
                    <div class="title">运行参数</div>
                </div>
                <div :class="currentMenu == 2 ? 'switchMenu_item active' : 'switchMenu_item'" @click="switchMenu(2)">
                    <div class="icon sxxx"></div>
                    <div class="title">属性信息</div>
                </div>
            </div>
            <!-- 告警列表 -->
            <div class="gjlb" v-if="currentMenu == 0">
                <div class="table_header">
                    <div class="table_header_item gjmc">告警名称</div>
                    <div class="table_header_item dj">等级</div>
                    <div class="table_header_item clzt">处理状态</div>
                    <div class="table_header_item time">告警时间</div>

                </div>
                <div class="table_body">
                    <div class="table_body_item">
                        <div class="table_body_content gjmc">xxx告警</div>
                        <div class="table_body_content dj">紧急</div>
                        <div class="table_body_content clzt">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content gjmc">xxx告警</div>
                        <div class="table_body_content dj">紧急</div>
                        <div class="table_body_content clzt">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content gjmc">xxx告警</div>
                        <div class="table_body_content dj">紧急</div>
                        <div class="table_body_content clzt">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content gjmc">xxx告警</div>
                        <div class="table_body_content dj">紧急</div>
                        <div class="table_body_content clzt">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content gjmc">xxx告警</div>
                        <div class="table_body_content dj">紧急</div>
                        <div class="table_body_content clzt">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content gjmc">xxx告警</div>
                        <div class="table_body_content dj">紧急</div>
                        <div class="table_body_content clzt">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                </div>

            </div>
            <!-- 运行参数 -->
            <div class="yxcs" v-if="currentMenu == 1">
                <div class="table_header">
                    <div class="table_header_item csmc">参数名称</div>
                    <div class="table_header_item csz">参数值</div>
                    <div class="table_header_item time">采集时间</div>

                </div>
                <div class="table_body">
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                    <div class="table_body_item">
                        <div class="table_body_content csmc">1</div>
                        <div class="table_body_content csz">已处理</div>
                        <div class="table_body_content time">2023-08-18 14:31:21</div>
                    </div>
                </div>
            </div>
            <!-- 属性信息 -->
            <div class="sxxx" v-if="currentMenu == 2">
                <div class="sxxx_item">
                    <div class="sxxx_item_title">设备编号：</div>
                    <div class="sxxx_item_content">jkidajsfkljfga215645</div>
                </div>
                <div class="sxxx_item">
                    <div class="sxxx_item_title">设备名称：</div>
                    <div class="sxxx_item_content">xx号机柜</div>
                </div>
                <div class="sxxx_item">
                    <div class="sxxx_item_title">电压等级：</div>
                    <div class="sxxx_item_content">220v</div>
                </div>
                <div class="sxxx_item">
                    <div class="sxxx_item_title">设备类型：</div>
                    <div class="sxxx_item_content">设备类型</div>
                </div>
                <div class="sxxx_item">
                    <div class="sxxx_item_title">品牌：</div>
                    <div class="sxxx_item_content">品牌</div>
                </div>
                <div class="sxxx_item">
                    <div class="sxxx_item_title">型号：</div>
                    <div class="sxxx_item_content">型号</div>
                </div>
            </div>
        </div>
    </div>
</template>
       
       
<script setup>
import { ref, inject } from 'vue'

let currentMenu = ref(0)

// 切换选项
const switchMenu = (index) => {
    currentMenu.value = index
}

// 接收父组件传递的数据
let deviceData = inject('tcStatus')

const emit = defineEmits()
// 关闭弹窗事件
const closePop = () => {
    emit('closePop')
}






</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}

.container {
    width: 430px;
    height: 410px;
    background: url('@/assets/images/home/tcbg.png') no-repeat;

    .container_title {
        width: 100%;
        height: 31px;
        // background-color: rgba(250, 235, 215, 0.295);

        .title {
            width: 150px;
            height: 100%;
            margin-left: 35px;
            // background-color: rgba(250, 235, 215, 0.397);
            font-size: 14px;
            font-family: '思源';
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            letter-spacing: 1.68px;
            line-height: 34px;
            float: left;
        }

        .close {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            margin-top: 5px;
            background: url('@/assets/images/home/close.png') no-repeat;
            background-position: center;
            float: right;
            // background-color: rgba(250, 235, 215, 0.315);
            cursor: pointer;
        }
    }

    .container_body {
        width: 100%;
        height: 369px;
        margin-top: 3px;
    }

    .switchMenu {
        width: 100%;
        height: 47px;
        // background-color: rgba(250, 235, 215, 0.356);
        display: flex;

        .switchMenu_item {
            width: 68px;
            height: 45px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            // background-color: rgba(240, 7, 189, 0.205);
            .icon {
                width: 28px;
                height: 28px;
                background-color: antiquewhite;
            }

            .gjlb {
                background: url('@/assets/images/home/告警信息.png') no-repeat;
            }

            .yxcs {
                background: url('@/assets/images/home/运行参数.png') no-repeat;
            }

            .sxxx {
                background: url('@/assets/images/home/属性信息.png') no-repeat;
            }

            .title {
                width: 100%;
                height: 14px;
                font-size: 14px;
                font-family: '思源';
                font-weight: 400;
                text-align: center;
                color: #78A7A7;
                line-height: 17px;
            }
        }

        .active {
            border-bottom: 2px solid aquamarine;
            background-color: #9cfcfc42;

            .title {
                color: #3EF8F8 !important;
            }
        }
    }

    // 告警列表
    .gjlb {
        width: 100%;
        height: 322px;

        // background-color: rgba(219, 133, 20, 0.356);
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

            .gjmc {
                width: 30%;
                text-align: left;
                padding-left: 10px;
            }

            .dj {
                width: 10%;
            }

            .clzt {
                width: 20%;
            }

            .time {
                width: 40%;
            }
        }

        .table_body {
            width: 100%;
            height: 270px;
            // background-color: #ffffff50;
            overflow: scroll;

            .table_body_item {
                width: 100%;
                height: 35px;
                display: flex;

                .table_body_content {
                    font-size: 14px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #97f6f6;
                    line-height: 30px;
                }

                .gjmc {
                    width: 30%;
                    text-align: left;
                    padding-left: 10px;
                }

                .dj {
                    width: 10%;
                }

                .clzt {
                    width: 20%;
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

    // 运行参数
    .yxcs {
        width: 100%;
        height: 322px;
        // background-color: rgba(243, 19, 11, 0.356);

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

            .csmc {
                width: 50%;
                text-align: left;
                padding-left: 10px;
            }

            .csz {
                width: 10%;
            }

            .time {
                width: 40%;
            }
        }

        .table_body {
            width: 100%;
            height: 270px;
            // background-color: #ffffff50;
            overflow: scroll;

            .table_body_item {
                width: 100%;
                height: 35px;
                display: flex;

                .table_body_content {
                    font-size: 14px;
                    font-family: '思源';
                    font-weight: 400;
                    text-align: center;
                    color: #97f6f6;
                    line-height: 30px;
                }

                .csmc {
                    width: 50%;
                    text-align: left;
                    padding-left: 10px;
                }

                .csz {
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

    .sxxx {
        width: 100%;
        height: 322px;
        // background-color: rgba(30, 243, 11, 0.356);

        .sxxx_item {
            width: 100%;
            height: 35px;
            // background-color: #3ef8f848;

            .sxxx_item_title {
                float: left;
                width: 80px;
                height: 100%;
                font-size: 14px;
                font-family: '思源';
                font-weight: 400;
                text-align: right;
                color: #97f6f6;
                line-height: 35px;
            }

            .sxxx_item_content {
                float: left;
                width: 100px;
                height: 100%;
                font-size: 14px;
                font-family: '思源';
                font-weight: 400;
                text-align: left;
                color: #3ef8f8;
                line-height: 35px;
            }

        }
    }

}
</style>