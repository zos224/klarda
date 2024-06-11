"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useState, useRef } from "react"
import Image from "next/image";
import Link from "next/link";

const CUPPPage = () => {
    const [paticipantProject, setPaticipantProject] = useState({
        id: 0,
        idUser: null,
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        street: '',
        city: '',
        zipCode: '',
        country: '',
        description: '',
        abstract: '',
        status: true,
        code: '',
        acronym: '',
        website: '',
        contact: '',
        dfgclassification: '',
        material: '',
        engagement: '',
        topicPPs: [],
        image: '',
    })
    const [image, setImage] = useState(null)
    const route = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [topics, setTopics] = useState([])
    const topicRef = useRef(null)
    const topicContainerRef = useRef(null)
    const newElement = (ref, containerRef) => {
        const element = ref.current;
        const container = containerRef.current;
        if (element) {
            const copy = element.cloneNode(true)
            copy.classList.add("mt-3")
            const image = copy.querySelector("img")
            image.src = "/assets/icon/remove.svg" 
            image.width = '26' 
            image.height = '26'
            image.classList.add("me-1")
            container.appendChild(copy)
            image.onclick = () => {
                copy.remove()
            }
        }
    }
    useEffect( () => {
        const getPaticipantProject = async () => {
            setLoading(true)
            const response = await fetch('/api/participant-project/' + params.id[1])
            if (response.ok) {
                const existPaticipantProject = await response.json();
                setPaticipantProject(existPaticipantProject)
            }
            else {
                route.push('/admin/participant-project/create')
            }
        }

        const getTopics = async () => {
            const response = await fetch('/api/topic/all')
            if (response.ok) {
                const data = await response.json()
                setTopics(data)
            }
        }

        if (params.id[1]) {
            getPaticipantProject()
            getTopics()
        }
        else {
            getTopics()
        }
    }, [params.id[1], params.id[0]])

    useEffect(() => {
        if (topics != null) { 
            setLoading(false)
        }
    }, [topics])
    
    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTopicPPs = []
        const topicPPs = topicContainerRef.current.children
        for (let i = 0; i < topicPPs.length; i++) {
            const topic = topicPPs[i].querySelector("select")
            newTopicPPs.push({idTopic: topic.value})
        }
        setSubmitting(true)
        const formData = new FormData();
        formData.append('id', paticipantProject.id)
        formData.append('idUser', paticipantProject.idUser)
        formData.append('title', paticipantProject.title)
        formData.append('firstName', paticipantProject.firstName)
        formData.append('lastName', paticipantProject.lastName)
        formData.append('email', paticipantProject.email)
        formData.append('phone', paticipantProject.phone)
        formData.append('company', paticipantProject.company)
        formData.append('street', paticipantProject.street)
        formData.append('city', paticipantProject.city)
        formData.append('zipCode', paticipantProject.zipCode)
        formData.append('country', paticipantProject.country)
        formData.append('description', paticipantProject.description)
        formData.append('abstract', paticipantProject.abstract)
        formData.append('status', paticipantProject.status)
        formData.append('code', paticipantProject.code)
        formData.append('acronym', paticipantProject.acronym)
        formData.append('website', paticipantProject.website)
        formData.append('contact', paticipantProject.contact)
        formData.append('dfgclassification', paticipantProject.dfgclassification)
        formData.append('material', paticipantProject.material)
        formData.append('engagement', paticipantProject.engagement)
        formData.append('image', paticipantProject.image)
  
        if (image) {
            formData.append('image-upload', image)
        }
        formData.append('topicPPs', JSON.stringify(newTopicPPs)) 

        const response = await fetch('/api/participant-project/createOrUpdate', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setErrorAlert(null)
            route.push("/admin/participant-project")
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)  
    }

    const [uploaded, setUploaded] = useState(null)
    const uploadImage = (e) => {
        const imageAccept = ['jpg', 'jpeg', 'png', 'webp'];
        if (e.target.files && e.target.files[0]) {
            const fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
            if (imageAccept.includes(fileExtension)) {
                const src = URL.createObjectURL(e.target.files[0]);
                setUploaded(src)
                setImage(e.target.files[0])
                setErrorAlert(null)
            }
            else {
                setErrorAlert("Vui lòng chọn ảnh phù hợp với định dạng yêu cầu!")
            }
        }
    }

    return (
        <section class="py-1">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                    <div class="rounded-t dark:bg-bodydark bg-white dark:text-black mb-0 px-6 py-3">
                        <div class="text-center flex justify-between">
                            <h6 class="text-xl font-bold">
                            {params.id[0] == 'create' ? 'Thêm' : 'Cập nhật'} Dự án
                            </h6>
                        </div>
                    </div>
                    {!loading ? (
                        <div class="px-4 lg:px-10 py-10 w-full ">
                            {
                                (paticipantProject.idUser != null || paticipantProject.firstName != "") && (
                                    <div className="pb-10 border-b">
                                        <div className="text-lg font-semibold">Thông tin cơ bản:</div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Họ tên: {paticipantProject.firstName + " " + paticipantProject.lastName}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Email: {paticipantProject.email}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Điện thoại: {paticipantProject.phone}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Công ty: {paticipantProject.company}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Thành phố: {paticipantProject.city}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Mã Zip: {paticipantProject.zipCode}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>Quốc gia: {paticipantProject.country}</div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                            <div>File trừu tượng: <Link href={paticipantProject.abstract} target="_blank" className="font-bold">Tải xuống</Link></div>
                                        </div>
                                    </div>
                                )
                            }
                        <form onSubmit={handleSubmit}>
                            <div class={`w-full lg:w-6/12 px-4 mx-auto mt-2 ${paticipantProject.idUser != 0 ? "pt-10" : ""} `}>
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Tiêu đề
                                </label>
                                <input value={paticipantProject.title} type="text" placeholder="Nhập tiêu đề của dự án" onChange={(e) => setPaticipantProject({...paticipantProject, title: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Mô tả 
                                </label>
                                <textarea rows={3} value={paticipantProject.description} placeholder="Mô tả dự án" type="text" onChange={(e) => setPaticipantProject({ ...paticipantProject, description: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Viết tắt
                                </label>
                                <input value={paticipantProject.acronym} type="text" placeholder="Viết tắt" onChange={(e) => setPaticipantProject({...paticipantProject, acronym: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Website
                                </label>
                                <input value={paticipantProject.website} type="text" placeholder="Website" onChange={(e) => setPaticipantProject({...paticipantProject, website: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Liên hệ
                                </label>
                                <input value={paticipantProject.contact} type="text" placeholder="Liên hệ" onChange={(e) => setPaticipantProject({...paticipantProject, contact: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Phân loại DFG
                                </label>
                                <input value={paticipantProject.dfgclassification} type="text" placeholder="Phân loại DFG" onChange={(e) => setPaticipantProject({...paticipantProject, dfgclassification: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Nguyên liệu / Phương pháp luận
                                </label>
                                <input value={paticipantProject.material} type="text" placeholder="Nguyên liệu / Phương pháp luận" onChange={(e) => setPaticipantProject({...paticipantProject, material: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Thành tựu
                                </label>
                                <input value={paticipantProject.engagement} type="text" placeholder="Thành tựu" onChange={(e) => setPaticipantProject({...paticipantProject, engagement: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Chủ đề
                                    </label>
                                    <div ref={topicContainerRef}>
                                        {paticipantProject.topicPPs.length == 0 ? (
                                            <div className="flex" ref={topicRef}>
                                                <select className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                    {topics && topics.map(topic => (
                                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                    ))}
                                                </select>
                                                <Image className="cursor-pointer ms-7" onClick={() => {newElement(topicRef, topicContainerRef)}} src={"/assets/icon/add.svg"} width={35} height={35}></Image>
                                            </div>
                                        ) : (
                                            paticipantProject.topicPPs.map((topic, index) => (
                                                index == 0 ? (
                                                    <div key={index} className="flex" ref={topicRef}>
                                                        <select defaultValue={topic.idTopic} required className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                            {topics && topics.map(t => (
                                                                <option key={t.id} value={t.id}>{t.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={() => {newElement(topicRef, topicContainerRef)}} src={"/assets/icon/add.svg"} width={35} height={35}></Image>
                                                    </div>
                                                ) : (
                                                    <div key={index} className="flex mt-3" ref={topicRef}>
                                                        <select required defaultValue={topic.idTopic} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear">                                                             
                                                            {topics && topics.map(t => (
                                                                <option key={t.id} value={t.id}>{t.name}</option>
                                                            ))}
                                                        </select>
                                                        <Image className="cursor-pointer ms-7" onClick={(e) => {e.currentTarget.parentNode.remove()}} src={"/assets/icon/remove.svg"} width={28} height={28}></Image>
                                                    </div>
                                                )
                                                
                                            ))
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-200 text-xs font-bold mb-5">
                                    Hình ảnh
                                </label>
                                {uploaded || paticipantProject.image ? (
                                    <img src={uploaded || paticipantProject.image} className="rounded-md m-auto w-56 h-40 object-cover"></img>
                                ) : (
                                    <></>
                                )}
                                <input accept=".jpg, .jpeg, .webp, .png" id="inputImage" type="file" name="myImage" onChange={uploadImage} hidden/>
                                <label className="cursor-pointer dark:bg-white dark:text-black text-white bg-black px-3 py-2 rounded-xl flex mt-3 w-fit mx-auto" type="button" htmlFor="inputImage">Chọn ảnh</label>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Trạng thái
                                    </label>
                                    <select required onChange={(e) => setPaticipantProject({...paticipantProject, status: e.target.value})} className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                        <option className="dark:text-black" selected={paticipantProject.status == true ? true : false} value={true}>Đã xác nhận</option>
                                        <option className="dark:text-black" selected={paticipantProject.status == false ? true : false} value={false}>Chưa xác nhận</option>
                                    </select>
                                </div>
                            </div>
                            {!submitting ? (
                                <div className="text-center">
                                    <input type="submit" role="button" className="mt-10 cursor-pointer bg-black text-white dark:bg-whiten dark:text-black px-3 py-2 rounded-xl" value={params.id[0] == 'create' ? 'Thêm' : 'Xác nhận'}/>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <button className="mt-10 cursor-pointer bg-black text-white px-7 py-2 rounded-xl">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                            
                        </form>
                        {errorAlert ? (
                            <div className="text-white mt-3 bg-red rounded-lg px-3 py-2">
                                {errorAlert}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    ) : (
                        <div className="flex-center mt-2 mx-auto" role="status">
                            <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CUPPPage