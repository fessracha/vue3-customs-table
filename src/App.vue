<template>
  <div>
    <custom-table
      :headers="$options.calloriesHeaders"
      :rows="productsCharacterstics"
      :single-expand="true"
    >
      <template v-slot:[`content-name`]="{cellContent}">
        <div class="highlight-column-cell">
          {{ cellContent }}
        </div>
      </template>
      <template v-slot:[`content-carbs`]="{cellContent}">
        <div class="highlight-column-cell">
          {{ cellContent }}
        </div>
      </template>
      <template
        v-for="(product, idx) in productsCharacterstics"
        :key="product.name"
        v-slot:[`expand-row-${idx}`]
        >
        <p style="font-size: 40px; color: green;">Детальное описание для {{ product.name }}</p>
      </template>
    </custom-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CustomTable from './components/custom-table/CustomTable.vue';

export default defineComponent({
  name: 'App',
  components: {
    CustomTable,
  },
  data() {
    return {
      productsCharacterstics: [
        {
          name: 'Яица',
          ccal: 220,
          fat: 80,
          protein: 1.5,
          carbs: 23,
        },
        {
          name: 'Мороженное',
          ccal: 400,
          fat: 300,
          protein: 2.5,
          carbs: 90,
        },
        {
          name: 'Овсянка',
          ccal: 350,
          fat: 0,
          protein: 4,
          carbs: 70,
        },
      ],
    };
  },
  calloriesHeaders: ['Products', 'Ccals', 'Fat', 'Belki', 'Uglevodi'],
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.highlight-column-cell {
  background-color: red;
  border-radius: 25px;
  color: white;
  padding: 15px;
  display: inline-block;
}
</style>
