import request from '@/utils/request'

export function getwsdData() {
    return request({
        url: `/environmental/temperatureHumidity`,
        method: 'get',
    })
}