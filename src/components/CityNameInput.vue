<template>
    <el-input v-model="cityName" placeholder="请输入城市名" /> 
</template>

<script lang="ts" setup>
import { inject } from 'vue';
const cityName=inject("cityName");
</script>

<style>
.el-input{
    margin: 1rem;
    max-width: 600px;
    width: 60%;
}
</style>