<template>
    <div>{{name}}</div>
</template>

<script>
export default {
    name: 'E2',
    data() {
        return {
            name: 'panda'
        }
    },
    mounted() {
        console.log(this.$parent);
    },
    methods: {
        getName() {
            this.name = 'bearcat';
        }
    }
}
</script>

<style>

</style>