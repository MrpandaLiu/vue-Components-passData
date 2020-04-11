<template>
    <div class="root1">
        <!-- 用v-bind向子组件传参 -->
        <animals :animals="animals" @animalChange="update"></animals>
    </div>
</template>

<script>
import Animals from './A2'

export default {
    name: 'A1',
    data() {
        return {
            animals: ['panda','cat','dog']
        }
    },
    methods: {
        // 接收传过来的字符 并修改
        update(e) {
            this.animals.push(e);
        } 
    },
    components: {
        Animals
    }
}
</script>

<style>

</style>