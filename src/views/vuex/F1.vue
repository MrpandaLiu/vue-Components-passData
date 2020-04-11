<template>
    <div>
        <f2></f2>
        <button @click="edit">修改</button>
    </div>
</template>

<script>
import F2 from './F2';

export default {
    name: 'F1',
    methods: {
        edit() {
            // 调用disptch更新state
            this.$store.dispatch('AWAIT_NAME',{
                name: 'bearcat'
            })
        }
    },
    components: {
        F2
    }
}
</script>

<style>

</style>