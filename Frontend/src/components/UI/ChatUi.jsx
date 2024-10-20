import SearchUI from "./SearchUI";

function ChatUi() {
  return (
    <div className="flex flex-row gap-2 pt-[150px] pb-14 pl-8 rounded-lg h-screen">
      <div className="bg-slate-100 rounded-lg w-[300px] h-full">
        <div className="pt-7 pl-4">
          <p className="font-bold text-4xl text-custom-indigo">Chat</p>
          <SearchUI />
        </div>
      </div>
      <div className="bg-slate-100 rounded-3xl w-[600px] h-full"></div>
    </div>
  );
}

export default ChatUi;
