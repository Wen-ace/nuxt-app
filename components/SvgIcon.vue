<template>
  <svg
    :style="iconStyle"
    class="ace-icon"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="tsx">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: "SvgIcon",
  props: {
    type: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 16
    }
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.type}`
    })

    const iconStyle = computed(() => {
      return {
        'font-size': `${props.size}px`
      }
    })

    return {
      iconName,
      iconStyle,
    }
  },
})
</script>