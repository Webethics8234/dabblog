<div style={{display:'flex' ,flexDirection:'column' ,justifyContent:'center',alignItems:'center' }} >

{!responseimage ? (
  <div >
 <img   width="100px" height="100px" src={damiImage} />
</div>
) : (
<div>

 <img width="100px" height="100px" src={responseimage} />
  </div>
 )}

<button className="mt-2 btn btn-outline-danger " onClick={handleEditimage}>Edit Image.. </button>

 {editImage && (
<form className="mt-2" onSubmit={submitImage}>
 <div className="form-group">
  
   <input
     className="form-control"
     type="file"
     name="file"
     onChange={handleImage}
   />

    <div className=" text-center " >  <button className="btn btn-outline-success col-6 mt-1"  > submit </button></div> 
 </div>
 </form>
 )}
 <h1> {nameis}</h1> <br />

 </div>