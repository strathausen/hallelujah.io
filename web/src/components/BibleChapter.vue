<template lang="pug">
div
  div(v-if="data")
    div(v-for="verse in data.verses" :key="verse.index")
      b {{verse.index}}&nbsp;
      span {{verse.content}}
</template>

<script lang="ts">
import Vue, { defineComponent, watch } from 'vue'
import axios from 'axios'
import useAsyncState from '@/compose/useAsyncState'

type Verse = {
  content: string
  index: number
}

type Chapter = {
  verses: Verse[]
}

export default defineComponent({
  props: {
    verseId: Number
  },
  setup(props) {

    const request = useAsyncState(
      () => axios.get<Chapter>(`/api/search/chapter/${props.verseId}`).then(x=> x.data)
    )
    request.run()
    watch(props, request.run)
    return {
      data: request.data
    }
  }
})
</script>
