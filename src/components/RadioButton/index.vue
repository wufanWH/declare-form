<template>
  <div class="state-container">
    <el-button type="text" style="color: #666">{{ title }}：</el-button>
    <div class="state-type">
      <li v-for="(item, index) in sortList" :key="index" @click="sortBy(index)"  :class="{ liBackground : sortSelected === index }">
        {{ item }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '标题'
    },
    sortList: {
      type: Array,
      required: true,
      default: () => {}
    },
    sortSelected: {
      type: Number,
      required: true,
      default: 0
    },
    emitFuncName: {
      type: String,
      required: true
    }
  },
  methods: {
    sortBy (index) {
      this.$emit(this.emitFuncName, { currentIdx: index })
    }
  }
}
</script>

<style>
.state-container {
  display: flex;
  flex-direction: row;
}
.white-font {
  color: #fff
}
.grey-font {
  color: #666
}
.liBackground{
  color: #fff !important;
  border-color: #83c8fb;
  background-color: #83c8fb;
}
.state-type {
  margin: 15px;
  font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.847058823529412);
  line-height: 24px;
}
.state-type li{
  font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
  border: 0px solid #dcdfe6;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.647058823529412);
  border-radius: 3px;
  cursor: pointer;
  list-style: none;
  display: inline-block;
  line-height: 35px;
  padding: 0px 12px;
}
.state-type .state {
  display: inline-block;
  width: 40%;
}
</style>
