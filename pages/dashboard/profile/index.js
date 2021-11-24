import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'

// custom components
import SecondaryLayout from 'components/Layout/SecondaryLayout'
import NotificationButton from 'components/components/dashboard/NotificationButton'
// import Profile from 'components/components/dashboard/Profile'
import Personal from 'components/components/dashboard/Personal'
import Health from 'components/components/dashboard/Health'
import Graphic from 'components/components/dashboard/Graphic'

// styles
import styles from './profile.module.scss'
// graphql
import { useMutation, useLazyQuery } from '@apollo/client'
import graphql from 'crysdiazGraphql'
import toast from 'react-hot-toast'

const Profile = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [getPersonalInfo, { data: personalData, loading: personalLoading, error: personalError }] = useLazyQuery(
    graphql.queries.getPersonalInfo
  )
  const [savePersonalInfo] = useMutation(graphql.mutations.savePersonalInfo)
  const [deletePersonalInfo] = useMutation(graphql.mutations.deletePersonalInfo)

  useEffect(() => {
    getPersonalInfo()
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
  const router = useRouter()
  const [activeTab, setActiveTab] = useState({ personal: true, health: false, graphic: false })
  const [uploadFile, setUploadFile] = useState({})
  const [personalInfo, setPersonalInfo] = useState({
    id: -1,
    avatar: '',
    name: '',
    surname: '',
    email: '',
    country: '',
    address: '',
    town: '',
    date: '',
    password: '',
    meet: '',
    telephone: '',
    emergencyPhone: '',
    code: '',
    gender: '',
  })
  const [healthInfo, setHealthInfo] = useState({
    fatPercentage: '',
    visceralFat: '',
    boneMass: '',
    bodyMass: '',
    waterPercentage: '',
    muscleMass: '',
    metabolicExpense: '',
    metabolicAge: '',
    weight: '',
    height: '',
    waist: '',
    arm: '',
    hips: '',
    thigh: '',
    twin: '',
  })

  // handlers
  useEffect(() => {
    const currentState = router.asPath.split('#')
    if (currentState[1] === 'health') {
      setActiveTab({ personal: false, health: true, graphic: false })
    } else {
      router.push('/dashboard/profile#personal', undefined, { shallow: true })
    }
  }, [])

  useEffect(() => {
    if (!personalError && personalData && personalData.getPersonalInfo) {
      console.log('personal information ', personalData.getPersonalInfo)
      setPersonalInfo(personalData.getPersonalInfo)
    }
  }, [personalLoading, personalData, personalError])

  const handleClickTab = tabType => {
    setActiveTab({ [tabType]: true })
    router.push(`/dashboard/profile#${tabType}`, undefined, { shallow: true })
  }

  const handleChangeAvatar = event => {
    const newImage = event.target.files[0]
    setUploadFile(newImage)
    if (newImage) {
      setPersonalInfo({ ...personalInfo, avatar: URL.createObjectURL(newImage) })
    }
  }

  const handleSavePersonal = () => {
    console.log('handleSavePersonal', uploadFile)
    dispatch({ type: 'set', isLoading: true })
    let _personalInfo = { ...personalInfo }
    _personalInfo = { ..._personalInfo, imageFile: uploadFile }
    savePersonalInfo({
      variables: {
        _personalInfo,
      },
    })
      .then(response => {
        if (response.data.savePersonalInfo) {
          getPersonalInfo()
          toast.success('Successfully save personal account!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        dispatch({ type: 'set', isLoading: false })
        toast.error(error.message)
      })
  }

  const handleDiscardPersonal = () => {
    setPersonalInfo({
      avatar: '',
      name: '',
      surname: '',
      email: '',
      country: '',
      address: '',
      town: '',
      date: '',
      password: '',
      meet: '',
      telephone: '',
      emergencyPhone: '',
      code: '',
      gender: '',
    })
  }

  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  const handleDeleteAccount = () => {
    console.log('handleDeleteAccount')
    dispatch({ type: 'set', isLoading: true })
    deletePersonalInfo()
      .then(response => {
        if (response.data.deletePersonalInfo) {
          getPersonalInfo()
          toast.success('Successfully delete personal information!')
          dispatch({ type: 'set', isLoading: false })
        }
      })
      .catch(error => {
        toast.error(error.message)
        dispatch({ type: 'set', isLoading: false })
      })
  }

  const handleSaveMeasure = () => {
    console.log('handleSaveMeasure')
  }

  const handleDiscardMeasure = () => {
    console.log('handleDiscardMeasure')
  }

  const handleChangeHealth = (event, key) => {
    setHealthInfo({ ...healthInfo, [key]: event.target.value })
  }

  return (
    <div className={'pt-10 pb-24 px-24 ' + styles.container}>
      <div className={'flex justify-between'}>
        <div>
          <div className={styles.highBoldLabel}>Perfil</div>
          <div className={'pt-2 ' + styles.mediumLabel}>80% Perfil Completado</div>
        </div>
        <div className={'flex justify-end items-center'}>
          <NotificationButton />
          {/* <Profile /> */}
        </div>
      </div>
      <div className={'my-8 ' + styles.divider} />
      <div className={'flex'}>
        <div
          className={'mr-10 ' + (activeTab.personal ? styles.activeTab : styles.deactiveTab)}
          onClick={() => handleClickTab('personal')}
        >
          Personales
        </div>
        <div
          className={activeTab.health || activeTab.graphic ? styles.activeTab : styles.deactiveTab}
          onClick={() => handleClickTab('health')}
        >
          Antropométricos
        </div>
      </div>
      <div className={'pt-7'}>
        {activeTab.personal && (
          <Personal
            personalInfo={personalInfo}
            handleChangeAvatar={handleChangeAvatar}
            handleSave={handleSavePersonal}
            handleDiscard={handleDiscardPersonal}
            handleChangePersonal={handleChangePersonal}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}
        {activeTab.health && (
          <Health
            handleSave={handleSaveMeasure}
            handleDiscard={handleDiscardMeasure}
            handleClickTab={handleClickTab}
            handleChangeHealth={handleChangeHealth}
          />
        )}
        {activeTab.graphic && <Graphic handleClickTab={handleClickTab} />}
      </div>
    </div>
  )
}
export default Profile

Profile.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
