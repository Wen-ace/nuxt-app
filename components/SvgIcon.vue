<template>
   <svg :style="iconStyle" class="ace-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="tsx">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: "SvgIcon",
  setup() {
    

    return {
      
    }
  },
})
</script>