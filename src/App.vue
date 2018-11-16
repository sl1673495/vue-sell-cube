<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header.vue'
import { getSeller, getGoods } from 'api'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'

export default {
  name: 'app',
  created() {
    this._getSeller()
    this._getGoods()
  },
  data() {
    return {
      seller: {},
      goods: {},
      ratings: {}
    }
  },
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
        this.seller = seller
      })
    },
    _getGoods() {
      getGoods().then((goods) => {
        this.goods = goods
      })
    }
  },
  computed: {
    tabs() {
      return [
        { label: '商品', component: Goods, data: { seller: this.seller } },
        { label: '评价', component: Ratings, data: { seller: this.seller } },
        { label: '商家', component: Seller, data: { seller: this.seller } }
      ]
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>
<style lang="stylus" scoped>
#app
  .tab-wrapper
    position fixed
    top 136px
    left 0
    right 0
    bottom 0
</style>
