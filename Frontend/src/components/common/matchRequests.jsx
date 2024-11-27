import React from "react";
import ProfileImage from "./ProfileImage";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const MatchRequests = ({ requests, handleApprove, handleReject }) => {
  return (
    <div className="bg-white shadow-lg mx-auto px-11 p-4 rounded-lg max-w-md">
      <h2 className="mb-4 font-bold text-center text-custom-indigo text-xl">
        Match Requests
      </h2>

      {requests.length > 0 ? (
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {requests.map((request, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 p-3 rounded-md transition"
            >
              <ProfileImage
                image={`http://localhost:5000/${request.userId.profilePic}`}
                alt={request.name}
                size={50}
              />

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {request.userId.name}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(request)}
                  className="text-green-500 hover:text-green-600"
                >
                  <AiOutlineCheck size={20} />
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="text-red-500 hover:text-red-600"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No match requests available.
        </p>
      )}
    </div>
  );
};

export default MatchRequests;
