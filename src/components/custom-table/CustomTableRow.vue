<template>
  <tr>
    <td class="custom-table__cell" v-for="(cell, cellKey) in cells" :key="cell">
      <slot
        v-if="hasSlot(`content-${cellKey}`)"
        :name="`content-${cellKey}`"
        :cellContent="cell"/>
      <template v-else>
        {{ cell }}
      </template>
    </td>
    <td class="custom-table__cell" v-if="hasSomeExpandedRow">
      <button v-if="hasCurrentExpand" @click="expandContentHandler">toggle</button>
    </td>
  </tr>
  <tr v-if="isShowExpandContent && !!hasCurrentExpand">
    <td :colspan="cellsCount">
      <slot name="expand"/>
    </td>
  </tr>
</template>
<script lang="ts">
import mitt from 'mitt';
import { PropType } from 'vue';
import helpersMixin from './mixins/helpers';
import { ICell, TSingleExpand } from './types';

const eventBus = mitt();

export default {
  data() {
    return {
      isShowExpandContent: false as boolean,
    };
  },
  props: {
    cells: {
      type: Object as PropType<ICell>,
      required: true,
    },
    hasSomeExpandedRow: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    singleExpand: {
      type: Boolean as PropType<TSingleExpand>,
      required: false,
      default: false,
    },
  },
  mixins: [helpersMixin],
  computed: {
    additionalCellsCount(): number {
      let additionalCellsCount = 0;

      if (this.hasCurrentExpand) {
        additionalCellsCount += 1;
      }

      return additionalCellsCount;
    },
    cellsCount(): number {
      return Object.values(this.cells).length + this.additionalCellsCount;
    },
    hasCurrentExpand(): boolean {
      return !!this.$slots.expand;
    },
  },
  methods: {
    expandContentHandler(): void {
      if (this.singleExpand) {
        eventBus.emit('expand:show');
        this.showExpandContent();
      } else {
        this.toggleExpandContent();
      }
    },
    toggleExpandContent(): void {
      this.isShowExpandContent = !this.isShowExpandContent;
    },
    showExpandContent(): void {
      this.isShowExpandContent = true;
    },
    separateExpandContent(): void {
      this.isShowExpandContent = false;
    },
  },
  created(): void {
    eventBus.on('expand:show', this.separateExpandContent);
  },
  beforeUnmount(): void {
    eventBus.off('expand:show', this.separateExpandContent);
  },
};
</script>
