<template>
    <div>
        <SessionItem ref="itemRef" v-for="item in sessionList" :key="item.id" :data="item" 
        @delete="deleteCallback"
        @click="(item) => clickHandler(item)"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, useStore, wrapProperty } from '@nuxtjs/composition-api';
import { LIST_SESSION } from '~/api';
import { Session } from '~/type';
import SessionItem from './session-item.vue';


export default defineComponent({
    name: 'session-list',
    components: { SessionItem },
    setup() {
        // const sessionList = ref<Session[]>([])
        const $axios = wrapProperty('$axios', false)()
        const store = useStore<any>()
        
        const itemRef = ref()
        const clickFirstItem = () => {
            itemRef.value[0].titleRef.click()
        }

        const getSessionList = () => {
            return $axios.$get(LIST_SESSION).then(res => {
                console.log(res)
                const list = res.data.list.reverse()
                // sessionList.value = list
                store.commit('setSessionList', list)

                nextTick(() => {
                   clickFirstItem() 
                })
                
            })
        }
        getSessionList()

        const clickHandler =(item: Session) => {
            console.log(item)
            store.commit('setCurrentSession', item)
        }

        const sessionList = computed(() => {
            return store.state.sessionList
        })
        const deleteCallback = () => {
            nextTick(() => {
                clickFirstItem() 
            })
           
        }

        return {
            sessionList,
            clickHandler,
            itemRef,

            deleteCallback
        }

    }
})
</script>