import React from 'react'

export default class extends React.Component {
  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  render () {
    return (
      <p style={{fontSize: '66px', textAlign: 'center', margin: '300px 0'}}>{
        this.props.statusCode
          ? `${this.props.statusCode} 这是一片荒凉的沙漠🥺`
          : '这是一片荒凉的沙漠🥺'
      }</p>
    )
  }
}