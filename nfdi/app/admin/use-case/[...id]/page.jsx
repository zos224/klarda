"use client"
import { useParams, useRouter } from "next/navigation"
import {useEffect, useState, useRef } from "react"
import Image from "next/image";
import CKEditorCustom from "@/components/admin/CKEditor";

const CUPPPage = () => {
    const [useCase, setUseCase] = useState({
        id: 0,
        title: '',
        description: '',
        mainReq: '',
        code: '',
        mainRelated: '',
        otherRelated: '',
        possibleConn: '',
        mainSuccess: '',
        material: '',
        addedValue: '',
        topicUCs: [],
    })
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
        setLoading(true)
        const getuseCase = async () => {
            const response = await fetch('/api/use-case/' + params.id[1])
            if (response.ok) {
                const existuseCase = await response.json();
                setUseCase(existuseCase)
            }
            else {
                route.push('/admin/use-case/create')
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
            if (topics.length == 0) {
                getTopics()
            }
            if (useCase.id == 0) {
                getuseCase()
            }
        }
        else {
            if (topics.length == 0) {
                getTopics()
            }
        }
    }, [params.id[1], params.id[0]])

    useEffect(() => {
        if (topics.length > 0) { 
            if (params.id[0] == 'create' ) {
                setLoading(false)
            }
            else {
                if (useCase.id != 0) {
                    setLoading(false)
                }
            }
        }
    }, [topics, useCase])
    
    const [errorAlert, setErrorAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newtopicUCs = []
        const topicUCs = topicContainerRef.current.children
        for (let i = 0; i < topicUCs.length; i++) {
            const topic = topicUCs[i].querySelector("select")
            newtopicUCs.push({idTopic: topic.value})
        }
        setSubmitting(true)
        const formData = new FormData();
        formData.append('id', useCase.id)
        formData.append('title', useCase.title)
        formData.append('description', useCase.description)
        formData.append('mainReq', useCase.mainReq)
        formData.append('code', useCase.code)
        formData.append('mainRelated', useCase.mainRelated)
        formData.append('otherRelated', useCase.otherRelated)
        formData.append('possibleConn', useCase.possibleConn)
        formData.append('mainSuccess', useCase.mainSuccess)
        formData.append('material', useCase.material)
        formData.append('addedValue', useCase.addedValue)
        formData.append('topicUCs', JSON.stringify(newtopicUCs)) 

        const response = await fetch('/api/use-case/createOrUpdate', {
            method: "POST",
            body: formData
        })
        if (response.ok) {
            setErrorAlert(null)
            route.push("/admin/use-case")
        }
        else {
            response.text().then(text => {
                setErrorAlert(text)
            })
        }
        setSubmitting(false)  
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
                        <form onSubmit={handleSubmit}>
                            <div class={`w-full px-4 mx-auto mt-2 `}>
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Tiêu đề
                                </label>
                                <input value={useCase.title} type="text" placeholder="Nhập tiêu đề của dự án" onChange={(e) => setUseCase({...useCase, title: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2" >
                                    Mô tả 
                                </label>
                                <CKEditorCustom initData={useCase.description} setData={(data) => setUseCase({...useCase, description: data})}/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Yêu cầu chính
                                </label>
                                <CKEditorCustom initData={useCase.mainReq} setData={(data) => setUseCase({...useCase, mainReq: data})}/>
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Lĩnh vực chính
                                </label>
                                <input value={useCase.mainRelated} type="text" placeholder="Lĩnh vực chính" onChange={(e) => setUseCase({...useCase, mainRelated: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Lĩnh vực khác
                                </label>
                                <input value={useCase.otherRelated} type="text" placeholder="Lĩnh vực khác" onChange={(e) => setUseCase({...useCase, otherRelated: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Có thể liên quan đến
                                </label>
                                <input value={useCase.possibleConn} type="text" placeholder="Có thể liên quan đến" onChange={(e) => setUseCase({...useCase, possibleConn: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Nguyên liệu / Dữ liệu
                                </label>
                                <input value={useCase.material} type="text" placeholder="Nguyên liệu / Phương pháp luận" onChange={(e) => setUseCase({...useCase, material: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Kết quả đạt được hướng tới
                                </label>
                                <input value={useCase.mainSuccess} type="text" placeholder="Kết quả đạt được hướng tới" onChange={(e) => setUseCase({...useCase, mainSuccess: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-2">
                                <div class="relative w-full mb-3">
                                <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                    Giá trị bổ sung
                                </label>
                                <input value={useCase.addedValue} type="text" placeholder="Giá trị bổ sung" onChange={(e) => setUseCase({...useCase, addedValue: e.target.value})} class="border-0 px-3 py-3 placeholder-bodydark2 text-black dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div class="w-full px-4 mx-auto mt-3">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-gray-200 text-xs font-bold mb-2">
                                        Chủ đề
                                    </label>
                                    <div ref={topicContainerRef}>
                                        {useCase.topicUCs.length == 0 ? (
                                            <div className="flex" ref={topicRef}>
                                                <select className="text-black border-0 px-3 py-3 dark:bg-bodydark bg-white rounded text-sm shadow-4 focus:outline-none focus:ring w-full ease-linear"> 
                                                    {topics && topics.map(topic => (
                                                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                    ))}
                                                </select>
                                                <Image className="cursor-pointer ms-7" onClick={() => {newElement(topicRef, topicContainerRef)}} src={"/assets/icon/add.svg"} width={35} height={35}></Image>
                                            </div>
                                        ) : (
                                            useCase.topicUCs.map((topic, index) => (
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