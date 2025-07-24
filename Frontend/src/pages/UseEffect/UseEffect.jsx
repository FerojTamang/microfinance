import React, { useEffect, useState } from 'react'
import Card from './components/card'
import Form from './components/Form'
function UseEffect() {
  const [count, setCount]= useState(18)
  
  const IncreaseNum = () => {
    setCount (count + 1)
  }
  
  const DecreaseNum = () => {
    setCount (count - 1)
  }
 //
 /*useEffect (()=>
     { console.log("Hello inside console")
     }, [] ) */

/*  useEffect (() => {
console.log("This is the second type of useEffect")
  }, [count])  // count , count2 multiple state haru dina milxa hamle increase num ra decrease num lai different state ma chutayera gareni hunxa */

  //3rd Type of useEffect
  useEffect (() => {
console.log("This is third type of useEffects")
  } )

  return (


    <div>


<div class="m-6 p-4">
  <Form/>
</div>



  
<div class="flex flex-wrap justify-center space-x-5 m-6">
<Card/>
<Card/>
<Card/>
<Card/>

</div>

      
      <h1 class="bg-red-600" >{count}</h1>
      <button onClick = {IncreaseNum}> + </button>
      <button onClick = {DecreaseNum}> - </button>
    </div>

  
  )
}
import Forms from './components/Form'

export default UseEffect