const React = require("react")

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `ko-KR` })
}
