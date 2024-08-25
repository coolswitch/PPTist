<template>
  <a-layout class="home-layout">
    <a-layout-sider>
      <h1>七牛PPT - 管理后台</h1>
      <a-menu v-model:selectedKeys="selectedKeys" @select="handleMenuChange" theme="dark" mode="inline">
        <template v-for="item in homeRoutes" :key="item.path">
          <a-menu-item v-if="!item.children" :key="item.path">
            <span>{{ item.meta?.title }}</span>
          </a-menu-item>
          <a-sub-menu v-else>
            <template #title>
              <span>
                <span>{{ item.meta?.title }}</span>
              </span>
            </template>
            <a-menu-item v-for="sub in item.children" :key="sub.path">{{ sub.meta?.title }}</a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <div id="home-layout-header-left"></div>
        <a-dropdown>
          <span class="ant-dropdown-link hand">{{ userinfo.name }}</span>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handleLogout">退出</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import homeRoutes from '@/router/home'
import useAuth from '@/hooks/useAuth'

const auth = useAuth()
const router = useRouter()
const selectedKeys = ref<string[]>([''])
const userinfo = auth.getUInfo()

function handleMenuChange(arg: any) {
  router.push('/home/' + arg.keyPath.join('/'))
}

function handleLogout() {
  auth.clear()
  location.reload()
}
</script>

<style>
.home-layout {
  min-height: 100vh;

  h1 {
    font-size: 18px;
    color: #eee;
    text-align: center;
    padding: 16px 0;
  }

  .ant-layout-header {
    padding: 0 16px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    .ant-dropdown-link {
      height: 48px;
    }
  }

  .ant-layout-sider {
    /* background: linear-gradient(180deg, #2d3a4b 0%, #4c7cc3 100%); */
    .ant-menu-sub {
      background: none !important;
    }
  }

  .ant-layout-content {
    margin: 16px;
    background: #fff;
    min-height: 360px;
  }
}
</style>
