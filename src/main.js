import { createApp } from 'vue'
import router from './router/router.js'
import './style.css'
// 引入字体
import './assets/fonts/font.css'
import App from './App.vue'
// 引入pinia
import { createPinia } from 'pinia'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入highcharts
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);






const pinia = createPinia()
const app = createApp(App)

app.use(router)
// 使用pinia
app.use(pinia)
app.use(ElementPlus)


app.mount('#app')

