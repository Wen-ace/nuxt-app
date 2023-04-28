<template>
  <div>
      <Tutorial/>
      <SvgIcon />
  </div>

</template>

<script lang="tsx">
import { defineComponent, wrapProperty } from '@nuxtjs/composition-api';
import { LIST_SESSION } from '@/api/index'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    
    const $axios = wrapProperty('$axios', false)()
    $axios.$get(LIST_SESSION).then(res => {
      console.log(res)
    })

    
  }
})
</script>