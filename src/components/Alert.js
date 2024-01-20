import React from 'react'

export default function Alert(props) {
    const capitalize=(word)=>{
         if(word==="danger : "){
            word="Error : "
          }
         return word;
    }
  
  return (<>
 
  <div style={{height:'60px'}}>
  { props.alert &&<div  className={`alert alert-${props.alert.type}warning alert-dismissible fade show`} role="alert">
    <strong>{capitalize(props.alert.type)}</strong>{props.alert.mess}

</div>}
</div>
  </>
  )

}