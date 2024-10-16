<template>
    <el-table :data="environmentTable" style="width: 100%">
        <el-table-column prop="prop" label="指标" />
        <el-table-column prop="data" label="值" />
    </el-table>
</template>

<script setup>
import { fetchEnvironment } from '@/api/FetchEnvironment.js';
import { ref } from "vue";

let environmentTable = ref([{
            prop: "空气质量指数",
            data: null
        },
        {
            prop: "空气质量等级",
            data: null
        },
        {
            prop: "PM10浓度(微克/立方米)",
            data: null
        },
        {
            prop: "PM2.5浓度(微克/立方米)",
            data: null
        },
        {
            prop: "二氧化氮浓度(微克/立方米)",
            data: null
        },
        {
            prop: "二氧化硫浓度(微克/立方米)",
            data: null
        },
        {
            prop: "一氧化碳浓度(毫克/立方米)",
            data: null
        },
        {
            prop: "臭氧浓度(微克/立方米)",
            data: null
        },]);

async function getEnvironmentFn(LngLat) {
    const environment = await fetchEnvironment(LngLat);
    console.log(environment);
    environmentTable.value = [
        {
            prop: "空气质量指数",
            data: environment.aqi
        },
        {
            prop: "空气质量等级",
            data: environment.aqi_level
        },
        {
            prop: "PM10浓度，单位: 微克/立方米",
            data: environment.pm10
        },
        {
            prop: "PM2.5浓度，单位: 微克/立方米",
            data: environment.pm25
        },
        {
            prop: "二氧化氮浓度，单位: 微克/立方米",
            data: environment.no2
        },
        {
            prop: "二氧化硫浓度，单位: 微克/立方米",
            data: environment.so2
        },
        {
            prop: "一氧化碳浓度，单位: 毫克/立方米",
            data: environment.co
        },
        {
            prop: "臭氧浓度，单位: 微克/立方米",
            data: environment.o3
        },
    ];
    console.log(environmentTable.value);
}

defineExpose({
    getEnvironment: getEnvironmentFn
});
</script>

<style scoped>
.el-table{
    height: 100%;
}

.el-table-column{
    width: 50%;
}
</style>