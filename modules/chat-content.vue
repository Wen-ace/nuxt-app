<template>
    <div>
        content: {{ currentSession.title }}
        <hr />
        time: {{ currentSession.create_time }}

        <p></p>
        <div v-for="item in chatList" :key="item.id">
            {{ `${item.nickname}: ${item.message}` }}
        </div>

        <div>
            <el-input type="textarea" v-model="input"></el-input>

            <el-button type="primary" @click="sendHandler">send</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, useStore, watch, wrapProperty } from '@nuxtjs/composition-api';
import { HISTORY_SESSION } from '~/api';
import { IChat, Session } from '~/type';
import socket from '@/tool/socket'

export default defineComponent({
    name: 'chat-content',
    setup() {
        const store = useStore<any>()
        const currentSession = computed<Session>(() => {
            return store.state.currentSession
        })

        const $axios = wrapProperty('$axios', false)()

        const chatList = ref<IChat[]>([])
        const getSessionDetail = (data: Session) => {
            if (!data.id) {
                return Promise.reject('id is null')
            }
            return $axios.$get(HISTORY_SESSION, {
                params: {
                    session_id: data.id
                }
            }).then(res => {
                const list = (res.data.list as IChat[]).sort((a, b) => a.direction - b.direction)
                chatList.value = res.data.list
            })
        }
        watch(() => currentSession.value, (data) => {
            console.log('chat  chat chat ')
            data && data.id && getSessionDetail(data)
        }, {
            deep: true,
            immediate: true,
        })

        const input = ref('')

        const io = socket.createIO()
        console.log(io)

        io.on('message', res => {
            console.log('io message', res)
        })

        io.on('connection', () => {
            console.log('create .. connect')
        })

        const sendHandler = () => {
            const data = JSON.stringify({
                session_id: currentSession.value.id,
                message: input.value
            })

            io.send(data)

            //
            // nextTick(() => {
            //     input.value = ''
            // })
        }

        return {
            currentSession,
            chatList,

            input,
            sendHandler,
        }
    }
})
</script>