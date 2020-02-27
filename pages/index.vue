<template lang='pug'>
  section.container
    div.hero
      .field.has-addons
        .control
          span.select
            select(v-model='edition' @change='onUpdate')
              option(value='' disabled hidden selected) seek,
              option(v-for='edition in editions' :value='edition.abbrev')
                | {{edition.abbrev}}
        .control
          input.input(v-model='query' @keyup='onUpdate' type='text' placeholder='and ye shall find')
    div
      div(v-for='verse in results')
        hr
        p {{verse.text}}
        p: b {{verse.book}} {{verse.chapter}}:{{verse.verse}}
    // Matomo
    script(type="text/javascript").
      var _paq = window._paq || [];
      // tracker methods like "setCustomDimension" should be called before "trackPageView"
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="//matomo.ente.ameisenbar.de/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
</template>

<script lang='coffee'>
import axios from 'axios'

export default {
  data: ->
    editions: []
    edition: ''
    query: ''
    results: []
    lastQuery: ''

  methods:
    onUpdate: ->
      return if @query.length <= 2 or @lastQuery == @query
      console.log @lastQuery, @query
      @lastQuery = @query
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
