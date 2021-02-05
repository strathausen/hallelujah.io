import _ from 'lodash'
import Router from 'koa-router'
import fs from 'fs-extra'
import fm from 'front-matter'
import Md from 'markdown-it'

const router = new Router()
const md = Md()

router.get('/:name', async (ctx) => {
  console.log(ctx)
  const {name} = ctx.params
  const rawArticle = await fs.readFile(`${__dirname}/../content/${name}.md`, 'utf8')
  const {attributes, body} = fm<{body: string}>(rawArticle)
  attributes.body = md.render(body)
  ctx.body = attributes
})

export default router
