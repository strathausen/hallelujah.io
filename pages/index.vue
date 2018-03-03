<template lang="pug">
  section.container
    div.hero
      .field.has-addons
        .control
          span.select
            select(v-model='edition' @change='onUpdate')
              option(value='' disabled hidden selected) seek,
              option(v-for='edition in editions' v-value='edition.abbrev')
                | {{edition.abbrev}}
        .control
          input.input(v-model='query' @keyup='onUpdate' type='text' placeholder='and ye shall find')
    div
      div(v-for='verse in results')
        hr
        p {{verse.text}}
        p: b {{verse.book}} {{verse.verse}}.{{verse.chapter}}
</template>

<script lang="coffee">
import axios from 'axios'

export default {
  data: ->
    editions: []
    edition: ''
    query: ''
    results: []

  methods:
    onUpdate: ->
      params = q: @query, edition: @edition
      @results = (await axios.get('/api/search/query', { params })).data.verses

  mounted: ->
    @editions = (await axios.get('/api/search/editions')).data
}
</script>

<style scoped>
.title {
  margin: 50px 0;
}
</style>
