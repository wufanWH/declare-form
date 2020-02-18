<template>
  <div class="radio-li-container">
    <div class="state-type">
      <li v-for="(item, index) in data" :key="index" @click="currentHandle(index, item)" :class="{ liBackground : dictSelected === index }">
        <slot name="dict-label" :scope="item"></slot>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      dictSelected: null
    }
  },
  methods: {
    currentHandle (index, item) {
      this.dictSelected = index
      var val = {
        currentIdx: index,
        currentSelect: item
      }
      this.$emit('click', val)
    }
  }
}
</script>

<style lang="scss">
.radio-li-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  .white-font {
    color: #fff
  }
  .grey-font {
    color: #666
  }
  .liBackground {
    color: #fff !important;
    border-color: #83c8fb;
    background-color: #83c8fb;
  }
  .state-type {
    margin: 15px 0;
    font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.847058823529412);
    line-height: 24px;
  }
  .state-type li{
    width: 100%;
    font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
    border: 0px solid #dcdfe6;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.647058823529412);
    border-radius: 3px;
    cursor: pointer;
    list-style: none;
    display: inline-block;
    line-height: 35px;
    border-bottom: 1px solid #efefef;
  }
  .state-type li:hover {
    background: #c6ecf9;
  }
  .liBackground:hover {
    color: #009ddd !important;
  }
}
</style>
