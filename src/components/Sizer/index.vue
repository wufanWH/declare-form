<template>
  <el-card shadow="always">
    <div v-if="search" class="card-header">
      <slot name="card-search"></slot>
    </div>
    <div v-for="i in Math.ceil(content / 2)" :key="i" :class="i === Math.ceil(content / 2) ? 'card-center' : 'card-center-border'">
      <div class="card-center-content">
        <div class="card-center-flex">
          <slot :name="'card-center-' + (i * 2 - 1)"></slot>
        </div>
        <div class="card-center-flex">
          <slot :name="'card-center-' + (i * 2)"></slot>
        </div>
      </div>
    </div>
    <slot name="self-definition"></slot>
    <div class="card-bottom">
      <slot name="card-bottom"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    search: {
      type: Boolean,
      required: false,
      default: false
    },
    content: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: flex-start;
  width: 50%;
  padding: 15px 0;
  border-bottom: #f0f2f5;
  border-bottom-width: 1px;
  border-style: none none dashed none
}
.card-center {
  display: flex;
  flex-direction: column;
}
.card-center-border {
  display: flex;
  flex-direction: column;
  border-bottom: #f0f2f5;
  border-bottom-width: 1px;
  border-style: none none dashed none
}
.card-center-content {
  display: flex;
  flex-direction: row;
  padding: 10px 0px 10px 0px;
  align-items: center;
}
.card-center-flex {
  display: flex;
  flex: 1;
}
.card-bottom {
  display: flex;
}
</style>
