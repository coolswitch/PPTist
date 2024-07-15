import type { PPTElement, Slide } from '@/types/slides'

export type TransformPage = { title: string; deep: number; catalog: string[]; contents: string[] }

export default () => {
  function mdString2TransformPages(origin: string) {
    const array: TransformPage[] = []

    origin = origin.trim().replace(/\s*\n\n+/g, '\n')
    origin.split('\n').forEach((item) => {
      if (item.startsWith('#')) {
        // new page
        const page = {
          title: item.replace(/#+ /g, ''),
          deep: (item.match(/#/g) || []).length,
          contents: [],
          catalog: [],
        }
        array.push(page)
        // json.push(page)
      } else {
        // 内容
        array[array.length - 1].contents.push(item.replace(/\s*- /, ''))
      }
    })

    let currIndex = [0]
    let currDeep = 2
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      if (currDeep === item.deep) {
        array[currIndex[currIndex.length - 1]].catalog.push(item.title)
      }
      if (currDeep < item.deep) {
        currDeep++
        currIndex.push(i - 1)
        // console.log('step: ', currDeep, currIndex, item)
        i--
      } else if (currDeep > item.deep && item.deep > 1) {
        currDeep--
        currIndex.pop()
        // console.log('step: ', currDeep, currIndex, item)
        i--
      }
    }
    // console.log('array: ', array)
    return array
  }

  function replaceSinglePage(pageTpl: Slide, data: TransformPage): Slide {
    const pptData = { ...pageTpl, elements: [] as PPTElement[] }
    const loopContent = (content: string, arrData: string[]) => {
      const match = content.match(/\$LOOP_START\$(.*)\$LOOP_END\$/)
      if (match) {
        let loopTlp: string = match[1]
        const catalogs: string[] = []
        arrData.forEach((item) => {
          catalogs.push(loopTlp.replace(/\$CATALOG\$/g, item).replace(/\$CONTENT\$/g, item))
        })
        content = content.replace(match[0], catalogs.join(''))
      }
      return content
    }
    pageTpl.elements.forEach((element) => {
      if (element.type !== 'text') {
        pptData.elements.push({ ...element })
      } else {
        let content = element.content
        content = content.replace(/\$TITLE\$/g, data.title)
        if (data.contents.length) {
          content = loopContent(content, data.contents)
        }
        if (data.catalog.length) {
          content = loopContent(content, data.catalog)
        }
        pptData.elements.push({ ...element, content })
      }
    })
    return pptData
  }

  function useTemplate(template: Slide[], pages: TransformPage[]) {
    const firstPageTpl = template.find((item) => item.type === 'title-only')
    const catalogTpl = template.find((item) => item.type === 'catalog')
    const contentTpl = template.find((item) => item.type === 'content')
    if (!firstPageTpl || !catalogTpl || !contentTpl) throw new Error('模板不完整')

    const pptPages: Slide[] = []
    pages.forEach((page) => {
      if (page.deep === 1) {
        pptPages.push(replaceSinglePage(firstPageTpl, page))
      } else if (page.catalog.length > 0) {
        pptPages.push(replaceSinglePage(catalogTpl, page))
      } else {
        pptPages.push(replaceSinglePage(contentTpl, page))
      }
    })

    template.forEach((item) => {
      if (item.type === 'not-template' || !item.type) {
        pptPages.push(item)
      }
    })
    return pptPages
  }

  return { mdString2TransformPages, useTemplate }
}
