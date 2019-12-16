<template lang="html">
  <div>
  </div>
</template>

<script>

export default {
  name: 'expressTem',
  data() {
    return {
    
    }
  },

  computed: {
    
  },
  

  mounted() {

  },

  methods: {
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.addCarrier {
  .operationitem {
    display: flex;
    justify-content: flex-end;
    margin: 16px 0;
  }
}

.providerList {
  display: flex;
  justify-content: space-between;
  > span {
    &:first-child {
      min-width: 150px;
    }
    &:nth-child(2) {
      min-width: 100px;
    }
  }
}
</style>
