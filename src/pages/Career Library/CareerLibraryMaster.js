import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/common/CommonLayout'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import LibraryMaster from './Library Master/LibraryMaster'
import DreamMaster from './Dream Master/DreamMaster'
import Loader from '../../components/common/Loader'

function CareerLibraryMaster() {
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoader(false);
        }, 2000);
    });
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
                        <Navbar></Navbar>
                        <div className="row">
                            <div className="col-lg-12">
                                <DreamMaster />
                            </div>
                            <div className="col-lg-12">
                                <LibraryMaster />
                            </div>
                        </div>
                    </div >
                </CommonLayout >
            )}
        </>

    )
}

export default CareerLibraryMaster