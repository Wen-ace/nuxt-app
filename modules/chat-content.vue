<template>
    <div>
        content: {{ currentSession.title }}
        <hr />
        time: {{ currentSession.create_time }}

        <p></p>
        <div v-for="item in chatList" :key="item.id">
            <div v-if="item.direction === 0" class="text-right">
                <div>{{ item.nickname }}</div>
                <div>{{ item.message }}</div>
            </div>
            <div v-else>
                <div>{{ item.nickname }}</div>
                <div>{{ item.message }}</div>
            </div>
         
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

const userInfo = {
    nickName: 'User'
}

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
                const list = (res.data.list as IChat[]).sort((a, b) => a.create_time - b.create_time)
                chatList.value = list
            })
        }

        watch(() => currentSession.value, (data) => {
            data && data.id && getSessionDetail(data)
        }, {
            deep: true,
            immediate: true,
        })

        const input = ref('')

        const io = socket.createIO()

        io.on('message', res => {

            chatList.value.push({
                message: res || '',
                create_time: Date.now(),
                nickname: 'ChatBot',
                id: Date.now() + '',
                direction: 1,
                session_id: currentSession.value.id,
            })
        })

        io.on('connect', () => {
            console.log('chat connnected')
        })

        io.on('connection_error', error => {
            console.log('connect error => ',error)
        })

        const sendHandler = () => {
            const data = JSON.stringify({
                session_id: currentSession.value.id,
                message: input.value
            })

            io.send(data)

            chatList.value.push({
                create_time: Date.now(),
                nickname: userInfo.nickName,
                id: Date.now() + '',
                direction: 1,
                message: input.value,
                session_id: currentSession.value.id,
            })
            //
            nextTick(() => {
                input.value = ''
            })
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