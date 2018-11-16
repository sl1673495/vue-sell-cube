<template>
  <div class="tab">
    <cube-tab-bar
      :showSlider=true
      :useTransition=false
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        ref="slide"
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        :options="slideOptions"
        @change="onChange"
        @scroll="onScroll"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component
            ref="component"
            :is="tab.component"
            :data="tab.data">
          </component>
        </cube-slide-item>
      </cube-slide >
    </div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  mounted() {
    this.onChange(this.index)
  },
  methods: {
    onChange(current) {
      this.index = current
      const component = this.$refs.component[current]
      component.fetch && component.fetch()
    },
    onScroll({ x }) {
      const tabBar = this.$refs.tabBar
      const tabBarWidth = tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -x / slideWidth * tabBarWidth
      tabBar.setSliderTransform(transform)
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(v => v.label === newVal)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tab
  display flex
  flex-direction column
  height 100%
  >>> .cube-tab
    padding 10px 0
  .slide-wrapper
    flex 1
    overflow hidden
</style>
