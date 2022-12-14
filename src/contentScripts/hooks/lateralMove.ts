const MAX_W = 500
const MIN_W = 266

interface IPosition {
  x?: number
  y?: number
}

export function useLateralMove(el: HTMLElement) {
  const positionRef = ref({
    x: 0,
    y: 0,
  })
  const isMove = ref(false)

  const mousedown = (e: MouseEvent) => {
    isMove.value = true
    setPosition({
      x: e.clientX,
      y: e.clientY,
    })

    e.preventDefault()
  }
  const mouseUp = () => {
    isMove.value = false
  }
  const mouseMove = (e: MouseEvent) => {
    if (!isMove.value) { return }
    if (e.clientX) {
      const moveW = e.clientX
      setPosition({ x: moveW })
      el.style.left = `${positionRef.value.x}px`
    }
  }
  el.addEventListener('mousedown', mousedown)
  document.body.addEventListener('mousemove', mouseMove)
  document.body.addEventListener('mouseup', mouseUp)
  // el.addEventListener('mouseleave', mouseUp)

  function setPosition(position: IPosition) {
    if (!position) { return }
    if (position.x) {
      if (position.x >= MAX_W) {
        positionRef.value.x = MAX_W
      } else if (position.x && position.x <= MIN_W) {
        positionRef.value.x = MIN_W
      } else {
        positionRef.value.x = position.x
      }
    }
  }

  return {
    position: positionRef,
    setPosition,
  }
}
