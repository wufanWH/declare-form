<template>
  <div class="dictionary-container" style="min-height: calc(100vh - 64px); background: #f0f2f5">
    <el-container>
      <el-aside width="40%">
        <div class="main-left">
          <div class="main-header">字典类型</div>
          <radio-li :data="radioLiData" @click="handleCurrentLi">
            <template slot="dict-label" slot-scope="scope">
              <span>{{ scope.scope.name }}</span>
            </template>
          </radio-li>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="main-right">
            <div class="main-header">字典详情</div>
            <el-tree
              class="node-style"
              :data="treeData"
              :highlight-current="true"
              @node-click="handleNodeClick">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="custom-tree-item">
                  {{ data.name }}
                </span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => append(node, data)">
                    新增
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => remove(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import radioLi from '@/components/RadioLi'

export default {
  components: { radioLi },
  data () {
    return {
      radioLiData: [],
      treeData: []
    }
  },
  created () {
    this.requestDict()
  },
  methods: {
    handleCurrentLi (val) {
      console.log('********', val)
      this.requestAllSubDict(val.currentSelect.buzzCode)
    },
    handleNodeClick (data) {
      console.log('########', data)
    },
    append (node, data) {

    },
    remove (node, data) {

    },
    // request network
    requestDict () {
      var data = {
        parentId: 0,
        name: ''
      }
      this.$api.dictionary.getDict(data).then(res => {
        if (res.code === 0) {
          this.radioLiData = res.data
        }
      })
    },
    requestAllSubDict (code) {
      var data = {
        buzzCode: code
      }
      this.$api.dictionary.gitAllDictByCode(data).then(res => {
        if (res.code === 0) {
          this.treeData = res.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dictionary-container {
  min-height: calc(100vh - 64px);
  background: #f0f2f5;
  aside {
    margin: 0;
    padding: 20px;
    line-height: 100%;
  }
  .el-main {
    padding: 20px 20px 20px 0;
  }
  .main-header {
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom: 1px #d3d3d3 dotted;
  }
  .main-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    background: #fff;
  }
  .main-right {
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 20px;
    height: 100%;
    background: #fff;
    .node-style {
      width: 100%;
      font-size: 16px;
      margin-top: 15px;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
  }
}
</style>
