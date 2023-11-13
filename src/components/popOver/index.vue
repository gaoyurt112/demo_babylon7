<template>
    <div class="pop">
        <div class="pop_title">
            {{ props.title }}
        </div>
        <div class="pop_content">
            <slot></slot>
        </div>
    </div>
</template>
       
       
<script setup>
// 获取props
import { defineProps } from 'vue'
const props = defineProps(['title'])
// console.log(props.title);


</script>
       
<style lang="scss" scoped >
.pop {
    width: 385px;
    // background-color: antiquewhite;
    // position: absolute;

    .pop_title {
        width: 100%;
        height: 37px;
        background: url('@/assets/images/layout/tc_title.png') no-repeat;
        background-position-y: -92px;
        background-position-x: -5px;
        font-size: 22px;
        font-family: "旁门正道";
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 2.64px;
        padding-left: 85px;
        padding-top: 5px;
        text-align: left;
    }

    .pop_content {
        width: 100%;
        // height: 200px;
        background: url('@/assets/images/layout/tc_body.png') no-repeat;
        background-size: 100% 100%;
    }
}
</style>