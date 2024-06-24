import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

import CommonLayout from '../../components/common/CommonLayout';
import Loader from '../../components/common/Loader';
import { TextField } from '@mui/material';
import { handleDynamicRequestHeader } from '../../components/common/DyanamicRequest';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../components/common/AppConfig';
import { IoSend } from "react-icons/io5";
import { PiChats } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function ChatBot() {
    const [isLoader, setIsLoader] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [text, setText] = useState('');
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [chat, setChat] = useState([]);
    const navigate = useNavigate();
    let wordCount;

    const handleTextChange = (event) => {
        const inputValue = event.target.value;
        wordCount = inputValue.split(/\s+/).filter(word => word.length > 0).length;

        console.log(wordCount);

        if (wordCount <= 100) {
            setText(inputValue);
        }
    };

    const fetchChatData = async () => {

        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/updateUserThread`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
            setIsLoader(false);
            setIsProcessing(false);
        }
        const rightResponse = (data) => {
            if (data.listanswer) {
                const newData = {
                    "_id": "665ecf3259c5b6a434f1f487",
                    "ques": [
                    ],
                    "answer": [
                        "Hello! How can I assist you today? If you have any questions or need guidance regarding student life, career choices, education, or academics, feel free to ask. I'm here to help!"
                    ]
                };
                // data.listanswer.unshift(newData);
            }
            setChat(data.listanswer);
            setText("")
            setIsLoader(false);
            setIsProcessing(false);
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);

    }

    const handleSend = async () => {
        setIsProcessing(true)
        const requestBody = { ques: [text] };
        const method = 'POST';
        const url = `${BASE_URL}/mobile/getAIanswer`;
        const token = await userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
            setIsLoader(false);
            setIsProcessing(false);
        }
        const rightResponse = (data) => {
            fetchChatData()
        };
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }

    const handleBackToActivity = () => {
        return navigate('/');
    };

    useEffect(() => {
        fetchChatData();
    }, []);

    return (
        <>
            {isLoader ? (

                <Loader />
            ) : (
                <CommonLayout>
                    <div className="left-navigation">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="right-content">
                        <Navbar handleBackClick={handleBackToActivity}></Navbar>
                        <div className='tw-bg-[#EBF5FF] tw-w-full tw-h-[80vh] tw-rounded-xl'>
                            <div className='tw-p-3 tw-w-full tw-h-full tw-flex tw-flex-col'>
                                <div className='tw-bg-[#ffffff] tw-rounded-t-xl tw-flex-grow tw-p-2 tw-overflow-auto tw-flex-col tw-content-end'>
                                    {chat.length === 0 && <div className='tw-w-full tw-h-[70%] tw-justify-center tw-flex tw-my-16'>
                                        <div className='tw-flex-col tw-items-center tw-justify-center tw-max-w-96'>
                                            <PiChats size={38} className='tw-w-full' />
                                            <p className='tw-font-semibold tw-text-black tw-text-center tw-text-xl'>Hi I am Acad Bot, ask me anything related to career, academic, student life</p>
                                            <div className='p-2 tw-bg-gray-100 tw-rounded-md tw-m-2'>"What is the best career for me?"</div>
                                            <div className='p-2 tw-bg-gray-100 tw-rounded-md tw-m-2'>"How do I prepare for this career?"</div>
                                            <div className='p-2 tw-bg-gray-100 tw-rounded-md tw-m-2'>"What skills do I require to succeed in this career?"</div>
                                        </div>
                                    </div>}
                                    {chat && chat.map((message, index) => (
                                        <div key={index}>
                                            {message.ques && message.ques.length > 0 && <div className="tw-w-fit tw-mb-4 tw-p-3 tw-rounded-lg tw-bg-blue-100 tw-ml-auto tw-text-right">
                                                {message.ques}
                                            </div>}
                                            <div className="tw-w-fit tw-mb-4 tw-p-3 tw-rounded-lg tw-bg-gray-100 tw-mr-auto tw-text-left">
                                                {message.answer}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='tw-w-full tw-flex'>
                                    <div className='tw-w-full'>
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            multiline
                                            maxRows={3}
                                            className='tw-w-full tw-bg-slate-50'
                                            value={text}
                                            placeholder='Enter your question here'
                                            onChange={handleTextChange}
                                        />
                                        <div className='tw-text-sm'> Word count : {text.split(/\s+/).filter(word => word.length > 0).length || 0} (Max 100 words allowed)</div>
                                    </div>
                                    <button onClick={handleSend} disabled={isProcessing} className=' tw-rounded-md tw-px-3 tw-py-2 tw-text-center tw-content-center tw-font-semibold tw-mb-5'>
                                        {isProcessing ?
                                            <div role="status">
                                                <svg aria-hidden="true" class="tw-w-8 tw-h-8 tw-text-gray-200 tw-animate-spin tw-dark:text-gray-600 tw-fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </div>
                                            :
                                            <IoSend size={20} />} </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </CommonLayout>

            )}
        </>
    )
}

export default ChatBot
