import React from "react";


import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return  (

    <div className="loding" >
<Spinner className="spiner" animation="grow" />

    </div>

  ) 
}

export default Loading;