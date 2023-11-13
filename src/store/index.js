import { defineStore } from 'pinia'

// 定义一个store
export const loadStore = defineStore('load', {
    state: () => {
        return {
            loaded: false,
        }
    },
}) 