<template>
  <component :is="currentRole" />
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
