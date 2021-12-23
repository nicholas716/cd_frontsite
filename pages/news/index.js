import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import Image from 'next/image'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/news/news.module.scss'

// images
import news from 'public/images/news.svg'

const News = props => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props

  return (
    <div className={'flex flex-wrap justify-center'}>
      <div className={styles.container}>
        <div className={globalStyles.container + (viewport === 'mobile' ? ' pt-8' : ' pt-20')}>
          <div className={'h-1/3 flex items-center'}>
            <div>
              <div className={styles.topTitle}>PRÓXIMAMENTE…</div>
              <div className={styles.topDash + (viewport === 'mobile' ? ' mt-2' : ' mt-4')} />
            </div>
          </div>
          <div className={'h-1/3 flex items-center justify-center'}>
            <div>
              <div className={'flex justify-center'}>
                <Image
                  src={news}
                  width={viewport === 'mobile' ? 273 : 400}
                  height={viewport === 'mobile' ? 52 : 93}
                  alt=""
                />
              </div>

              <div className={styles.description}>
                Un espacio exclusivo dónde puedes consultar todas las novedades y últimas publicaciones de CrysDyaz&Co
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default News

News.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
