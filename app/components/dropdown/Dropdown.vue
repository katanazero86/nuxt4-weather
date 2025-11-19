<script setup lang="ts">
import { useOutside } from "~/composable/useOutside";
import ChvronDownIcon from "~/components/icons/ChvronDownIcon.vue";

type Option = { label: string; value: string; }

const props = withDefaults(
    defineProps<{
      options: Option[];
      placeholder?: string
    }>(),
    {
      placeholder: 'Select an option'
    }
)

const emits = defineEmits(['onSelect'])

const { containerRef } = useOutside(() => isOpen.value = false)

const isOpen = ref(false)
const selectedOption = ref<Option | null>(null)
const toggleDropdown = () => isOpen.value = !isOpen.value

const handleOptionClick = (targetOption: Option) => {
  selectedOption.value = targetOption
  isOpen.value = false
  emits('onSelect', targetOption)
}

</script>

<template>
  <div class="relative" ref="containerRef">
    <div class="relative">
      <input
          class="bg-gray-50 border border-gray-300 cursor-pointer outline-none py-2 px-4 text-sm rounded-md dark:bg-slate-700 dark:border-gray-600"
          :class="isOpen ? 'border-indigo-300 dark:border-indigo-500' : ''"
          type="text"
          readonly
          :value="selectedOption ? selectedOption.label : ''"
          :placeholder="placeholder"
          @click="toggleDropdown"/>
      <ChvronDownIcon class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      @click="toggleDropdown"/>
    </div>
    <ul v-if="isOpen"
        class="absolute left-0 right-0 z-10 mt-2 py-1 text-sm border border-gray-300 rounded-sm bg-white max-h-[250px] overflow-y-auto dark:bg-slate-800 dark:border-gray-600">
      <li v-for="option in options" class="cursor-pointer py-1 px-4 hover:bg-gray-200 dark:hover:bg-slate-700"
          :class="selectedOption?.value === option.value ? 'bg-gray-200 dark:bg-slate-700': ''"
          @click="handleOptionClick(option)">
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>