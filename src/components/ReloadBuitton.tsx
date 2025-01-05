import { IoReload } from "react-icons/io5";

type Props = {
  onClick: () => void;
};

export const ReloadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className="cursor-pointer p-1 rounded-full bg-blue-300 dark:bg-blue-700 light:text-black"
      onClick={() => onClick()}
    >
      <IoReload />
    </div>
  );
};
