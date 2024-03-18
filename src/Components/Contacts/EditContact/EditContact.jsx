import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { contantServices } from '../../Services/ContactServices'
import Spinner from '../../../Spinner/Spinner'

const EditContact = () => {
  let navigate=useNavigate()
  let {contactID}=useParams()

  let [data,setData]=useState({
    loading:false,
    contact:{
      name:'',
      photo:'',
      mobileNo:'',
      emailId:'',
      title:'',
      company:'',
      group:''
    },
    groups:[],
    errorMessage:''
  })

  useEffect(()=>{
    let prom=new Promise((res1,rej1)=>{
      setData({...data,loading:true})
      let response=contantServices.getContact(contactID)
      res1(response)
      rej1()
    })
    prom.then((resp1)=>{
      setData({...data,loading:false,contact:resp1.data})
      console.log(resp1.data)
      return new Promise((res2,rej2)=>{
        setData({...data,loading:true})
        let groupResponse=contantServices.getAllGroups()
        res2(groupResponse)
        rej2()
      }).then((resp2)=>{
        setData({...data,loading:false,contact:resp1.data,groups:resp2.data})
      }).catch(()=>{
        alert("Data not found")
      })
    }).catch(()=>{
      alert("Data not found")
    })
  },[contactID])

  let updateInput=(e)=>{
    setData({...data,contact:{
      ...data.contact,[e.target.name]: e.target.value
    }})
  }

  let submitForm=(e)=>{
    e.preventDefault();
    let prom3=new Promise((res3,rej3)=>{
      let putContact=contantServices.updateContact(contactID,data.contact)
      res3(putContact)
      rej3()
    })
    prom3.then((resp3)=>{
      if (resp3) {
        setData({...data,contact:resp3.data})
        navigate("/contact/list",{replace:true})
      } else {
        navigate(`/contact/edit/${contactID}`,{replace:false})
      }
    }).catch(()=>{
      alert("Data is not Submitted..!!!")
    })
  }


  let {loading,contact,errorMessage,groups}=data;

  return (
    <div>
      {/* <pre>{JSON.stringify(contact)}</pre>
      <pre>{JSON.stringify(groups)}</pre> */}
      {/* Section-1 */}
      <section className="edit-contact p-3">
        <div className="container">

          {/* Row-1 */}
          <div className="row">
            <div className="col">
              <p className='h3 text-primary  fw-bold'>Edit Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, dicta impedit eos velit ipsum repellendus blanditiis perspiciatis dolore ex, soluta non delectus amet iure quas voluptatum corporis voluptate harum. Asperiores?</p>
            </div>
          </div>

          {
            loading ? <Spinner/> : <React.Fragment>
              {/* Row-2 */}
              <div className="row">

                {/* Col-1 */}
                <div className="col-md-5">
                  <form action="" onSubmit={submitForm}>
                    <div className="mb-2">
                      <input type="text" name="name" id="" className="form-control" value={contact.name} onChange={updateInput} required={true} placeholder='Enter Name'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name="photo" id="" className="form-control" value={contact.photo} onChange={updateInput} required={true} placeholder='Enter Photo URL'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name="mobileNo" id="" className="form-control" value={contact.mobileNo} onChange={updateInput} required={true} placeholder='Enter Mobile No.'/>
                    </div>
                    <div className="mb-2">
                      <input type="email" name="emailId" id="" className="form-control" value={contact.emailId} onChange={updateInput} required={true} placeholder='Enter E-Mail'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name="title" id="" className="form-control" value={contact.title} onChange={updateInput} required={true} placeholder='Enter Title'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name="company" id="" className="form-control" value={contact.company} onChange={updateInput} required={true} placeholder='Enter Company Name'/>
                    </div>
                    <div className="mb-2">
                      <select name="group" id="" className='form-control' value={contact.group} onChange={updateInput} required={true} >
                        <option value="">Select a group</option>
                        {
                          groups.length>0 && 
                          groups.map((group)=>{
                            return (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="mb-2">
                      <input type="submit" name="" id="" className="btn btn-secondary" value={'Update'}/>
                      <Link to={'/'} className='btn btn-danger ms-3'>Cancel</Link>
                    </div>
                  </form>
                </div>
                      
                {/* Col-2 */}
                <div className="col-md-5 mt-5 ms-4">
                  <img src={contact.photo} alt="" className='img-size1' />
                </div>
              </div>
            </React.Fragment>
          }
            
        </div>
      </section>
      
    </div>
  )
}

export default EditContact
