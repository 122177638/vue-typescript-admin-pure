<template>
  <div class="app-content">
    <PublicQuery :queryItems="queryItems" v-model="queryParams" @change="onQuery" show-download @download="onDownload">
    </PublicQuery>
    <PublicTable
      :columns="columns"
      :data="data"
      :is-loading="isLoading"
      :pageData="pageData"
      :show-overflow-tooltip="true"
      :isScroll="true"
      @prev="onPrev"
      @next="onNext"
      @query="onQuery"
    >
      <template slot="allreviewed_header">
        <span>通过总数</span>
        <el-tooltip content="人工通过 + 自动通过 + 修正通过" placement="top" effect="light">
          <i class="el-icon-info" aria-hidden="true"></i>
        </el-tooltip>
      </template>
    </PublicTable>
  </div>
</template>

<script lang="ts">
import api from '@/api'
import { IQueryItem } from '@/components/PublicQuery/PublicQuery'
import { ColumnType, IColumnItem } from '@/components/PublicTable/PublicTable'
import PublicTableView, { ITableOptions } from '@/components/PublicTable/PublicTableView'
import PublicTable from '@/components/PublicTable/index.vue'
import PublicQuery from '@/components/PublicQuery/index.vue'
import { Vue, Component } from 'vue-property-decorator'
import { formatRatio } from '@/utils'
@Component({
  components: {
    PublicTable,
    PublicQuery,
  },
})
export default class QueryTable extends PublicTableView {
  protected queryItems: IQueryItem[] = [
    {
      label: '时间范围',
      key: 'daterange',
      type: 'date',
      dateType: 'daterange',
      valueFormat: 'timestamp',
      width: 240,
    },
  ]
  protected columns: IColumnItem[] = [
    { label: '入职日期', prop: 'dateTime' },
    { label: '名字', prop: 'name' },
    { label: '年龄', prop: 'age' },
    { label: '身高(cm)', prop: 'height', formatter: (value) => ({ value: value.match(/^(\d+)cm$/)[1] }) },
    { label: '体重(kg)', prop: 'weight', formatter: (value) => ({ value: value.match(/^(\d+)kg$/)[1] }) },
    { label: '合格率', prop: 'finishRatio', formatter: (value) => ({ value: formatRatio(value, 2, '%') }) },
  ]
  protected getOptions(): ITableOptions {
    return {
      page: 'currPage',
      pageSize: 'limit',
      /** 点击加载更多 */
      isScroll: true,
    }
  }
  protected queryParams = {}
  protected queryMethod = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            dateTime: '2020/09/28',
            name: 'anles',
            age: 18,
            height: '183cm',
            weight: '80kg',
            finishRatio: 45.99,
          },
        ])
      }, 1000)
    })
  protected downloadMethod = () => Promise.resolve()
  protected handleData(data: any) {
    if (Array.isArray(data)) {
      return data
    }
    return []
  }
  protected getQueryParams(params: any) {
    const { daterange, ...reset } = params
    if (daterange) {
      const startTime = daterange[0] / 1000
      const endTime = daterange[1] / 1000
      return {
        startTime,
        endTime,
        ...reset,
      }
    }
    return reset
  }
  public mounted() {
    this.onQuery()
  }
}
</script>

<style></style>
