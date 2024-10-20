import ChatMessage from "../common/ChatMessage";
import SearchUI from "./SearchUI";
import closeeye from "../../assets/images/closeeye.png";
import ProfileName from "../common/ProfileName";

function ChatUi() {
  return (
    <div className="flex flex-row gap-2 pt-[130px] pb-14 pl-8 h-screen">
      <div className="bg-slate-100 rounded-3xl w-[300px] h-full">
        <div className="pt-7 pl-4">
          <p className="font-bold text-4xl text-custom-indigo">Chat</p>
          <SearchUI />
        </div>
        <ChatMessage
          name="John Doe"
          message="Hello, how are you?"
          image={closeeye}
        />
        <ChatMessage
          name="John Doe"
          message="Hello, how are you?"
          image={closeeye}
        />
        <ChatMessage
          name="John Doe"
          message="Hello, how are you?"
          image={closeeye}
        />
        <ChatMessage
          name="John Doe"
          message="Hello, how are you?"
          image={closeeye}
        />
      </div>
      <div className="flex flex-col justify-between bg-slate-100 px-2 py-2 rounded-3xl w-[660px] h-full">
        <div className="bg-indigo-100 pt-2 rounded-3xl w-full">
          <ProfileName name="John Doe" image={closeeye} />
        </div>

        <div className="flex-grow p-2 overflow-y-auto">
          {/* Display messages here */}
        </div>

        <div className="flex items-center bg-white shadow-md mt-2 px-4 py-2 rounded-full">
          <input
            type="text"
            placeholder="Type a message..."
            className="border-none w-full focus:outline-none text-base"
          />
          <button className="px-4 font-bold text-custom-indigo hover:text-custom-pink">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatUi;
