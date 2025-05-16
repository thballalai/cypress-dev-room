<template>
  <div
    class="absolute shadow-2xl rounded-lg flex flex-col"
    :style="{
      left: x + 'px',
      top: y + 'px',
      zIndex,
      width: width + 'px',
      height: height + 'px',
      background: 'var(--bg-panel)',
      border: '2px solid var(--accent)'
    }"
    @mousedown.self="bringToFront"
  >
    <!-- Barra de título e botões -->
    <div
      class="flex justify-between items-center rounded-t cursor-move select-none px-4 py-2 flex-shrink-0"
      :style="{
        background: 'var(--accent)',
        color: 'var(--text-main)'
      }"
      @mousedown.stop.prevent="startDrag"
    >
      <span class="font-semibold">{{ title }}</span>
      <button
        @click="$emit('close')"
        class="text-red-400 hover:text-red-600 text-xl font-bold ml-2"
        style="background: transparent;"
      >&times;</button>
    </div>
    <!-- Conteúdo -->
    <div class="flex-1 w-full overflow-auto" :style="{ color: 'var(--text-main)' }">
      <slot />
    </div>
    <!-- Handles de resize -->
    <div
      v-for="dir in directions"
      :key="dir"
      :class="['resize-handle', dir]"
      @mousedown.stop.prevent="startResize(dir)"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  title: String,
  x: Number,
  y: Number,
  zIndex: Number,
  width: { type: Number, default: 400 },
  height: { type: Number, default: 300 }
})
const emit = defineEmits(['update:position', 'bringToFront', 'close', 'update:size'])

const pos = ref({ x: props.x, y: props.y })
const size = ref({ width: props.width, height: props.height })

watch(() => props.x, val => (pos.value.x = val))
watch(() => props.y, val => (pos.value.y = val))

const dragging = ref(false)
const resizing = ref(false)
const resizeDir = ref(null)
const dragOffset = ref({ x: 0, y: 0 })
const minWidth = 260
const minHeight = 120

const directions = [
  'right', 'bottom', 'corner'
]

function bringToFront() {
  emit('bringToFront')
}

function startDrag(e) {
  dragging.value = true
  dragOffset.value = {
    x: e.clientX - pos.value.x,
    y: e.clientY - pos.value.y
  }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  bringToFront()
}

function onDrag(e) {
  if (!dragging.value) return
  pos.value.x = e.clientX - dragOffset.value.x
  pos.value.y = e.clientY - dragOffset.value.y
  emit('update:position', { x: pos.value.x, y: pos.value.y })
}

function stopDrag() {
  dragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function startResize(dir) {
  resizing.value = true
  resizeDir.value = dir
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  bringToFront()
}

function onResize(e) {
  if (!resizing.value) return
  if (resizeDir.value === 'right' || resizeDir.value === 'corner') {
    size.value.width = Math.max(minWidth, e.clientX - pos.value.x)
  }
  if (resizeDir.value === 'bottom' || resizeDir.value === 'corner') {
    size.value.height = Math.max(minHeight, e.clientY - pos.value.y)
  }
  emit('update:size', { width: size.value.width, height: size.value.height })
}

function stopResize() {
  resizing.value = false
  resizeDir.value = null
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  size.value.width = props.width
  size.value.height = props.height
})
</script>

<style scoped>
.resize-handle {
  position: absolute;
  background: transparent;
  z-index: 10;
}
.resize-handle.right {
  top: 0; right: 0; width: 10px; height: 100%; cursor: ew-resize;
}
.resize-handle.bottom {
  left: 0; bottom: 0; width: 100%; height: 10px; cursor: ns-resize;
}
.resize-handle.corner {
  right: 0; bottom: 0; width: 18px; height: 18px; cursor: nwse-resize;
}
</style>