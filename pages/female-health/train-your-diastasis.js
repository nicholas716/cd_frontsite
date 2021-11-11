import React from 'react'

// redux
import { useDispatch } from 'react-redux'

// custom component
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import ReadMoreButton from 'components/components/ReadMoreButton'
import CircularMark from 'components/components/CircularMark'
import CarouselFemaleHealth from 'components/FemaleHealth/CarouselFemaleHealth'
import OutlineButton from 'components/components/OutlineButton'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/female-health/PreparationForChildbirth.module.scss'

// json data
import ServerPhysiotherapy from 'assets/data/ServerPhysiotherapy'
import router from 'next/router'

const TrainYourDiastasis = () => {
  // loading part
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  React.useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted])

  // variables
  const [sliderData, setSliderData] = React.useState([])
  const [readMoreCurrentState, setReadMoreCurrentState] = React.useState('less')

  // handlers
  React.useEffect(() => {
    setSliderData(ServerPhysiotherapy)
  }, [])

  const handleReadMore = state => {
    setReadMoreCurrentState(state)
  }

  return (
    <div className={'w-full flex flex-wrap justify-center'}>
      <div className={globalStyles.container}>
        <div className={styles.backButtonArea}>
          <BackButton />
        </div>
        <div className={'grid grid-cols-12 gap-4'} style={{ minHeight: '634px' }}>
          <div className={'col-span-5 block'}>
            <div className={styles.strokeTitle}>Entrena</div>
            <div className={styles.pinkTitle}>TU DIÁSTASIS</div>
            <div className={styles.divider} />
            <div
              id="text"
              className={'relative ' + styles.text + ' ' + (readMoreCurrentState === 'less' ? '' : styles.expand)}
            >
              Actividad enfocada a personas que padecen diástasis abdominal y quieren trabajar su abdomen de manera más
              consciente. Su objetivo principal se centra en el trabajo de la musculatura profunda, tomando consciencia
              de ella a través de la respiración y la postura para conseguir un abdomen idóneo.
              <br />
              La diástasis abdominal puede estar presente tanto en hombres como en mujeres, provocada por una práctica
              prolongada de actividades hiperpresivas, embarazo, obesidad o patología inflamatoria intestinal.
              <br />
              Muy recomendada en postparto inicial, para reconectar con tu cuerpo antes de entrenos de mayor intensidad,
              y complemento ideal si tienes patología de hipotonía pélvica o prolapso de órganos pélvicos.
              <br />
              Para ello, utilizamos como material base el tronco de propiocepción, fitball, banda elástica y pequeños
              pesos.
              <ReadMoreButton currentState={readMoreCurrentState} onClick={state => handleReadMore(state)} />
            </div>
          </div>
          <div className={'col-span-7 relative flex justify-end'}>
            <div className={'absolute top-10 z-10'}>
              <CircularMark />
            </div>
            <div className={'w-full h-full mt-20 pb-20'}>
              <CarouselFemaleHealth sliderData={sliderData} />
            </div>
          </div>
        </div>
      </div>
      {/* Button group part */}
      <div className={'w-full pt-32'}>
        <div className={'grid grid-cols-12 gap-0'}>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton
              title="Compra 1 to 1 en streaming"
              link="/buy/buy-one-to-one"
              onClick={link => router.push(link)}
            />
          </div>
          <div className={'col-span-4 w-full flex'}>
            <OutlineButton title="Compra presenciales" link="/buy/buy-person" onClick={link => router.push(link)} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default TrainYourDiastasis

TrainYourDiastasis.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
