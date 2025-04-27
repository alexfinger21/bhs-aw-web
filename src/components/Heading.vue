<template>
  <component :is="headingTag" class="heading" :style="headingStyle">
    <span class="heading-text">
      <slot></slot>
    </span>
    <div v-if="showDivider" class="heading-divider"></div>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    default: 2, // h2 by default
    validator: (value) => [1, 2, 3, 4, 5, 6].includes(value)
  },
  showDivider: {
    type: Boolean,
    default: true
  },
  dividerColor: {
    type: String,
    default: 'var(--accent-color)' // Using your existing CSS variable
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  }
})

const headingTag = computed(() => `h${props.level}`)
const headingStyle = computed(() => ({ textAlign: props.align }))
</script>

<style scoped>
.heading {
  font-family: var(--title-font);
  color: var(--text-light);
  letter-spacing: 0.05em;
  margin: 1.5rem 0;
  position: relative;
  line-height: 1.3;

  /* Responsive font sizes */
  &.h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
  &.h2 { font-size: clamp(1.75rem, 4vw, 2.75rem); }
  &.h3 { font-size: clamp(1.5rem, 3.5vw, 2.25rem); }
}

.heading-text {
  display: inline-block;
  padding-bottom: 0.5rem;
  position: relative;
}

.heading-divider {
  height: 2px;
  width: 80px;
  background: linear-gradient(
    to right,
    transparent,
    v-bind(dividerColor),
    transparent
  );
  margin-top: 1rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.heading:hover .heading-divider {
  opacity: 1;
  width: 100px;
}

/* Alignment variations */
.heading.center {
  text-align: center;
}
.heading.center .heading-divider {
  margin-left: auto;
  margin-right: auto;
}

.heading.right {
  text-align: right;
}
.heading.right .heading-divider {
  margin-left: auto;
}
</style>
