import React from 'react'

const links=["Home", " Templates" , "Login"]
function Navbar() {
  return (
    <div className='h-20  w-full flex items-center justify-between px-10'>
<div>Logo</div>
<div className='flex gap-5'>{links.map((link)=>{
return(
  <div className='font-semibold'>{link}</div>
)
})}</div>
    </div>
  )
}

export default Navbar