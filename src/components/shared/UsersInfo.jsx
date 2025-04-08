import { UserRound } from "lucide-react";

function UsersInfo({ title, number, type }) {
  return (
    <>
      <div>
        <div className="flex flex-col gap-10 border">
          <UserRound />
          <p>{title}</p>
          <p>{number}</p>
        </div>
      </div>
    </>
  );
}
export default UsersInfo;
