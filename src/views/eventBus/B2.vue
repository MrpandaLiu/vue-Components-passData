<template>
    <div>
        My name is {{name}} and I m {{age}} year old
    </div>
</template>

<script>
import Event from './event-bus'

export default {
    name: 'B2',
    data() {
        return {
            name: '??',
            age: 20
        }
    },
    // 不确定何时触发，所以在mounted阶段就监听
    mounted() {
        // 监听事件
        Event.$on('msg',data => {
            this.name = data;
        })
    }
}
</script>

<style>

</style>