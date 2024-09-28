import React from 'react'

function Booking() {
  return (
    // js html 
    <div>
        <header className='book'>
            <h2 >booking</h2>
        </header>

        <label className='email-log'>
            email: <input name="myInput" />
         </label>
        
        {
       <a className='login-click'
        href="ipark.email"
        style={{
        width: "100%",
        boxSizing: "border-box",
        padding: 12,
        fontWeight: 600,
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: "rgb(79,70,229)",
        color: "rgb(255,255,255)",
  }}
  >
  Login
 </a>
}
        
    </div>
  )
}

export default Booking
