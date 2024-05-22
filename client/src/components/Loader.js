import React , {useState} from 'react'
import ClockLoader from "react-spinners/ClockLoader";
function Loader() {
    let [loading, setLoading] = useState(true);
  return (
    <div >
          <div className="sweet-loading" style={{ paddingLeft: '500px', paddingTop: '255px' }} >

      <ClockLoader


        color='#524c42'
        loading={loading}
        cssOverride=''
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>

    </div>
  )
}

export default Loader
