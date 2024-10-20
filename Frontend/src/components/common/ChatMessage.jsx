import ProfileName from "./ProfileName";

function ChatMessage({ name, message, image }) {
  return (
    <div className="pt-2">
      <ProfileName name={name} image={image} message={message} />
      <div className="pr-2 pl-[76px] text-base text-custom-indigo">
        <p className="w-full truncate">
          {"You:"}
          {message}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
