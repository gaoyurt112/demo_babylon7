import request from '@/utils/request'

// 获取树状表接口
export function getTreeData(params) {
    return request({
        url: `/device/deviceResultBySearch`,
        method: 'get',
        params: params
    })
}


export function getRackData(params) {
    return request({
        url: `/device/getTheCabinetDevices?rackName=${params}`,
        method: 'get',
    })
}


