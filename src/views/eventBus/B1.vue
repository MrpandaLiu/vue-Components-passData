<template>
    <div>
        <button @click="sendMsg">发送消息</button>
    </div>
</template>

<script>
import Event from './event-bus'

export default {
    name: 'B1',
    data() {
        return {
            name: 'panda'
        }
    },
    methods: {
        sendMsg() {
            // 触发事件
            Event.$emit('msg',this.name);
        }
    }
}
</script>

<style>

</style>