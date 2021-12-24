import React, { useState, useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// custom components
import MobileDashboardLayout from 'components/Layout/MobileDashboardLayout'
import ProfileCommonText from 'components/components/dashboard/profile/ProfileCommonText'

import moment from 'moment'

// styles
import styles from './personalData.module.scss'

const PersonalData = () => {
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
  const router = useRouter()
  const genderList = ['WOMAN', 'MAN']
  const meetList = ['INSTAGRAM', 'FACEBOOK', 'PRENSA']
  const [personalInfo, setPersonalInfo] = useState({
    id: -1,
    avatar: '',
    name: '',
    surname: '',
    email: localStorage.getItem('email') || '',
    password: '',
    meet: 'INSTAGRAM',
    telephone: '',
    emergencyPhone: '',
    birthday: new Date(),
    code: '',
    gender: 'WOMAN',
  })
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    town: '',
    country: '',
    aliasAddress: '',
    cp: '',
    province: '',
  })

  const handleChangePersonal = (event, key) => {
    setPersonalInfo({ ...personalInfo, [key]: event.target.value })
  }

  const handleChangeShipping = (event, key) => {
    setShippingInfo({ ...shippingInfo, [key]: event.target.value })
  }

  return (
    <div className={'flex justify-center ' + styles.container}>
      <div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'name')}
            label={'Nombre'}
            placeholder={''}
            type={'text'}
            value={personalInfo.name}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'surname')}
            label={'Apellidos'}
            placeholder={''}
            type={'text'}
            value={personalInfo.surname}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'password')}
            label={'Contraseña'}
            placeholder={''}
            type={'password'}
            value={personalInfo.password}
            disabled={true}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'birthday')}
            label={'Fecha nacimiento'}
            placeholder={''}
            type={'date'}
            value={moment(personalInfo.birthday).format('YYYY-MM-DD')}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'meet')}
            label={'Cómo nos conoció…'}
            placeholder={''}
            type={'select'}
            list={meetList}
            value={personalInfo.meet}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'code')}
            label={'DNI'}
            placeholder={''}
            type={'text'}
            value={personalInfo.code}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'email')}
            label={'Email'}
            placeholder={''}
            type={'email'}
            value={personalInfo.email}
            disabled={true}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'telephone')}
            label={'Teléfono'}
            placeholder={''}
            type={'tel'}
            value={personalInfo.telephone}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangePersonal(e, 'emergencyPhone')}
            label={'Teléfono emergencia'}
            placeholder={''}
            type={'tel'}
            value={personalInfo.emergencyPhone}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            label={'Sexo'}
            list={genderList}
            handleChange={e => handleChangePersonal(e, 'gender')}
            type={'select'}
            value={personalInfo.gender}
          />
        </div>
        <div className="flex justify-between items-center my-9 w-full">
          <div className={styles.shippingData}>DATOS DE ENVIO</div>
          <div className={styles.divider + ' my-3'}></div>
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'name')}
            label={'Nombre'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.name}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'aliasAddress')}
            label={'Alias de la dirección ( ej. casa, trabajo…)'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.aliasAddress}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'address')}
            label={'Dirección'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.address}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'town')}
            label={'Población'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.town}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'cp')}
            label={'CP'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.cp}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'province')}
            label={'Provincia'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.province}
          />
        </div>
        <div className={'pt-1 py-3'}>
          <ProfileCommonText
            handleChange={e => handleChangeShipping(e, 'country')}
            label={'País'}
            placeholder={''}
            type={'text'}
            value={shippingInfo.country}
          />
        </div>
      </div>
    </div>
  )
}
export default PersonalData

PersonalData.getLayout = function getLayout(page) {
  return <MobileDashboardLayout title="Perfil">{page}</MobileDashboardLayout>
}
