<template>
  <div id="container"></div>
</template>

<script setup>
import { inject, onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { key, sCode } from "@/api/gaodeMapConfig.js";

const map = ref(null);
const cityName = inject("cityName");
let district = null;
let polygon;
let AMap = null;
let Lng;
let Lat;
//画出边界并找到城市center经纬度
async function getLngLatAndDrawBoundsFn() {
  if (!district) {
    let opts = {
      subdistrict: 0,
      extensions: 'all',
      level: 'district',
    };
    district = new AMap.DistrictSearch(opts);
  }
  console.log("开始定位" + cityName.value);
  district.setLevel("district");
  const result = await new Promise((resolve, reject) => {
    district.search(cityName.value, function (status, result) {
      if (status === "complete") {
        resolve(result);
      } else {
        reject('搜索失败，请正确填写名称或更新其他名称');
      }
    });
  });
  if (polygon) {
    map.value.remove(polygon);
    polygon = null;
  }
  if (!result || !result.districtList || !result.districtList[0]) {
    console.warn('请正确填写名称或更新其他名称');
    return;
  }
  let bounds = result.districtList[0].boundaries;
  Lng = result.districtList[0].center.lng;
  Lat = result.districtList[0].center.lat;
  if (bounds) {
    for (let i = 0; i < bounds.length; i++) {
      bounds[i] = [bounds[i]];
    }
    polygon = new AMap.Polygon({
      strokeWeight: 1,
      path: bounds,
      fillOpadistrict: 0.4,
      fillColor: '#80d8ff',
      strokeColor: '#0091ea',
    });
    map.value.add(polygon);
    map.value.setFitView(polygon);
  }
  return { Lng, Lat };
};

//获取天气
async function getWeatherFn() {
  let Weather = new AMap.Weather();
  const weather = await new Promise((resolve, reject) => {
    Weather.getLive(cityName.value, function (err, data) {
      if (!err) {
        resolve(data);
      }
      else {
        reject("天气获取失败");
      }
    });
  });
  const weatherTable = [
    {
      prop: "数据时间",
      data: weather.reportTime
    },
    {
      prop: "温度",
      data: weather.temperature
    },
    {
      prop: "天气",
      data: weather.weather
    },
    {
      prop: "风向",
      data: weather.windDirection
    },
    {
      prop: "风力",
      data: weather.windPower
    },
  ]
  console.log(weather);
  return weatherTable;
}

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: sCode,
  };
  AMapLoader.load({
    key: key,
    version: "2.0",
    plugins: ["AMap.DistrictSearch", "AMap.Weather"],
  })
    .then((Amap) => {
      AMap = Amap;
      //初始化地图
      map.value = new AMap.Map("container", {
        zoom: 10,
        center: [116.397428, 39.90923],
      });
    })


});

onUnmounted(() => {
  map.value?.destroy();
});

defineExpose({
  getLngLatAndDrawBounds: getLngLatAndDrawBoundsFn,
  getWeather: getWeatherFn,
});
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>