<template lang="pug">
.report-page
  h1 hallelujah.io
  .main
    .left
      .filter
        .search
          label(for='search') search:&nbsp;
          input#search(v-model='search')
        //ul
          li.tag(:class='{active: status === "in_review"}' @click='status = "in_review"') neu
          li.tag(:class='{active: status === "ok"}' @click='status = "ok"') freigeschaltet
          li.tag(:class='{active: status === "troll"}' @click='status = "troll"') troll
      hr
      .report-rows
        .report-row(v-for='report in reports' :key='report.id')
          .report-preview(@click='selectedReport = report' :class='{selected: selectedReport && report.id === selectedReport.id}')
            .teaser {{report.text}}
    .report-edit(v-if='selectedReport')
      div
        span.dropdown ESV <span class="action">▾&nbsp</span>
          .dropdown-content
            .dropdown-items
              .dropdown-item(@click='() => onStatusChange("in_review")') GNC
              .dropdown-item(@click='() => onStatusChange("ok")') LUT
              .dropdown-item(@click='() => onStatusChange("troll")') ELB
      hr
      //div: b {{selectedReport.name}} schrieb:
      //.report-text(v-html='selectedReport.text')
      BibleChapter(:verseId='selectedReport.id')
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue"
import axios from 'axios'
import moment from 'moment'
import useAsyncState from '../compose/useAsyncState'
import { DateTime } from 'luxon'
import _ from 'lodash'
import BibleChapter from './BibleChapter.vue'

type Report = {
  id: number
  text: string
  verse: string
  book: string
}
type ReportResponse = {
  verses: Report[]
}

export default defineComponent({
  components: {
    BibleChapter
  },
  setup() {
    const search = ref('')
    const status = ref('in_review')
    const selectedReport = ref<Report>()

    const labels = {
      in_review: 'neu',
      ok: 'freigeschaltet'
    } 

    const request = useAsyncState(
      () => axios.get<ReportResponse>('/api/search/query', {params: {
        q: search.value
      }}).then(x => x.data.verses)
    )
    request.run()
    watch(search, request.run)
    watch(status, request.run)
    watch(status, () => selectedReport.value = undefined)
    // Reset edit object on select report change

    return {
      msg: String,
      reports: request.data,
      error: request.error,
      state: request.state,
      search,
      selectedReport,
      status,
      labels,
    }
  }
})
</script>

<style scoped lang="stylus">
h3
  margin 40px 0 0
  text-decoration underline

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 20px 0 0

.filter li
  padding 0.2em .62em

  &.tag
    border 1px solid
    cursor pointer
    box-shadow 3px 3px 0px var(--background-color), 4px 4px 0px var(--secondary-color)

  &.active
    background var(--main-color)
    color var(--background-color)
    border-color var(--main-color)

.search
  //border-bottom 1px solid
  //padding-bottom 0.4em
  input#search
    width 210px
    border-bottom 1px solid var(--secondary-color)
    border-radius 0px
    

.main
  display flex

.left
  border-right 1px solid
  width 280px
  flex-shrink 0
  padding-bottom 1em

.report-preview
  padding-right 1em
  margin-top 1.2em
  height 4rm
  cursor pointer
  
  &.selected
    box-shadow 0px 2px

  .name, .date
    font-weight bold
  .name
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .teaser
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    white-space pre-line
    -webkit-line-clamp 2
    -webkit-box-orient vertical
  .info
    overflow hidden
    text-overflow ellipsis

.report-edit
  padding-left 1em
  flex-grow 1

  div
    margin-bottom .6em

.main
  flex-grow 1

.report-page
  display flex
  flex-direction column
  flex-grow 1

.report-rows
  overflow-y scroll

.report-text, .report-teaser
  white-space pre-line

.dropdown
  display inline-block
  position relative
  cursor pointer
  &:hover
    .dropdown-content
      display block

.dropdown-content
  position absolute
  display none
  z-index 1
  height 0px
  overflow visible
  .dropdown-items
    padding .4em .6em 0
    background var(--background-color)
    border 1px solid var(--main-color)
    .dropdown-item
      cursor pointer
    .active
      font-weight bold
.action
  color var(--secondary-color)
</style>
