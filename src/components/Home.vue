<script>
import { ref, h } from 'vue';

export default {
  setup() {
    let count = ref(0);

    const increment = () => {
      count.value++;
    };

    //返回一个render函数渲染h函数返回Vnode
    return () => h('button', { onClick: increment }, `count is: ${count.value}`);
  }
};
</script>
