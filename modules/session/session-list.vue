<template>
    <div class="h-screen flex flex-col">
        <div class="flex-1">
            <SessionItem ref="itemRef" v-for="item in sessionList" :key="item.id" :data="item" @delete="deleteCallback"
                @click="(item) => clickHandler(item)" />
        </div>
        <div class="h-10">
            <el-button @click="addSessionHandler">add</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, useStore, wrapProperty } from '@nuxtjs/composition-api';
import { CREATE_SESSION, LIST_SESSION } from '~/api';
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

        const clickHandler = (item: Session) => {
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

        const addSessionHandler = () => {
            return $axios.$get(CREATE_SESSION).then(() => {
                // update session list
                return getSessionList()
            }).catch(error => {
                console.log('error :>> ', error)
            }
            )
        }

        return {
            sessionList,
            clickHandler,
            itemRef,

            deleteCallback,
            addSessionHandler,
        }

    }
})
</script>