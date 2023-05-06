<template>
    <div class="flex " :class="{ active: isActive }">
        <div class="font-medium text-base" ref="titleRef" @click="clickHandler">
            {{ data.title }}
        </div>
        <div> {{ data.create_time }}</div>
        <div class="hover:inline-flex hidden">
            <i class="el-icon-delete" @click="deleteHandler"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, useStore, wrapProperty } from '@nuxtjs/composition-api';
import { Session } from '@/type';
import { DELETE_SESSION } from '~/api';

export default defineComponent({
    name: 'session-item',
    props: {
        data: {
            type: Object as PropType<Session>,
            default: () => ({
                title: '新对话',
                id: 1,
                create: 0
            })
        }
    },
    setup(props, { emit }) {
        const store = useStore<any>()

        const currentSession = computed(() => {
            return store.state.currentSession
        })

        const isActive = computed(() => {
            return currentSession.value.id === props.data.id
        })

        const clickHandler = () => {
            if (props.data) {
                store.commit('setCurrentSession', props.data)
            }
        }

        const titleRef = ref()

        const $axios = wrapProperty('$axios', false)()
        const deleteHandler = () => {

            return $axios.$delete(DELETE_SESSION, {
                params: {
                    session_id: props.data.id
                }
            }).then((res) => {
                const list = res.data.list.reverse()
                store.commit('setSessionList', list)
                emit('delete', props.data)
            })
        }

        return {
            currentSession,
            isActive,
            clickHandler,
            titleRef,
            deleteHandler,
        }
    }
})
</script>

<style scoped>
.active {
    border: 1px solid blue;
}
</style>