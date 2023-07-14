<script>
import { ref, h } from 'vue';

export default {
  setup() {
    let count = ref(0);

    const increment = () => {
      count.value++;
    };

    //这种不会渲染,如果使用render函数渲染,必须返回一个函数渲染一个h函数返回的Vnode
    return {
      render() {
        return h('button', { onClick: increment }, `count is: ${count.value}`);
      }
    };
  }
};
</script>
