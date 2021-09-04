<template>
  <tr>
    <td
      class="custom-table__cell"
      v-for="cell in cells"
      :key="cell"
      @click="isShowExpandContent = !isShowExpandContent"
    >
      {{ cell }}
    </td>
  </tr>
  <template v-if="!!$slots.expand">
    <tr v-if="isShowExpandContent">
      <td :colspan="cellsCount">
        <slot name="expand" />
      </td>
    </tr>
  </template>
</template>
<script>
export default {
  data() {
    return {
      isShowExpandContent: false,
    };
  },
  props: {
    cells: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cellsCount() {
      return Object.values(this.cells).length;
    },
  },
};
</script>
