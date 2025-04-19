import Rightside from './Rightside'
import Leftside from './Leftside'





const Chatlayout = () => {
  
  return (
    <>
    <section style={{ background: 'linear-gradient(to right, #c2e59c, #64b3f4)', overflow: "auto" }}>
      <div className="container d-flex align-items-md-center justify-content-center py-md-0 py-4" style={{height: "100vh"}}>
        <div className="row w-100">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: 12 }}>
              <div className="card-body">
                <div className="row">
                  {/* Contacts List */}
                  <Leftside/>
                  {/* Chat Section */}
                  <Rightside/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Hover Effect */}
      <style>
        {`
          .chat-item:hover {
            background-color: #f1f1f1 !important;
            cursor: pointer;
          }
        `}
      </style>

    </section>
    </>
  )
}

export default Chatlayout















