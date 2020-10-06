import html from './html.js'

const baseUrl = '/.netlify/functions'
const getDocumentId = () => new URLSearchParams(location.search).get('id')

/** @type {(props: { id: string }) => HTMLIFrameElement}} */
const Document = ({ id }) => html`
  <iframe
    src="${baseUrl}/document/${id}"
    scrolling="no"
    onLoad=${(e) => {
      /** @type {HTMLIFrameElement} */ const iframe = e.target
      iframe.style.height = `${iframe.contentWindow.document.body.offsetHeight}px`
    }}
  />
`

document.querySelector('main').appendChild(Document({ id: getDocumentId() }))
