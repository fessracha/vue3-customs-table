<template>
  <table class="custom-table">
    <thead v-if="headers" class="custom-table__head">
      <tr>
        <td v-for="title in headers" :key="title" class="custom-table__cell">
          {{ title }}
        </td>
        <td class="custom-table__cell" v-if="hasSomeExpandedRow"></td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(cells, idx) in rows" :key="idx">
        <custom-table-row
          :cells="cells"
          :has-some-expanded-row="hasSomeExpandedRow"
          :single-expand="singleExpand"
        >
          <template
            v-for="(cell, cellKey) in cells"
            :key="cellKey" v-slot:[`${getContentSlotKey(cellKey)}`]="{cellContent}">
            <slot :name="getContentSlotKey(cellKey)" :cellContent="cellContent"/>
          </template>
          <template #expand v-if="!!$slots[getExpandSlotKey(idx)]">
            <slot :name="getExpandSlotKey(idx)"  />
          </template>
        </custom-table-row>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import CustomTableRow from './CustomTableRow.vue';

/*
  1. Добавить свойство кол-во дополнительных колонок
  2. additionalCellsCount сделать глобальным в скоупе CustomTable (после provide/inject)
  3. headers должно совпадать с количеством полей в rows[0]
  4. прокидывание свойств single expand, has-some-expanded-row (после provide/inject)
*/

export default {
  EXPAND_ROW_SLOT_PREFIX: 'expand-row',
  CONTENT_SLOT_PREFIX: 'content',
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
    singleExpand: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    CustomTableRow,
  },
  methods: {
    getExpandSlotKey(idx: number): string {
      return `${this.$options.EXPAND_ROW_SLOT_PREFIX}-${idx}`;
    },
    getContentSlotKey(cellKey: string): string {
      console.log(`${this.$options.CONTENT_SLOT_PREFIX}-${cellKey}`);
      return `${this.$options.CONTENT_SLOT_PREFIX}-${cellKey}`;
    },
  },
  computed: {
    hasSomeExpandedRow(): boolean {
      const slotsKeys: string[] = Object.keys(this.$slots);
      return slotsKeys.some((key: string) => key.includes(this.$options.EXPAND_ROW_SLOT_PREFIX));
    },
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
