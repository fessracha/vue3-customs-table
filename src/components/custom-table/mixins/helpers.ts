const helpersMixin = {
  methods: {
    hasSlot(slotName: string):boolean {
      return !!this.$slots[slotName];
    },
  },
};

export default helpersMixin;
