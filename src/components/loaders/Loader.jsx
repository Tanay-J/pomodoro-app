import { BeatLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  return (
    <span className="text-center my-xs">
      <BeatLoader color={"#6ebf8b"} loading={isLoading} size={10} />
    </span>
  );
};
export { Loader };
