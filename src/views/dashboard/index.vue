<!--
 * @Author: Anles💯
 * @Date: 2020-09-22 10:33:59
 * @LastEditors: Anles💯
 * @LastEditTime: 2020-09-22 17:50:23
 * @Description: 👉
-->
<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard,
  },
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'
}
</script>
