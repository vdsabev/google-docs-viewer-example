import { html, render } from './dom.js'

const documentApiUrl = '/api/document'
const getDocumentId = () => new URLSearchParams(location.search).get('id')

/** @type {(props: { id: string, makeImagesResponsive?: boolean }) => HTMLIFrameElement}} */
const Document = ({ id, makeImagesResponsive }) => html`
  <iframe
    src="${documentApiUrl}/${id}"
    scrolling="no"
    onLoad=${(e) => {
      /** @type {HTMLIFrameElement} */ const iframe = e.target
      const iframeDocument = iframe.contentWindow.document
      iframe.style.height = `${iframeDocument.body.offsetHeight}px`

      if (makeImagesResponsive) {
        Array.from(iframeDocument.querySelectorAll('img')).forEach((img) => {
          img.style.maxWidth = '100%'
          img.style.width = img.parentNode.style.width = 'auto'
          img.style.height = img.parentNode.style.height = 'auto'
        })
      }
    }}
  />
`

render(
  html`<${Document} id="${getDocumentId()}" makeImagesResponsive />`,
  document.querySelector('main')
)
