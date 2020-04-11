<template>
    <div class="child1">
        <ul>
            <li v-for="(item,index) in animals" :key="index">{{item}}</li>
        </ul>
        <button @click="changeAnimal">改变</button>
    </div>
</template>

<script>
export default {
    name: 'A2',
    props: ['animals'],
    methods: {
        changeAnimal() {
            // 利用$emit向父组件发送事件
            this.$emit('animalChange','bear');
        }
    }
}
</script>

<style>

</style>