<template>
  <div class="app-main dashboard-container">
    <pan-thumb :image="avatar" style="float: left">
      <div class="eggs">{{ $t('{name}，你认真工作的样子,真的很赞', { name: 'anles' }) }}</div>
    </pan-thumb>
    <p class="welcome-text">Welcome</p>
    <h2 class="welcome-name">{{ demoName }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PanThumb from '@/components/PanThumb/index.vue'
import { UserModule } from '@/store/modules/user'
import settings from '@/settings'

@Component({
  components: {
    PanThumb,
  },
})
export default class Dashboard extends Vue {
  private get avatar() {
    return UserModule.avatar
  }
  demoName: string = settings.title
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(160deg, #00ffd5 28%, #0767b6 90%);
    .eggs {
      color: #fff;
      font-size: 16px;
    }
    .welcome-text {
      font-size: 68px;
      color: #ffffff;
      background-image: linear-gradient(to right, #00ffd5 20%, #ffffff);
      -webkit-background-clip: text;
      animation: move 3s infinite;
      /*文字颜色设为透明*/
      color: transparent;
      width: 305px;
    }
    @keyframes move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 305px 0;
      }
    }
    .welcome-name {
      margin-top: 20px;
      font-size: 40px;
      color: #fdfdfd;
      font-family: serif;
      text-shadow: 0 3px 6px #272626;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
