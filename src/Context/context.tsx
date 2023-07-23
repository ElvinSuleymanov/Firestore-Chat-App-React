import {createContext} from 'react'
import  {useState,useContext} from 'react'
import React from 'react'

export const Store = createContext({})
interface props  {
children:React.ReactNode
}

const ContextComp = ({children}:props) => {
    const [value,setValue] = useState()
    const contextContent = {
      value,
      setValue
    }

    return (
        <Store.Provider value={contextContent}>
            {children}
        </Store.Provider>
    )
}

export default ContextComp