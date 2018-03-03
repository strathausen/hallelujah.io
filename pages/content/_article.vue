<template lang='pug'>
section.content-container
  a(href='/') search
  h1 {{ post.title }}
  div(v-html='post.body')
</template>

<script lang='coffee'>

export default
  asyncData: ({ app, params, payload }) ->
    post =  (await app.$axios.$get "/api/content/#{params.article}")
    return {post}

</script>
