<template>
  <tr>
    <td class="custom-table__cell" v-for="cell in cells" :key="cell">
      {{ cell }}
    </td>
    <td class="custom-table__cell" v-if="hasSomeExpandedRow">
      <button v-if="hasCurrentExpand" @click="toggleExpandContent">toggle</button>
    </td>
  </tr>
  <tr v-if="isShowExpandContent && !!hasCurrentExpand">
    <td :colspan="cellsCount">
      <slot name="expand" />
    </td>
  </tr>
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
    hasSomeExpandedRow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    additionalCellsCount() {
      let additionalCellsCount = 0;

      if (this.hasCurrentExpand) {
        additionalCellsCount += 1;
      }

      return additionalCellsCount;
    },
    cellsCount() {
      return Object.values(this.cells).length + this.additionalCellsCount;
    },
    hasCurrentExpand() {
      return !!this.$slots.expand;
    },
  },
  methods: {
    toggleExpandContent() {
      this.isShowExpandContent = !this.isShowExpandContent;
    },
  },
};
</script>
