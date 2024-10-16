<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <CityNameInput v-model="cityName" />
        <SearchButton @click="fetchData" />
      </el-header>
      <el-main>
        <el-row :gutter="24" class="outer-row">
          <el-col :span="16">
            <el-row :gutter="24" class="inner-row">
              <el-col :span="8">
                <div class="grid-content ep-bg-purple">
                  <el-text class="mx-1">{{ generalInfo }}</el-text>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ep-bg-purple">
                  <Environment ref="EnvironmentRef" />
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content ep-bg-purple" />
              </el-col>
            </el-row>
            <el-row :gutter="24" class="inner-row">
              <el-col :span="8">
                <div class="grid-content ep-bg-purple" />
              </el-col>
              <el-col :span="8">
                <div class="grid-content ep-bg-purple" />
              </el-col>
              <el-col :span="8">
                <div class="grid-content ep-bg-purple" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ep-bg-purple">
              <gaodeMap ref="gaodeMapRef" />
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import CityNameInput from './components/CityNameInput.vue';
import SearchButton from './components/SearchButton.vue';
import gaodeMap from './components/gaodeMap.vue';
import Environment from './components/Environment.vue';
import { fetchGeneralInfo } from './api/FetchGeneralInfo.js';

const cityName = ref('');
const generalInfo = ref('');
const gaodeMapRef = ref(null);
const EnvironmentRef = ref(null);
provide("cityName", cityName);
let LngLat = null;

async function fetchData() {
  LngLat = await gaodeMapRef.value.getLngLatAndDrawBounds()
  console.log(LngLat);
  EnvironmentRef.value.getEnvironment(LngLat);
  generalInfo.value = await fetchGeneralInfo(cityName.value);
}
</script>

<style>
.common-layout {
  height: 100%;
  width: 100%;
  background-color: rgb(154, 199, 255);
}

.el-container {
  height: 100%;
  width: 100%;
}

.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  height: 20%;
}

.el-main {
  min-height: 400px;
  height: 80%;
}

.el-text {
  color: black;
}

.el-row {
  padding: 1rem;
}

.outer-row {
  height: 100%;
}

.inner-row {
  height: 50%;
}

.el-row:last-child {
  padding-bottom: 0;
}

.el-row:first-child {
  padding-top: 0;
}

.el-col {
  height: 100%;
  border-radius: 4px;
}

.grid-content {
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  min-height: 36px;
  height: 100%;
  width: 100%;
  overflow: auto; /* 当内容溢出时启用滚动条 */
}

.el-text{
  height: 100%;
}
</style>