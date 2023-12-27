import React, { useCallback, useEffect, useMemo, useState } from "react";
import './App.css';
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import axios from 'axios'



export const Form = () => {
    dayjs.extend(isSameOrBefore);

    const [data, setData] = useState(JSON.parse(localStorage.getItem("table")) || []);

    const [inputdata, setInputdata] = useState({
        fname: "",
        email: "",
        birthday: "",
        pass: "",
        tel: "",
        college: "",
        year: ""
    })

    const getdata = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => { console.log(res) })
            .catch((res) => { console.log(res) });
    }

    useEffect(() => {
        getdata()
    },[data])

    const handleChange = (e) => {
        console.log(e.target.value)

        if (e.target.name === "birthday") {

            setInputdata({ ...inputdata, birthday: dayjs(e.target.value).format('YYYY-MM-DD') })
        }
        else { setInputdata({ ...inputdata, [e.target.name]: e.target.value }); }
    }

    

    // Submitdata.........

    const handleSubmit = () => {
        if (dayjs(inputdata.birthday).isSameOrBefore(dayjs('2024-01-01'))) {
            console.log("true")
        }
        else {
            console.log("false")
        }
        if (isEdit !== -1) {
            const editrecord = data.map((item, index) => {
                if (isEdit === index) return inputdata
                else return item
            })
            setData(editrecord);
        } else {

            axios.get("https://jsonplaceholder.typicode.com/posts", data)
                .then((res) => { console.log(res) })
                .catch((res) => { console.log(res) });

            setData([...data, inputdata])
            localStorage.setItem('table', JSON.stringify([...data, inputdata]));
        }
    }

    // Editdata........

    const [isEdit, setisEdit] = useState(-1)

    const handleEdit = (index) => {
        setisEdit(index);
        const editdata = data.find((item, ind) => ind === index);
        setInputdata(editdata);
        localStorage.setItem('table', JSON.stringify(editdata));
    }

    // Editdata........

    const handleDelete = (index) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${index}`)
            .then((res) => {
                console.log(res)
                getdata()
            })
            .catch((res) => { console.log(res) })

        const deletedata = data.filter((item, ind) => ind !== index);
        setData(deletedata);
        localStorage.setItem('table', JSON.stringify(deletedata));
    }


    // Searchdata...........

    const [select, setSelect] = useState();
    const [searchdata, setSearchData] = useState();

    const getsearchdata = useMemo(() => {
        if (select === "fname") {
            return data.filter((item, index) => item.fname.toLowerCase().includes(searchdata.toLowerCase()))
        }
        if (select === "email") {
            return data.filter((item, index) => item.email.toLowerCase().includes(searchdata.toLowerCase()))
        }
        if (select === "birthday") {
            return data.filter((item, index) => dayjs(item.birthday).format('DD/MM/YYYY').toLowerCase().includes(searchdata.toLowerCase()))
        }
        if (select === "pass") {
            return data.filter((item, index) => item.pass.toLowerCase().includes(searchdata.toLowerCase()))
        }
        if (select === "phone") {
            return data.filter((item, index) => item.phone.toLowerCase().includes(searchdata.toLowerCase()))
        }
        if (select === "college") {
            return data.filter((item, index) => item.college.toLowerCase().includes(searchdata.toLowerCase()))
        }
        if (select === "year") {
            return data.filter((item, index) => item.year.toLowerCase().includes(searchdata.toLowerCase()))
        }

        else return data
    }, [select, data])

    // Sortdata........

    const [sortt, setSortt] = useState();

    const sorting = useMemo(() => {
        if (sortt === 'First Name') {
            return data.sort((a, b) => a.fname.localeCompare(b.fname))
        }
        if (sortt === 'Email') {
            return data.sort((a, b) => a.email.localeCompare(b.email))
        }
        if (sortt === 'Birthday') {
            return data.sort((a, b) => a.birthday.localeCompare(b.birthday))
        }
        if (sortt === 'Password') {
            return data.sort((a, b) => a.pass.localeCompare(b.pass))
        }
        if (sortt === 'Phone') {
            return data.sort((a, b) => a.phone.localeCompare(b.phone))
        }
        if (sortt === 'College') {
            return data.sort((a, b) => a.college.localeCompare(b.college))
        }
        if (sortt === 'Year') {
            return data.sort((a, b) => a.year.localeCompare(b.year))
        }
        else return data
    }, [sortt])
    console.log(sortt)



    return (
        <>
            <div className="bg">

                {/* Form...... */}

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
                    <div>
                        <table>


                            <tr>
                                <td className="first"><label htmlFor="fname" style={{ fontSize: "23px" }}>Full Name : </label></td>
                                <td className="second"><input type="text" name="fname" placeholder="Full Name " onChange={(e) => handleChange(e)} value={inputdata.fname} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>


                            <tr>
                                <td className="first">  <label htmlFor="email" style={{ fontSize: "23px" }}>Email Address : </label></td>
                                <td className="second"> <input type="email" name="email" placeholder="Email " onChange={(e) => handleChange(e)} value={inputdata.email} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>


                            <tr>
                                <td className="first">   <label htmlFor="birthday" style={{ fontSize: "23px" }}>Date of Birth : </label></td>
                                <td className="second">   <input type="date" name="birthday" onChange={(e) => handleChange(e)} value={inputdata.birthday} style={{ padding: "8px", width: "400px", marginLeft: "15px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first"> <label htmlFor="pass" style={{ fontSize: "23px" }}>Password : </label></td>
                                <td className="second">   <input type="password" name="pass" placeholder="Password " onChange={(e) => handleChange(e)} value={inputdata.pass} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first">  <label htmlFor="phone" style={{ fontSize: "23px" }}>Phone Number : </label></td>
                                <td className="second">   <input type="tel" name="phone" placeholder="Phone number " onChange={(e) => handleChange(e)} value={inputdata.phone} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first">  <label htmlFor="college" style={{ fontSize: "23px" }}>School/College : </label></td>
                                <td className="second">  <input type="text" name="college" placeholder="School/College " onChange={(e) => handleChange(e)} value={inputdata.college} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first">  <label htmlFor="year" style={{ fontSize: "23px" }}>Grade/Year : </label></td>
                                <td className="second">  <input type="text" name="year" placeholder="Year " onChange={(e) => handleChange(e)} value={inputdata.year} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>
                        </table>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>

                {/* Searchdata..... */}

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "1%" }}>
                    <tr>
                        <td>
                            <input type="search" name="search" placeholder="Search... " onChange={(e) => setSearchData(e.target.value)} value={searchdata} style={{ padding: "8px", width: "400px" }} />
                        </td>
                        <td><select onChange={(e) => setSelect(e.target.value)} name="main" className="search">
                            <option value="">Search</option>
                            <option value="fname">fname</option>
                            <option value="email">email</option>
                            <option value="birthday">birthday</option>
                            <option value="pass">pass</option>
                            <option value="phone">phone</option>
                            <option value="college">college</option>
                            <option value="year">year</option>
                        </select>
                        </td>
                    </tr>


                </div>

                {/* table......... */}

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>

                    <table style={{ width: "70%", border: "1px solid rgb(10, 34, 50)" }}>
                        <thead>
                            <tr style={{ border: "1px solid rgb(10, 34, 50)" }}>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>First Name</b></button></th>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>Email</b></button></th>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>Birthday</b></button></th>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>Password</b></button></th>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>Phone</b></button></th>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>College</b></button></th>
                                <th className="filed"><button className="sort" onClick={(e) => setSortt(e.target.innerText)}><b>Year</b></button></th>
                                <th className="filed">Edit</th>
                                <th className="filed">Delete</th>
                            </tr>
                        </thead>
                        <tbody>{getsearchdata.map((item, index) => {
                            return (
                                <tr>
                                    <td className="userdata">{item.fname}</td>
                                    <td className="userdata">{item.email}</td>
                                    <td className="userdata">{dayjs(item.birthday).format('DD/MM/YYYY')}</td>
                                    <td className="userdata">{item.pass}</td>
                                    <td className="userdata">{item.phone}</td>
                                    <td className="userdata">{item.college}</td>
                                    <td className="userdata">{item.year}</td>
                                    <td style={{ border: " 1px solid rgb(10, 34, 50)" }}><button className="edit" onClick={() => handleEdit(index)}>Edit</button></td>
                                    <td style={{ border: " 1px solid rgb(10, 34, 50)" }}><button className="edit" onClick={() => handleDelete(index)}>Delete</button></td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>

                </div>


            </div>

        </>
    )
}