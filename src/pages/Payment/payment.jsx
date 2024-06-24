import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { handleDynamicRequestHeader } from "../../components/common/DyanamicRequest";
import { BASE_URL } from "../../components/common/AppConfig";

const Payment = () => {
  const [currentSpacebucks, setCurrentSpacebucks] = useState(1000);
  const [addedSpacebucks, setAddedSpacebucks] = useState(10);
  const rate = 0.2;
  const [error, setError] = useState("");
  const minAmount = 10;
  const spaceBucks = useSelector((state) => state.roleReducer.spaceBucks);
  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const userToken = useSelector((state) => state.roleReducer.jwtToken);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddedSpacebucks(value);

    if (value < minAmount) {
      setError(`Minimum amount is ${minAmount} Spacebucks`);
    } else {
      setError("");
    }
  };

  const handleAddSpacebucks = () => {
    if (addedSpacebucks >= minAmount) {
      setCurrentSpacebucks(currentSpacebucks + addedSpacebucks);
      setError("");
    }
  };

  const requestPayment = async () => {
    const requestBody = { amount : addedSpacebucks };
    const method = 'POST';
    const url = `${BASE_URL}/razorpay_paymentlink_create`;
    const token = await userToken;
    const wrongResponse = () => {
        setAlertMessage({ success: '', error: 'Something went wrong' });
    }
    const rightResponse = (data) => {
        console.log('check payment response : ', data.data.short_url);

        const shortUrl = data.data.short_url;
    
        if (shortUrl) {
            window.open(shortUrl, '_blank');
        }

    };
    handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
}

  return (
    <div className="tw-top-0 tw-w-full tw-h-full tw-absolute tw-left-0 tw-bg-white">
      <div className="tw-text-2xl tw-font-semibold tw-flex tw-justify-start tw-items-center tw-p-2 tw-bg-[#ebf5ff]">
        <IoArrowBackSharp
          size={24}
          className="tw-mr-2"
          onClick={() => window.history.back()}
        />{" "}
        Back
      </div>
      <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-mt-[10vh]">
        <div className="tw-p-4 tw-flex-col tw-justify-center tw-items-center w-75">
          <div className="tw-mb-4">
            Current Spacebucks: <strong>{spaceBucks}</strong>
          </div>
          <div className="tw-mb-4">
            <label htmlFor="spacebucks-input" className="tw-block tw-mb-2">
              Add Spacebucks:
            </label>
            <input
              id="spacebucks-input"
              type="number"
              min={10}
              value={addedSpacebucks}
              onChange={handleInputChange}
              className="tw-border tw-rounded tw-p-2 tw-w-full"
            />
            {error && (
              <span className="tw-text-xs tw-text-red-500">{error}</span>
            )}
          </div>
          <div className="tw-mb-4">
            Amount to be paid : <strong>{addedSpacebucks * rate} Rs.</strong>
          </div>
          <button
            onClick={requestPayment}
            className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
