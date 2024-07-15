<script setup>
import { RouterView } from 'vue-router'

import NavBar from './components/navbar/NavBar.vue'
</script>
<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>
