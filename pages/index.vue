<template>
  <div class="flex h-screen">
      <div class=" w-[280px] h-full p-5">
        <SessionList></SessionList>
      </div>
      <div class="h-full flex-1 p-5">
        <ChatContent></ChatContent>
      </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, wrapProperty } from '@nuxtjs/composition-api';
import SessionList from '@/modules/session/session-list.vue';
import ChatContent from '@/modules/chat-content.vue';
// 
// import * as h from '@/modules/session/session-item.vue'
import { LIST_SESSION } from '@/api/index'

export default defineComponent({
  name: 'IndexPage',
  components: {SessionList, ChatContent},
  setup() {
    
    const $axios = wrapProperty('$axios', false)()
   
    
  }
})
</script>