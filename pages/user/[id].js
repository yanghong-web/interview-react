import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useTranslation, } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import * as requestIp from 'request-ip'


export default function Home(props) {
  const { t, i18n } = useTranslation("nav")

  ///屏幕宽高
  const [pageHeight, setPH] = useState(0)
  const [pagewidth, setPW] = useState(0)
  //鼠标位置
  const [mousePosition, setMP] = useState([0, 0])
  const [currentDate, setDate] = useState("")
  let timer = useRef(null)
  ///节流
  const throttle = (fn) => {
    let timer = null
    return (e) => {
      if (timer) return
      timer = setTimeout(() => {
        fn?.(e)
        timer = null
      }, 200)
    }
  }

  useEffect(() => {
    i18n.changeLanguage("zh-CN")
    console.log(i18n, "i18n");
    setPH(window.innerHeight)
    setPW(window.innerWidth)
    //监听
    window.onresize = throttle(() => {
      setPH(window.innerHeight)
      setPW(window.innerWidth)
    })
    window.onmousemove = throttle((e) => {
      setMP([e.clientX, e.clientX])
    })
    timer = setInterval(() => {
      setDate(new Date().toLocaleString())
    })
    //解绑
    return () => {
      window.onresize = null
      window.onmousemove = null
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main} >
        <h1 className={styles.title}>{t("welcom")}{t('home')}, {/* USER */}{props.id}</h1>

        <div className={styles.grid}>

          <a onClick={
            () => {
              console.log(window)
            }
          } className={styles.card}>
            <h2>{t("status")} 1 &rarr;</h2>
            <p>{t("ph")}:{pageHeight}</p>
            <p>{t("pw")}:{pagewidth}</p>
          </a>

          <a className={styles.card} >
            <h2>{t("status")} 2 &rarr;</h2>
            <p className={styles.maxLine}>{t("mp")}:{mousePosition.join(",")}</p>
          </a>

          <a className={styles.card}>
            <h2>{t("status")} 3 &rarr;</h2>
            <p >{t("currentDate")}:</p>
            <p className={styles.maxLine}>{currentDate}</p>
          </a>

          <a className={styles.card}>
            <h2>{t("status")} 4 &rarr;</h2>
            <p>{t("ip")}:{props.ip}</p>
          </a>
        </div>
        <button onClick={() => {
          i18n.resolvedLanguage === "en-US" ? i18n.changeLanguage("zh-CN") : i18n.changeLanguage("en-US")
        }}>{t('lng')}</button>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div >
  )
}



export async function getServerSideProps({ query, req, }) {
  let ip = requestIp.getClientIp(req)
  ip = ip.replace("::1", "127.0.0.1")
  ip = ip.replace("::ffff:", "")

  return { props: { ...query, ip } }
}
