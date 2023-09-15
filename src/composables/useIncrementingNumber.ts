/**
 *
 * @param delay
 */
function useIncrementingNumber(delay: any) {
  const count = ref(0)

  let intervalId: any

  const incrementCount = () => {
    count.value++
  }

  onMounted(() => {
    if (delay !== null)
      intervalId = setInterval(incrementCount, delay)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  return count
}

export default useIncrementingNumber
