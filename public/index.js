import { html, render, Component } from './dom.js'

const documentApiUrl = '/api/document'
const getDocumentId = () => new URLSearchParams(location.search).get('id')

/** @type {(props: { id: string, makeImagesResponsive?: boolean }) => HTMLIFrameElement}} */
class Document extends Component {
  render({ id, makeImagesResponsive }) {
    const { documentHeight } = this.state
    const setDocumentHeight = (documentHeight) => {
      this.setState({ documentHeight })
    }

    return html`
      <iframe
        src="${documentApiUrl}/${id}"
        scrolling="no"
        style=${documentHeight == null
          ? { opacity: 0 }
          : { animation: 'fadeIn 600ms', height: `${documentHeight}px` }}
        onLoad=${(e) => {
          /** @type {HTMLIFrameElement} */ const iframe = e.target
          const iframeDocument = iframe.contentWindow.document
          if (makeImagesResponsive) {
            Array.from(iframeDocument.querySelectorAll('img')).forEach(
              (img) => {
                img.style.maxWidth = '100%'
                img.style.width = img.parentNode.style.width = 'auto'
                img.style.height = img.parentNode.style.height = 'auto'
              }
            )
          }
          setDocumentHeight(iframeDocument.body.offsetHeight)
        }}
      />
    `
  }
}

render(
  html`<${Document} id="${getDocumentId()}" makeImagesResponsive />`,
  document.querySelector('main')
)
