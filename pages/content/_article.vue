<template lang='pug'>
section.content
  nuxt-link(to='/')  &lt; back to search
  h1 {{ post.title }}
  div(v-html='post.body')
</template>

<script lang='coffee'>
export default
  asyncData: ({ app, params, payload }) ->
    post =  (await app.$axios.$get "/api/content/#{params.article}")
    return {post}
</script>

<style lang='stylus' scoped>
.content
  max-width 700px
</style>
