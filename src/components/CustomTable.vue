<template>
  <table class="custom-table">
    <thead v-if="headers" class="custom-table__head">
      <tr>
        <td v-for="title in headers" :key="title"
          class="custom-table__cell">
          {{ title }}
        </td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(cells, idx) in rows" :key="idx">
        <custom-table-row :cells="cells">
          <template #expand v-if="!!$slots[`expand-row-${idx}`]">
            <slot :name="`expand-row-${idx}`"/>
          </template>
        </custom-table-row>
      </template>
    </tbody>
  </table>
</template>

<script>
import CustomTableRow from './CustomTableRow.vue';

export default {
  props: {
    headers: {
      type: Array,
      required: false,
      default: null,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  components: {
    CustomTableRow,
  },
};
</script>

<style>
  .custom-table {
    border-collapse: collapse;
    width: 100%;
  }
  .custom-table__head {
    background-color: rgb(224, 224, 224);
  }
  .custom-table__cell {
    padding: 20px;
    border-bottom: 1px solid gray;
    cursor: pointer;
  }
</style>
