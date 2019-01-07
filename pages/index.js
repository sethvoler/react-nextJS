import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import style from '../json2CSS/index.json'

export default class extends React.Component {
  static async getInitialProps () {
    if(!process.browser) {
      const res = await axios.get('https://api.apiopen.top/musicRankings')
      return {data: res.data.result}
    } else {
      return {data: JSON.parse(sessionStorage.getItem('mr'))}
    }
  }

  componentDidMount () {
    if(!sessionStorage.getItem('mr') || sessionStorage.getItem('mr') === 'undefined') sessionStorage.setItem('mr', JSON.stringify(this.props.data))
  }
  render () {
    return (
      <div>
        <Head>
            <title>音乐排行榜</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="wrap">
          <div style={style.head}>
            音乐排行榜
          </div>
          <div style={style.main}>
            <div style={style.list}>
              {this.props.data.map((item, i) => {
                return (
                  <div key={'out'+i}>
                    <div style={{
                      color: '#'+item.color.substring(2),
                      background: 'url(' + item.bg_pic + ') #' + item.bg_color.substring(2) + ' 10px 5px no-repeat',
                      backgroundSize: '80px 20px',
                      height: '30px',
                      lineHeight: '30px',
                      paddingLeft: '100px'
                    }}>{item.name}</div>                  
                    {item.content.map((ele, j) => {
                      return (
                        <div key={'inner'+j} style={style.box}>
                          <div style={style.itemTitle1}>{j+1}</div>
                          <div style={{
                            marginTop: "10px",
                            backgroundImage: 'url(' + ele.pic_small + ')',
                            width: '90px',
                            height: '90px',
                            borderRadius: '100%'
                          }}></div>
                          <div style={style.desc}>
                            <h4 style={style.album}>专辑： {ele.album_title}</h4>
                            <h5 style={style.album}>歌名： {ele.title}</h5>
                            <h5 style={style.album}>歌手： {ele.author}</h5>
                          </div>
                        </div>
                      )
                    })}                  
                    <Link href={`/details?type=${item.type}`}><a style={style.right}>更多...</a></Link>
                    <div style={style.hold}></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}