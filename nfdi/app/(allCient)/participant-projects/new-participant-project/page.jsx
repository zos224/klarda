"use client"
import LinkNav from "@/components/client/LinkNav";
import "@/styles/ck.css"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NewPP = () => {
    const [step1, setStep1] = useState(true)
    const [content, setContent] = useState("")
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch('/api/content/newPP')
            const result = await response.json()
            if (result) {
                setContent(result.newPP)
            }
            else {
                setContent("")
            }
        }
        const fetchData = async () => {
            const response = await fetch('/api/setting')
            const result = await response.json()
            if (result) {
                setData(result)
            }
            else {
                setData(null)
            }
        }
        fetchData()
        fetchContent()
    }, [])
    const [pp, setPP] = useState({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        street: "",
        zipCode: "",
        city: "",
        country: "",
        description: "",
        abstract: "",
        status: false
    })
    const tcRef = useRef(null)
    const ppRef = useRef(null)
    const [errorAlert, setErrorAlert] = useState("")
    const [success, setSuccess] = useState(false)
    const checkAgree = () => {
        if (pp.firstName == "" || pp.lastName == "" || pp.email == "" || pp.phone == "" || pp.company == "" || pp.street == "" || pp.zipCode == "" || pp.city == "" || pp.country == "" || pp.description == "" || pp.abstract == "") {
            setErrorAlert("Vui lòng điền đầy đủ thông tin")
            return
        }
        if (tcRef.current.checked && ppRef.current.checked) {
            setStep1(false)
            setErrorAlert("")
        }
        else {
            setErrorAlert("Vui lòng đồng ý với các điều khoản và chính sách bảo mật")
        }
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("idUser", 0)
        formData.append("title", pp.title)
        formData.append("firstName", pp.firstName)
        formData.append("lastName", pp.lastName)
        formData.append("email", pp.email)
        formData.append("phone", pp.phone)
        formData.append("company", pp.company)
        formData.append("street", pp.street)
        formData.append("zipCode", pp.zipCode)
        formData.append("city", pp.city)
        formData.append("country", pp.country)
        formData.append("description", pp.description)
        formData.append("abstract", pp.abstract)
        fetch("/api/participant-project/createOrUpdate", {
            method: "POST",
            body: formData
        }).then(res => {
            if (res.status == 200) {
                setSuccess(true)
            }
            else {
                setErrorAlert("Có lỗi xảy ra, vui lòng thử lại")
            }
        })
    }
    return (
        <div>
            <LinkNav />
            <h1 className="font-extrabold md:text-5xl text-2xl mt-15">Đăng tải dự án mới</h1>
            <div className="prose ck-content mt-10" style={{ maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: content }}>
            </div>
            <div className="bg-white shadow-lg p-3 rounded-md mt-20">
                <h2 className="text-xl font-bold mt-10 ">Đăng tải dự án mới</h2>
                {
                    success ? (
                        <div className="text-primary-600 font-semibold mt-10 text-center min-h-96">Klarda cảm ơn đóng góp của bạn! <br></br> Chúng tôi sẽ sớm xử lý yêu cầu của bạn</div>
                    ) : ( 
                    step1 ? (
                        <div>
                            <h3 className="text-xl font-bold mt-5">Vui lòng điền đầy đủ các thông tin sau:</h3>
                            <div>
                                <div className="mt-5">
                                    <div>
                                        <label className="font-medium">Tiêu đề</label>
                                        <input value={pp.title} onChange={(e) => setPP({...pp, title: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text"></input>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col gap-8 mt-5">
                                    <div className="md:w-1/2 w-full">
                                        <label className="font-medium">Họ *</label>
                                        <input value={pp.firstName} onChange={(e) => setPP({...pp, firstName: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                    </div>
                                    <div className="md:w-1/2 w-full">
                                        <label className="font-medium">Tên *</label>
                                        <input value={pp.lastName} onChange={(e) => setPP({...pp, lastName: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col gap-8 mt-5">
                                    <div className="md:w-1/2 w-full">
                                        <label className="font-medium">Email *</label>
                                        <input value={pp.email} onChange={(e) => setPP({...pp, email: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="email" required></input>
                                    </div>
                                    <div className="md:w-1/2 w-full">
                                        <label className="font-medium">Điện thoại *</label>
                                        <input value={pp.phone} onChange={(e) => setPP({...pp, phone: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="tel" required></input>
                                    </div> 
                                </div>
                                <h3 className="text-xl font-bold mt-10">Thông tin liên hệ</h3>
                                <div className="mt-5">
                                    <div>
                                        <label className="font-medium">Viện nghiên cứu // Công ty *</label>
                                        <input value={pp.company} onChange={(e) => setPP({...pp, company: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div>
                                        <label className="font-medium">Đường // Số nhà *</label>
                                        <input value={pp.street} onChange={(e) => setPP({...pp, street: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col gap-8 mt-5">
                                    <div className="md:w-1/2 w-full">
                                        <label className="font-medium">Zip Code *</label>
                                        <input value={pp.zipCode} onChange={(e) => setPP({...pp, zipCode: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                    </div>
                                    <div className="md:w-1/2 w-full">
                                        <label className="font-medium">Thành phố *</label>
                                        <input value={pp.city} onChange={(e) => setPP({...pp, city: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text " required></input>
                                    </div>
                                </div>
                                <div className="mt-5 pb-10">
                                    <div>
                                        <label className="font-medium">Quốc gia *</label>
                                        <input value={pp.country} onChange={(e) => setPP({...pp, country: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" type="text" required></input>
                                    </div>
                                </div>
                                <div className="pt-3 border-t md:w-1/3 w-full text-xl font-bold">
                                    Đề xuất dự án của bạn
                                </div>
                                <div className="mt-5">
                                    <label className="font-medium">Mô tả sơ lược *</label> 
                                    <textarea value={pp.description} onChange={(e) => setPP({...pp, description: e.target.value })} className="w-full border p-2 rounded-md focus:border-primary-600 focus:border-2 outline-none" rows={4} maxLength={10000} type="text" required></textarea>
                                    <p className="text-sm">(Tối đa 1000 từ)</p>
                                </div>
                                <div className="mt-5 pb-10">
                                    <label className="font-medium">Trừu tượng hóa *</label>
                                    <br></br>
                                    <input onChange={(e) => setPP({...pp, abstract: e.target.files[0]})} type="file" className="w-fit mt-3" accept=".pdf" required></input>
                                    <p className="text-sm mt-2">(Tối đa 1000 từ - Bao gồm 1 hình ảnh trừu tượng hóa dự án - Đăng tải theo định dạng pdf)</p>
                                </div>
                                <div className="pt-7 border-t">
                                    <div>
                                        <input ref={tcRef} id="tc" type="checkbox" className="" required />
                                        <label htmlFor="tc" className="font-medium mx-5">Tôi đồng ý với các điều khoản và điều kiện *</label>
                                    </div>
                                    <div className="mt-4">
                                        <input ref={ppRef} id="pp" type="checkbox" required />
                                        <label htmlFor="pp" className="font-medium mx-5">Tôi đồng ý với chính sách bảo mật *</label>
                                    </div>
                                </div>
                                <div className="pb-5">
                                    <button onClick={checkAgree} type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-5 rounded-md mt-5">Trang tiếp theo</button>
                                </div>
                            </div>
                            {errorAlert != "" && <div className="text-red mt-4">{errorAlert}</div>}
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold mt-5">Vui lòng xác nhận thông tin:</h3>
                            <div className="mt-7">
                                <div className="font-semibold text-lg">Thông tin tổng quan</div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Tiêu đề</div>
                                    <div className="w-3/4">{pp.title}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Họ</div>
                                    <div className="w-3/4">{pp.firstName}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Tên</div>
                                    <div className="w-3/4">{pp.lastName}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Email</div>
                                    <div className="w-3/4">{pp.email}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Phone</div>
                                    <div className="w-3/4">{pp.phone}</div>
                                </div>
                            </div>
                            <div className="mt-7">
                                <div className="font-semibold text-lg">Thông tin chi tiết</div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Viện nghiên cứu // Công ty</div>
                                    <div className="w-3/4">{pp.company}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Đường // Số nhà</div>
                                    <div className="w-3/4">{pp.street}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Zip code</div>
                                    <div className="w-3/4">{pp.zipCode}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Thành phố</div>
                                    <div className="w-3/4">{pp.city}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Quốc gia</div>
                                    <div className="w-3/4">{pp.country}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Mô tả sơ lược</div>
                                    <div className="w-3/4">{pp.description}</div>
                                </div>
                                <div className="flex mt-2 gap-3">
                                    <div className="w-1/4">Chi tiết</div>
                                    <div className="w-3/4">{pp.abstract.name}</div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <button onClick={() => setStep1(true)} className="px-3 py-2 text-primary-600 border-primary-600 border-2 rounded-md">Điều chỉnh thông tin</button>
                                <button onClick={handleSubmit} className="px-3 py-2 ms-5 bg-primary-500 hover:bg-primary-600 rounded-md">Xác nhận</button>
                            </div>
                            {
                                errorAlert != "" && <div className="text-red mt-4">{errorAlert}</div>
                            }
                        </div>
                    )
                )}
            </div>
            {data && <div className="text-center mt-10">
                <div>
                    <Link className="underline font-semibold underline-offset-4 decoration-primary-500 decoration-4" target="_blank" href={data.term}>Điều khoản và điều kiện</Link>
                </div>
                <div className="mt-4">
                    <Link className="underline font-semibold underline-offset-4 decoration-primary-500 decoration-4" target="_blank" href={data.privacy}>Chính sách bảo mật</Link>
                </div>
                <div>
                    <h3 className="mt-10 text-lg">Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi:</h3>
                    <div className="relative bg-white shadow-lg w-fit mx-auto px-6 rounded-xl py-20 mt-10">
                        <h4 className="font-semibold">Liên hệ</h4>
                        <div className="font-bold text-lg mt-2">
                            Vietnam Blockchain Zone
                        </div>
                        <div className="mt-2">
                            Điện thoại: {data.phone}
                        </div>
                        <div className="mt-2">
                            Email: {data.email}
                        </div>
                        <div className="absolute h-full top-0 right-0 -z-9 -rotate-3 rounded-xl w-[calc(50%)] bg-primary-500">
                            dd
                        </div>
                    </div>
                </div>
            </div> }
        </div>
    );
}

export default NewPP;