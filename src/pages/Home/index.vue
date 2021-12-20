<template>
<div>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <TodayRecommend></TodayRecommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="floor in listFloor" :key="floor.id" :list="floor"></Floor>
  <Brand></Brand>
</div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from "vuex";
export default {
  name: "Home",
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloor')
  },
  computed:{
    ...mapState({
      listFloor:state => state.home.listFloor
    })
  }

}
</script>

<style scoped>

</style>