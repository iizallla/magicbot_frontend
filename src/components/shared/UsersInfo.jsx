import { UserRound } from "lucide-react";

function UsersInfo({ title, number, color }) {
  return (
    <>
      <div>
        <div className="flex flex-col gap-5 w-[300px] border items-center">
          <UserRound className={color ? "txet-white" : "black"} />
          <p>{title}</p>
          <p>{number}</p>
        </div>
      </div>
    </>
  );
}
export default UsersInfo;
