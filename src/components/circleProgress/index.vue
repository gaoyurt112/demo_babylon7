<template>
    <div class="progress">
        <svg :style="{ transform: clockWise ? 'rotateY(0deg)' : 'rotateY(180deg)' }" xmlns="http://www.w3.org/2000/svg"
            width="100%" height="100%" viewBox="0 0 400 400">
            <!-- 底部背景圆环 -->
            <circle cx="200" cy="200" :r="radius" :stroke="bgRingColor" :stroke-width="strokeWidth" fill="none" />
            <!-- 进度条圆环 -->
            <circle class="progress-bar" cx="200" cy="200" :r="radius" :stroke="ringColor" :stroke-width="strokeWidth"
                :stroke-linecap="strokeLinecap" fill="none" transform="rotate(-90, 200, 200)"
                :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" />
            <!-- 环形分割细线 -->
            <circle cx="200" cy="200" :r="radius" stroke="#071727" fill="transparent" :stroke-width="strokeWidth + 2"
                :stroke-dasharray="strokeDasharray1" transform="rotate(-90, 200, 200)"></circle>
        </svg>
        <!-- 中间描述文字 -->
        <div class="progress-desc">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "Progress",
    props: {
        rate: {
            type: Number,
            default: 0,
        },
        bgRingColor: {
            type: String,
            default: "#25b489",
        },
        ringColor: {
            type: String,
            default: "#67C23A",
        },
        strokeLinecap: {
            type: String,
            default: "round",
        },
        strokeWidth: {
            type: Number,
            default: 20,
        },
        part: {
            type: Number,
            default: 20,
        },
        partGap: {
            type: Number,
            default: 12,
        },
        // showGradient: {
        //     type: Boolean,
        //     default: false,
        // },
        clockWise: {
            type: Boolean,
            default: true,
        },
        // gradient: {
        //     type: Object,
        //     default: () => {
        //         return {
        //             id: "svg-linear-gradient",
        //             x1: "0%",
        //             y1: "0%",
        //             x2: "0%",
        //             y2: "100%",
        //             colorStops: [
        //                 {
        //                     offset: "0%",
        //                     color: "yellow",
        //                 },
        //                 {
        //                     offset: "100%",
        //                     color: "orange",
        //                 },
        //             ],
        //         };
        //     },
        // },
    },
    computed: {
        radius() {
            return 200 - this.strokeWidth / 2;
        },
        strokeDasharray() {
            let value = 0;
            /* 
              当stroke-linecap的值为round时，结尾处会向外延伸描边宽度的一半
              首尾两个端点，所以就是描边的宽度
            */
            if (this.strokeLinecap === "round") {
                value = 2 * Math.PI * this.radius + this.strokeWidth;
            } else {
                value = 2 * Math.PI * this.radius;
            }
            return value;
        },
        strokeDashoffset() {
            let val = 0;
            let rate = this.rate;
            if (rate > 1) {
                rate = 1;
            } else if (rate < 0) {
                rate = 0;
            }
            if (this.strokeLinecap === "round") {
                val = 2 * Math.PI * this.radius * (1 - rate) + this.strokeWidth;
            } else {
                val = 2 * Math.PI * this.radius * (1 - rate);
            }
            return val;
        },
        strokeDasharray1() {
            var partLength = (2 * Math.PI * this.radius) / this.part;
            return `${this.partGap} ${partLength - this.partGap}`;
        },
    },
};
</script>
<style scoped>
.progress {
    position: relative;
    width: 100%;
    height: 100%;
}

.progress-desc {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "Microsoft YaHei";
    font-size: 20px;
    text-align: center;
}

.progress-bar {
    transition: stroke-dashoffset 2s ease;
}
</style>