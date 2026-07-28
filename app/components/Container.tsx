import React from 'react'

function Container({children,className}:{children:React.ReactNode,className?:string}) {
  return (
    <div className={`max-w-4xl mx-auto bg-white dark:bg-black p-4 md:p-10  ${className}`}>{children}</div>
  )
}

export default Container