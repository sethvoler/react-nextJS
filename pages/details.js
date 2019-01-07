import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import style from '../json2CSS/details.json'

export default class extends React.Component {
  static async getInitialProps ({query}) { 
    const res = await axios.get(`https://api.apiopen.top/musicRankingsDetails?type=${query.type}`)
    return {
      dataDetail: res.data.result,
      type: query.type
    }
  }
  
  render() {
    const title = 
      this.props.type === '1'
        ? '新歌榜'
        : this.props.type === '2'
          ? '热歌榜'
          : this.props.type === '21'
            ? '欧美金曲榜'
            : this.props.type === '20'
              ? '华语金曲榜'
              : this.props.type === '22'
                ? '经典老歌榜'
                : this.props.type === '25'
                  ? '网络歌曲榜'
                  : this.props.type === '24'
                    ? '影视金曲榜'
                    : '情歌对唱榜'     
      return  (
        <div>
            <Head>
                <title>音乐排行榜</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            
            <div>
              <div style={style.title}>
                <Link href={'/'}><a style={style.back}>返回</a></Link>
                {title}
              </div>
              <Link href={'/xxx'}><div style={style.list}>
                {
                  this.props.dataDetail.map((item, i) => {
                    return (
                      <div style={style.item} key={i}>
                        <div style={
                          i === 0
                            ? style.order1
                            : i === 1
                              ? style.order2
                              : i === 2
                                ? style.order3
                                : style.order}>{i+1}</div>
                        <div style={style.detail}>
                          <div style={{
                            backgroundImage: 'url(' + item.pic_big + ')',
                            width: '100px',
                            height: '100px',
                            backgroundSize: '100px 100px'
                          }}></div>
                          <div style={style.desc}>
                            <div style={style.album}>专辑： {item.album_title}</div>
                            <div style={style.album}>歌名： {item.title}</div>
                            <div style={style.album}>歌手： {item.artist_name}</div>
                            <div style={style.album}>语言： {item.language}</div>
                            <div style={style.album}>地区： {item.country}</div>
                            <div style={style.album}>出品： <span style={style.small}>{item.si_proxycompany}</span></div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div></Link>
            </div>
        </div>
      )
  }
}