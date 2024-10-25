import ProfileImage from "./ProfileImage";
import ProfileName from "./ProfileName";

function ChatMessage({ name, message, image }) {
  return (
    <div className="flex items-start pb-4">
      <ProfileImage image={image} />
      <div className="ml-4">
        <ProfileName name={name} />
        <div className="text-base text-custom-indigo">
          <p className="w-full truncate">
            <strong>You:</strong> {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
