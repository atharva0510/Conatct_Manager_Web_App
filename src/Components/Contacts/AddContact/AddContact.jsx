import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contantServices } from '../../Services/ContactServices'
import Spinner from '../../../Spinner/Spinner'

const AddContact = () => {
  let navigate=useNavigate()

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
    let prom1 = new Promise((res,rej)=>{
      setData({...data,loading:true,})
      let groupResponse=contantServices.getAllGroups()
        res(groupResponse)
        rej()
    })
    prom1.then((resp1)=> {
      setData({...data,loading:false,groups:resp1.data})
      console.log(resp1.data)
    }).catch(()=>{
      alert("Data Not Found..!!");
    })
  },[])

  let updateInput=(e)=>{
    setData({...data,contact:{
      ...data.contact,[e.target.name]: e.target.value
    }})
  }

  let submitForm=(e)=>{
    e.preventDefault();
    let prom2=new Promise((res1,rej1)=>{
      let postContact=contantServices.createContact(data.contact)
      res1(postContact)
      rej1()
    })
    prom2.then((resp2)=>{
      if (resp2) {
        navigate("/contact/list",{replace:true})
      } else {
        navigate("/contact/add",{replace:false})
      }
    }).catch(()=>{
      alert("Data is not Submitted..!!!")
    })
  }

  let {loading,contact,groups,errorMessage}=data;

  return (
    <div>
      {/* <pre>{JSON.stringify(groups)}</pre> */}
      <pre>{JSON.stringify(contact)}</pre>
      {/* Section-1 */}
      <section className="create-contact p-3">
        <div className="container">

          {/* Row-1 */}
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione incidunt omnis illo nihil velit? Ipsa sequi officia consectetur omnis. Error sint labore beatae veniam nesciunt harum dicta sit eligendi molestias?</p>
            </div>
          </div>

          {
            loading ? <Spinner/> : <React.Fragment>
              {/* Row-2 */}
              <div className="row">
                <div className="col-md-5">
                  <form action="" onSubmit={submitForm}>
                    <div className="mb-2">
                      <input type="text" name="name" id="" className="form-control" value={contact.name} onChange={updateInput} required={true} placeholder='Enter Name'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name="photo" id="" className="form-control" value={contact.photo} onChange={updateInput} required={true} placeholder='Enter Photo URL'/>
                    </div>
                    <div className="mb-2">
                      <input type="text" name="mobileNo" id="" className="form-control" value={contact.mobileNo} onChange={updateInput} required={true} placeholder='Enter Mobile No'/>
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
                      <select name="group" id="" className='form-control' value={contact.group} onChange={updateInput} required={true}>
                        <option value="">Select a group</option>
                        {
                          groups.length>0 && groups.map((group)=>{
                            return <option key={group.id} value={group.id}>{group.name}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="mb-2">
                      <input type="submit" name="" id="" className="btn btn-secondary" value={"Create"}/>
                      <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                    </div>
                  </form>
                </div>
              </div>
            </React.Fragment>
          }
          
        </div>
      </section>

    </div>
  )
}

export default AddContact
