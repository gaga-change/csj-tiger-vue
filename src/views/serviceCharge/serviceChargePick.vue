<template>
  <div>
    <search-form2
      :config="serviceChargePickSearchConfig"
      @search="search"
    />
  </div>
</template>

<script>
import { serviceChargePickSearchConfig } from './config'
export default {
  data() {
    return {
      serviceChargePickSearchConfig,
    }
  },
  methods: {
    search(searchParams, cb) {
      console.log(searchParams)
      cb()
    }
  },
}
</script>
