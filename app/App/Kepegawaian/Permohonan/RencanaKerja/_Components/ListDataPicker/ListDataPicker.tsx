'use client'
import React, { Fragment, useRef, useState } from 'react'

import LDP from './ListDataPicker.module.css'
import { setCookie } from 'cookies-next'


interface Kelompok__inter {
  [key: string]: Object[]
}

interface Open__inter {
  [key: string]: boolean
}


interface ListDataPicker_inter {
  placeholder?: string,
  data?: any,
  group?: string,
  dataDisplay: string,
  idDisplay: string,
}

export default function ListDataPicker(
  { placeholder = "Cari ...", data, group = '', dataDisplay, idDisplay
  }: ListDataPicker_inter) {



  const [DataState, filterDataState] = useState<any>(data)
  const [GroupDataState] = useState<any>(group != "" ? Func_groupData(data, group, dataDisplay, idDisplay) : {})
  const [GroupDataOpen, setGroupDataOpen] = useState<Open__inter>({})
  const [SelectedData, setSelectedData] = useState<Object>({})

  const [SearchState, setSearchState] = useState("")

  function Func_groupData(data: any, group: string, dataDisplay: string, idDisplay: string) {

    let Kelompok: Kelompok__inter = {}

    for (var i = 0; i < data.length; i++) {

      let Obj_Data = { [dataDisplay]: data[i][dataDisplay], [idDisplay]: data[i][idDisplay] }

      if (data[i][group]) {
        let Unit: string = JSON.stringify(data[i][group])

        if (!Kelompok[JSON.parse(Unit)]) {
          Object.assign(Kelompok, { [JSON.parse(Unit)]: [Obj_Data] })

        } else {
          if (Kelompok[data[i][group]!] && data[i][group] != undefined) {
            //@ts-ignore 
            Kelompok[data[i][group]].push(Obj_Data)
          }
        }

      } else {

        if (data[i]['kode kantor posisi fungsional'] === "4502150000") {
          if (!Kelompok['Fungsional Pemeriksa']) {
            Object.assign(Kelompok, { 'Fungsional Pemeriksa': [Obj_Data] })

          } else {
            Kelompok['Fungsional Pemeriksa'].push(Obj_Data)
          }

        }

      }
    }

    return Kelompok
  }


  function CheckUnCheck(e: any, dataTarget: string, IDTarget: string) {

    let isChecked = e.target.checked


    if (isChecked === true) {
      let AddData = { [IDTarget]: dataTarget }
      setSelectedData({ ...SelectedData, ...AddData })
    } else {
      delete SelectedData[IDTarget as keyof typeof SelectedData]
      setSelectedData({ ...SelectedData, ...SelectedData })
    }


  }

  // Function
  function CheckAll({ CheckKelompok }: { CheckKelompok: any }) {



    return (
      <>
        <div className={LDP['container__ListDataSeksi']}
        // onClick={() => CheckAllKelompok(CheckKelompok)}
        >
          <div className={LDP['ListData__box']} >
            <input
              className={LDP['checkAll']}
              type="checkbox"
              defaultChecked={false}
              data-kelompok={CheckKelompok}
              name={"CheckAll"}
            />
          </div>

          <span
            className={LDP['ListData__label']}
          >
            ( PILIH SEMUA )
          </span>
        </div>
      </>
    )
  }

  // Function
  function SearchPegawai() {



  }


  // Components (masih bisa diimprove dijadikan 1 dengan dataPegawai)
  function ListData({ Data, dataDisplay }: { Data: any, dataDisplay: string }) {

    return (

      <>
        <div
          className={LDP['container__ListData']}
          search-target={"true"}
        >

          <DisplayData Data={Data} dataDisplay={dataDisplay} />
        </div>

      </>

    )
  }

  console.log("GroupDataOpen", GroupDataOpen)
  // Components
  function GroupListData() {


    let GroupKeys = Object.keys(GroupDataState)

    function OpenDetails(e: any, GroupName: keyof typeof GroupDataOpen) {
      console.log("OPEN", e)
      setGroupDataOpen({ ...GroupDataOpen, ...{ [GroupName]: true } })
    }

    return (
      <>
        {
          GroupKeys.map((KelKeys: string, i: number) => {

            let OpenStatus = GroupDataOpen[KelKeys]

            return (
              <Fragment key={KelKeys}>
                <details
                  className={LDP['container__Details']}
                  open={OpenStatus ? true : false}
                  // open={true}
                  onChange={(e) => OpenDetails(e, KelKeys)}
                >

                  {/* <CheckAll CheckKelompok={KelKeys} /> */}


                  <DisplayData Data={GroupDataState[KelKeys]} dataDisplay={dataDisplay} />

                  <summary className={LDP['container__summary']}>
                    {KelKeys.toUpperCase()} <span></span>
                  </summary>


                </details>
              </Fragment>
            )
          })
        }
      </>
    )
  }


  function DisplayData({ Data, dataDisplay }: { Data: any, dataDisplay: string }) {

    function isChecked(id: keyof typeof SelectedData) {
      let check = SelectedData[id]

      if (!check) {
        return false
      }
      else {
        return true
      }

    }

    return (
      <>
        {
          Data.map((da: any, i: any) => {

            return (
              <Fragment key={da[dataDisplay]}>
                <label className={LDP['ListData__box']} htmlFor={da[dataDisplay]}>

                  <input
                    type="checkbox"
                    className={LDP['check']}
                    id={da[dataDisplay]}

                    onChange={(e) => CheckUnCheck(e, da[dataDisplay], da[idDisplay])}
                    defaultChecked={isChecked(da[idDisplay])}
                  />

                  <span
                    className={LDP['ListData__display']}
                  >
                    {da[dataDisplay]}
                  </span>

                </label>

              </Fragment>
            )
          })
        }
      </>
    )
  }


  return (
    <>

      <div className={LDP['separator']} >


        <div className={LDP['container']} >
          <input
            className={LDP['container__search']}
            type="text"
            placeholder='Cari Pegawai ...'

            // onChange={() => SearchPegawai()}
            name={"container__search"}
          />

          <div className={LDP['container__pegawai']}>
            <GroupListData />
            <ListData Data={DataState} dataDisplay={dataDisplay} />
          </div>


        </div>
        <div className={LDP['container__selected']} >
          <ol>
            {
              Object.values(SelectedData).map((sels: string, i: number) => {

                return (
                  <Fragment key={sels} >
                    <li>{sels}</li>
                  </Fragment>
                )
              })
            }
          </ol>

        </div>
      </div>
    </>
  )
}
