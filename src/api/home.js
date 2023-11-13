import request from '@/utils/request'

export function homeData(params) {
    return request({
        url: `/home/index`,
        method: 'get',
        params: params
    })
}