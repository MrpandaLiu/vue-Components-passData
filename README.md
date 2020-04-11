# 前言

1. 这篇博客是对vue常用的几种通信方式的总结

2. 借鉴自思否的[这篇博客](https://segmentfault.com/a/1190000019208626#item-6),想看原文的请直接戳上面的链接

3. 每一种方法都提供的一个demo实例，具体实现可以从俺GitHub上下载

# 1、props/$emit

父组件通过v-bind向子组件传递数据，子组件通过props接收；子组件通过$emit向父组件发送事件

``` javascript
// A1.vue 父组件
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
```

``` javascript
// A2.vue子组件
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
```

# 2、EventBus

中央事件总线，通过创建的一个空的Vue实例，用$emit和$on来触发和监听事件，从而实现**任意组件**间的通信。vuex的代替

``` javascript
// event-bus.js
import Vue from 'vue';
// 创建事件总线
const Event = new Vue();
export default Event;
```

``` javascript
// B1.vue 父组件
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
```

``` javascript
// B2.vue 子组件
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
```

# 3、$attrs和$listeners

多级组件间跨级通信传递数据时使用

- $attrs：包含了父作用域不被props所识别获取的特性绑定v-bind（class和style除外），功能上和props互补，并且可以通过v-bind="$attrs"传入内部组件

- $listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

``` javascript
// C1.vue 父组件
<template>
    <div>
        <c2 :temp="tempval" @tempfn="getVal" prop='$attrs不会传递child组件中定义的props值'></c2>
    </div>
</template>

<script>
import C2 from './C2'

export default {
    name: 'C1',
    data() {
        return {
            tempval: 'this is father'
        }
    },
    methods: {
        getVal() {
            this.tempval = this.tempval + ' ! ';
        }
    },
    components: {
        C2
    }
}
</script>
```
``` javascript
// C2.vue 子组件
<template>
    <div>
        <!-- 子组件通过$attrs和$listeners向更深层的组件通信 -->
        <c3 v-bind="$attrs" v-on="$listeners"></c3>
    </div>
</template>

<script>
import C3 from './C3'

export default {
    name: 'C2',
    props: ['prop'],
    mounted() {
        console.log(this.$attrs);
        // 触发事件
        this.$emit('tempfn');
    },
    components: {
        C3
    }
}
</script>
```
``` javascript
// C3.vue 孙组件
<template>
    <div>
        <!-- 获取从上一级组件传递的数据 -->
        {{ $attrs.temp }}
    </div>
</template>

<script>
export default {
    name: 'C3',
    mounted() {
        // 触发事件
        this.$emit('tempfn');
    }
}
</script>
```

# 4、provide和inject

祖先组件通过provide向所有后代组件注入变量，后代组件通过inject获取这个变量。provide/inject的使用场景主要是子组件获取上级组件的状态
注意：provide和inject绑定的数据默认是不可响应的

``` javascript
// D1.vue 父组件
<template>
    <div>
        <d2></d2>
        <button @click="changeColor">改变颜色</button>
    </div>
</template>

<script>
import D2 from './D2';
import Vue from 'vue';

export default {
    name: 'D1',
    data() {
        return {
            color: 'blue'
        }
    },
    // 普通的provide返回的数据是不可响应的
    provide() {
        this.theme = Vue.observable({   // observable优化响应式
            color: this.color
        });
        return {
            theme: this.theme
        }
    },
    methods: {
        changeColor() {
            console.log(this.theme.color);
            this.theme.color = 'pink';
        }
    },
    components: {
        D2
    }
}
</script>
```

``` javascript
// D2.vue 子组件
<template>
    <div :style="{ color: theme.color }">
        hhh
    </div>
</template>

<script>
export default {
    name: 'D2',
    inject: {
        // 接收对象
        theme: {
            default: () => ({})
        }
    },
    mounted() {
        console.log(this.theme);
    }
}
</script>
```

# 5、$parent/$children/ref

- ref：获取DOM元素；如果是子组件的属性，就指向子组件的引用

- $parent/$children：访问父/子实例

``` javascript
// E1.vue 父组件
<template>
    <div>
        <!-- 类似于DOM中的设置Id -->
        <e2 ref="child"></e2>
        <button @click="change">改变喵</button>
    </div>
</template>

<script>
import E2 from './E2';

export default {
    name: 'E1',
    methods: {
        change() {
            // 获取子组件实例
            const child = this.$refs.child;
            child.getName();
        }
    },
    components: {
        E2
    }
}
</script>
```

``` javascript
// E2.vue 子组件
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
```

# 6、Vuex

vuex实现了一个单向数据流，在全局拥有一个State存放数据

- state：页面状态管理容器对象，必须通过mutation更新

- mutations：状态改变方法，只能进行同步操作，通过commit方法调用

- actions：操作行为处理模块，提供了Promise的封装，以支持action的链式触发，通过patch方法调用

``` javascript
// store.js 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'panda'
  },
  mutations: {
    EDIT_NAME(state,payload) {
      state.name = payload.name;
    }
  },
  actions: {
    AWAIT_NAME(mutations,data) {
      setTimeout(_ => {
        mutations.commit('EDIT_NAME',data)
      },2000)
    }
  },
})
```

``` javascript
// F1.vue 父组件
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
```

``` javascript
// F2.vue 子组件
<template>
    <!-- 直接从store中获取数据 -->
    <div>{{$store.state.name}}</div>
</template>

<script>
export default {
    name: 'F2'
}
</script>
```

# 总结

1. 父子通信: 
    - props/$emit  
    - $parent/$children

2. 跨级通信:
    - $attrs/$listeners
    - provide/inject

3. 全局通信:
    - eventBus
    - vuex