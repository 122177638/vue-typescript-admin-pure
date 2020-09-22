<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Account from './components/Account.vue'
import Activity from './components/Activity.vue'
import Timeline from './components/Timeline.vue'
import UserCard from './components/UserCard.vue'

export interface IProfile {
  name: string
  email: string
  avatar: string
  roles: string
}

const defaultProfile: IProfile = {
  name: 'Loading...',
  email: 'Loading...',
  avatar: 'Loading...',
  roles: 'Loading...',
}

@Component({
  name: 'Profile',
  components: {
    Account,
    Activity,
    Timeline,
    UserCard,
  },
})
export default class extends Vue {
  private user = defaultProfile
  private activeTab = 'activity'

  get name() {
    return 'anles'
  }

  get email() {
    return '122177638@qq.com'
  }

  get avatar() {
    return 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3863969437,1273856925&fm=26&gp=0.jpg'
  }

  get roles() {
    return 'admin'
  }

  created() {
    this.getUser()
  }

  private getUser() {
    this.user = {
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      roles: this.roles,
    }
  }
}
</script>
