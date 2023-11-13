<template>
    <div>
        <div class="door1" :class="{ 'slide-in': isEntering, 'slide-out2': isLeaving }">
            <div class="header">
                门禁1
            </div>
            <div class="gjlb_container">
                <div class="table_header">
                    <div class="table_header_item xh">序号</div>
                    <div class="table_header_item gjsj">人员名称</div>
                    <div class="table_header_item time">进入时间</div>

                </div>
                <div class="table_body">
                    <div class="table_body_item" v-for="(item, index) in passData" :key="index">
                        <div class="table_body_content xh">{{ item.id }}</div>
                        <div class="table_body_content gjsj">{{ item.name }}</div>
                        <div class="table_body_content time">{{ item.time }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="door2" :class="{ 'slide-in': isEntering, 'slide-out': isLeaving }">
            <div class="header">
                门禁2
            </div>
            <div class="gjlb_container">
                <div class="table_header">
                    <div class="table_header_item xh">序号</div>
                    <div class="table_header_item gjsj">人员名称</div>
                    <div class="table_header_item time">进入时间</div>

                </div>
                <div class="table_body">
                    <div class="table_body_item" v-for="(item, index) in passData" :key="index">
                        <div class="table_body_content xh">{{ item.id }}</div>
                        <div class="table_body_content gjsj">{{ item.name }}</div>
                        <div class="table_body_content time">{{ item.time }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, inject, watch, reactive } from 'vue'
// 引入store
import { loadStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
import { cameraFly } from '@/core/animation.js'
import { Vector3 } from '@babylonjs/core'

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

        // 人员进出数据
        let passData = reactive([
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },
            { id: '01', name: '甲XX', time: '2023/10/23 10:00:00' },


        ])


        onMounted(() => {
            watch(loaded, (newValue, oldValue) => {
                if (loaded.value) {
                    cameraFly(sceneObj.camera, 120, new Vector3(0.322, -0.182, -0.112), 2.0553, 3.1413, 1.3000)
                    setTimeout(() => {
                        isEntering.value = true
                    }, 50)
                }
            }, { immediate: true })
        })

        return {
            isEntering,
            isLeaving,
            loaded,
            passData
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

.btn {
    width: 60px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 150px;
    z-index: 999;
}

.door1,
.door2 {
    position: absolute;
    top: 70px;
    width: 392px;
    height: 820px;
    background: url('@/assets/images/anfangjiance/浮框.png') no-repeat;
    background-size: 100% 100%;
    transition: transform 0.5s ease-out;

    .header {
        width: 100%;
        height: 37px;
        font-size: 22px;
        font-family: "旁门正道";
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 2.64px;
        padding-left: 85px;
        padding-top: 5px;
        text-align: left;
    }

    .gjlb_container {
        width: 379px;
        height: 767px;
        // background-color: rgba(0, 255, 255, 0.418);
        margin-left: 9px;

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
            height: 727px;
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


.door1 {
    left: 0;
    transform: translateX(-100%);
}

.door2 {
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
}
</style>