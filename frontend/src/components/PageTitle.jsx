/* eslint-disable react/prop-types */
import React from 'react'
import { Helmet } from 'react-helmet'

function PageTitle({title,children}) {
  return (
        <Helmet>
        <title>{title} | MERN Ecommerce project</title>
        {children}
      </Helmet>
  )
}

export default PageTitle