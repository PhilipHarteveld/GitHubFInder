import Spinner from "./assests/spinner.gif";
function SpinnerLoad() {
  return (
    <div className="w-100 mt-20">
      <img
        width={180}
        className="text-center mx-auto"
        src={Spinner}
        alt="Loading"
      />
    </div>
  );
}

export default SpinnerLoad;
